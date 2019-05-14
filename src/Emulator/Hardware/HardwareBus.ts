import {Cpu} from '../Cpu/Cpu';
import {Interrupts} from '../Memory/Interrupts';
import {Memory} from '../Memory/Memory';
import {Stack} from '../Memory/Stack';
import {ICpu, IMemory, isHardwareBusAware} from './index';

export class HardwareBus {
	public readonly cpu: ICpu;
	public readonly memory: IMemory;

	public constructor(cpu?: ICpu, memory?: IMemory) {
		this.cpu = cpu || new Cpu();
		this.memory = memory || new Memory(new Stack(this), new Interrupts());

		if (isHardwareBusAware(this.cpu))
			this.cpu.setHardwareBus(this);

		if (isHardwareBusAware(this.memory))
			this.memory.setHardwareBus(this);
	}

	public reset(): void {
		this.cpu.reset();
		this.memory.reset();
	}
}
