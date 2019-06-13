import {Cpu} from '../Cpu/Cpu';
import {EventDispatcher} from '../Events/EventDispatcher';
import {Gpu} from '../Gpu/Gpu';
import {Interrupts} from '../Memory/Interrupts';
import {Memory} from '../Memory/Memory';
import {Stack} from '../Memory/Stack';
import {ICpu, IGpu, IHardwareBus, IMemory, isHardwareBusAware} from './index';

export class HardwareBus implements IHardwareBus {
	public readonly cpu: ICpu;
	public readonly memory: IMemory;
	public readonly gpu: IGpu;

	public readonly eventDispatcher: EventDispatcher;

	public constructor(cpu?: ICpu, memory?: IMemory, gpu?: IGpu) {
		this.eventDispatcher = new EventDispatcher();

		this.cpu = cpu || new Cpu();
		this.memory = memory || new Memory(new Stack(this), new Interrupts());
		this.gpu = gpu || new Gpu();

		if (isHardwareBusAware(this.cpu))
			this.cpu.setHardwareBus(this);

		if (isHardwareBusAware(this.memory))
			this.memory.setHardwareBus(this);

		if (isHardwareBusAware(this.gpu))
			this.gpu.setHardwareBus(this);
	}

	public reset(): void {
		this.cpu.reset();
		this.memory.reset();
	}
}
