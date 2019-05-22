import {IHardwareBus} from '../../../Hardware';
import {fromTwosComplement} from '../../../Utility/number';
import {Instruction} from '../../Instruction';
import {isRegisterFlagTestSatisfied, RegisterFlagTest} from '../../RegisterFlag';

/**
 * JR cc, s8
 */
export class ConditionalRelativeSigned8 extends Instruction {
	public constructor(code: number, protected test: RegisterFlagTest) {
		super(code, `JR ${test}, s8`, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		hardware.cpu.clock += 2;

		if (!isRegisterFlagTestSatisfied(registers.flags, this.test))
			return;

		// Relative jumps occur from the END of the instruction. Since PC is "halfway through" this instruction (it's
		// value is the address of the opcode + 1, or at the byte holding the jump distance), we add one to the jump
		// distance to get the correct offset.
		registers.programCounter += fromTwosComplement(hardware.memory.read(registers.programCounter)) + 1;
		hardware.cpu.clock += 1;
	}
}
