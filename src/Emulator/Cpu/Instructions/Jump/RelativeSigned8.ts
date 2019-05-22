import {IHardwareBus} from '../../../Hardware';
import {fromTwosComplement} from '../../../Utility/number';
import {Instruction} from '../../Instruction';

/**
 * JR s8
 */
export class RelativeSigned8 extends Instruction {
	public constructor() {
		super(0x18, 'JR s8', 2, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		// Relative jumps occur from the END of the instruction. Since PC is "halfway through" this instruction (it's
		// value is the address of the opcode + 1, or at the byte holding the jump distance), we add one to the jump
		// distance to get the correct offset.
		registers.programCounter += fromTwosComplement(hardware.memory.read(registers.programCounter)) + 1;
	}
}
