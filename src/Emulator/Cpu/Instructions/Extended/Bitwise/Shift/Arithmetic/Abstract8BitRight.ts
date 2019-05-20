import {ICpuRegisters} from '../../../../../../Hardware';
import {Instruction} from '../../../../../Instruction';
import {RegisterFlag} from '../../../../../RegisterFlag';

export abstract class Abstract8BitRight extends Instruction {
	protected process(registers: ICpuRegisters, value: number): number {
		const sign = value & 0x80; // mask off all bits except the sign bit (MSB)
		const carry = value & 0x01; // mask off all bits except LSB
		let result = value >> 1;

		if (sign)
			result |= 0x80; // if we had a sign, preserve it after shift

		registers.flags = 0;

		if (carry)
			registers.flags |= RegisterFlag.CARRY;

		if ((result & 0xFF) === 0)
			registers.flags |= RegisterFlag.ZERO;

		return result;
	}
}
