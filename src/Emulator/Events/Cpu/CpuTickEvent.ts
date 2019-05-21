import {Instruction} from '../../Cpu/Instruction';
import {ICpu} from '../../Hardware';
import {IEvent} from '../Event';

export class CpuTickEvent implements IEvent {
	public readonly name = 'cpu.tick';

	public readonly cpu: ICpu;
	public readonly offset: number;
	public readonly instruction: Instruction;
	public readonly prefixed: boolean;

	public constructor(cpu: ICpu, offset: number, instruction: Instruction, prefixed: boolean = false) {
		this.cpu = cpu;
		this.offset = offset;
		this.instruction = instruction;
		this.prefixed = prefixed;
	}
}
