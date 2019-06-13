import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {isRegisterFlagTestSatisfied, RegisterFlagTest} from '../../RegisterFlag';

/**
 * JP cc, (n16)
 */
export class ConditionalValue16 extends Instruction {
	public constructor(code: number, protected test: RegisterFlagTest) {
		super(code, `JP ${test}, (n16)`, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		hardware.cpu.clock.total += 3;

		if (!isRegisterFlagTestSatisfied(registers.flags, this.test))
			return;

		hardware.cpu.clock.total += 1;
		registers.programCounter = hardware.memory.readWord(registers.programCounter);
	}
}
