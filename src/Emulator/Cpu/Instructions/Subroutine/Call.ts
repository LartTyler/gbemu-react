import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

/**
 * CALL n16
 */
export class Call extends Instruction {
	public constructor() {
		super(0xCD, 'CALL n16', 3, 6);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		hardware.memory.stack.push(registers.programCounter + 2);
		registers.programCounter = hardware.memory.readWord(registers.programCounter);
	}
}
