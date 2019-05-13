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

		registers.programCounter += fromTwosComplement(hardware.memory.read(registers.programCounter));
		hardware.cpu.clock += 1;
	}
}
