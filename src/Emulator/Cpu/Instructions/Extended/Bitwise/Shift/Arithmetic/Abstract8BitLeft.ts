import {ICpuRegisters} from '../../../../../../Hardware';
import {Instruction} from '../../../../../Instruction';
import {RegisterFlag} from '../../../../../RegisterFlag';

export abstract class Abstract8BitLeft extends Instruction {
	protected process(registers: ICpuRegisters, value: number): number {
		registers.flags = 0;

		const carry = value & 0x80; // mask off all bits except MSB
		const result = value << 1;

		if (carry)
			registers.flags |= RegisterFlag.CARRY;

		if ((result & 0xFF) === 0)
			registers.flags |= RegisterFlag.ZERO;

		return result;
	}
}
