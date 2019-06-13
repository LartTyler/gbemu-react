import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {isRegisterFlagTestSatisfied, RegisterFlagTest} from '../../RegisterFlag';

/**
 * RET cc
 */
export class ConditionalReturn extends Instruction {
	public constructor(code: number, protected test: RegisterFlagTest) {
		super(code, `RET ${test}`, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		hardware.cpu.clock.total += 2;

		if (!isRegisterFlagTestSatisfied(registers.flags, this.test))
			return;

		hardware.cpu.clock.total += 3;

		registers.programCounter = hardware.memory.stack.pop();
	}
}
