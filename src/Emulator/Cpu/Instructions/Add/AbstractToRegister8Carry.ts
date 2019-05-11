import {ICpuRegisters} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../Registers';

export abstract class AbstractToRegister8Carry extends Instruction {
	protected process(registers: ICpuRegisters, a: number, b: number): number {
		const carry = (registers.flags & RegisterFlag.CARRY) ? 1 : 0;

		registers.flags = 0;

		if ((a & 0xF) + (b & 0xF) + carry & 0x10)
			registers.flags |= RegisterFlag.HALF_CARRY;

		const result = a + b + carry;

		if (result > 0xFF)
			registers.flags |= RegisterFlag.CARRY;

		if ((result & 0xFF) === 0)
			registers.flags |= RegisterFlag.ZERO;

		return result;
	}
}
