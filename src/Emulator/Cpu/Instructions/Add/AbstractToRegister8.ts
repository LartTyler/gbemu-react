import {ICpuRegisters} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../Registers';

export abstract class AbstractToRegister8 extends Instruction {
	protected process(registers: ICpuRegisters, a: number, b: number): number {
		registers.flags = 0;

		if ((a & 0xF) + (b & 0xF) & 0x10)
			registers.flags |= RegisterFlag.HALF_CARRY;

		const result = a + b;

		if (result > 0xFF)
			registers.flags |= RegisterFlag.CARRY;

		if ((result & 0xFF) === 0)
			registers.flags |= RegisterFlag.ZERO;

		return result;
	}
}
