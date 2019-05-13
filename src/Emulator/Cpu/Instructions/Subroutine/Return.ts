import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

/**
 * RET
 */
export class Return extends Instruction {
	public constructor() {
		super(0xC9, 'RET', 1, 4);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.registers.programCounter = hardware.memory.stack.pop();
	}
}
