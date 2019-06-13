import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {isRegisterFlagTestSatisfied, RegisterFlagTest} from '../../RegisterFlag';

/**
 * CALL cc, n16
 */
export class ConditionalCall extends Instruction {
	public constructor(code: number, protected test: RegisterFlagTest) {
		super(code, `CALL ${test}, n16`, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		hardware.cpu.clock.total += 3;

		if (!isRegisterFlagTestSatisfied(registers.flags, this.test))
			return;

		hardware.cpu.clock.total += 3;

		hardware.memory.stack.push(registers.programCounter + 2);
		registers.programCounter = hardware.memory.readWord(registers.programCounter);
	}
}
