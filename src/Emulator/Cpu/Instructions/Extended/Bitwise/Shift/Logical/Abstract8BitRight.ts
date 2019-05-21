import {ICpuRegisters} from '../../../../../../Hardware';
import {Instruction} from '../../../../../Instruction';
import {RegisterFlag} from '../../../../../RegisterFlag';

export abstract class Abstract8BitRight extends Instruction {
	protected process(registers: ICpuRegisters, value: number): number {
		const carry = value & 1;
		const result = value >> 1;

		registers.flags = 0;

		if (carry)
			registers.flags |= RegisterFlag.CARRY;

		if (result === 0)
			registers.flags |= RegisterFlag.ZERO;

		return result;
	}
}
