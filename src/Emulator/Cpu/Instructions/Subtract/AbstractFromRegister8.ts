import {ICpuRegisters} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../Registers';

export abstract class AbstractFromRegister8 extends Instruction {
	protected process(registers: ICpuRegisters, a: number, b: number, useCarry: boolean): number {
		const carry = useCarry ? (registers.flags & RegisterFlag.CARRY) >> 4 : 0;
		registers.flags = RegisterFlag.SUBTRACT;

		if ((a & 0xF) - (b & 0xF) - carry < 0)
			registers.flags |= RegisterFlag.HALF_CARRY;

		const result = a - b - carry;

		if (result < 0)
			registers.flags |= RegisterFlag.CARRY;
		else if (result === 0)
			registers.flags |= RegisterFlag.ZERO;

		return result;
	}
}
