import {Cpu} from '../Cpu/Cpu';
import {Memory} from '../Memory/Memory';
import {Stack} from '../Memory/Stack';
import {ICpu, IMemory, isHardwareBusAware} from './index';

export class HardwareBus {
	public readonly cpu: ICpu;
	public readonly memory: IMemory;

	public constructor(cpu?: ICpu, memory?: IMemory) {
		this.cpu = cpu || new Cpu();
		this.memory = memory || new Memory(new Stack(this));

		if (isHardwareBusAware(cpu))
			cpu.setHardwareBus(this);

		if (isHardwareBusAware(memory))
			memory.setHardwareBus(this);
	}

	public reset(): void {
		this.cpu.reset();
		this.memory.reset();
	}
}
