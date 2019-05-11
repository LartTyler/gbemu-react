import {ICpuRegisters} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../Registers';

export abstract class AbstractFromRegister8 extends Instruction {
	protected process(registers: ICpuRegisters, a: number, b: number): number {
		registers.flags = RegisterFlag.SUBTRACT;

		if ((a & 0xF) < (b & 0xF))
			registers.flags |= RegisterFlag.HALF_CARRY;

		if (a < b)
			registers.flags |= RegisterFlag.CARRY;
		else if (a === b)
			registers.flags |= RegisterFlag.ZERO;

		return a - b;
	}
}
