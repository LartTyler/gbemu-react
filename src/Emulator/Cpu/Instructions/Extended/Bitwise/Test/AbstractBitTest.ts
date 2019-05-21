import {ICpuRegisters} from '../../../../../Hardware';
import {Instruction} from '../../../../Instruction';
import {RegisterFlag} from '../../../../RegisterFlag';
import {BitPosition} from '../../../../Registers';

export abstract class AbstractBitTest extends Instruction {
	protected process(registers: ICpuRegisters, value: number, position: BitPosition): void {
		// Mask off all flags except C, which shouldn't be modified, and then mask on H, which should always be set.
		registers.flags = (registers.flags & RegisterFlag.CARRY) | RegisterFlag.HALF_CARRY;

		const test = value & (1 << position);

		if (test === 0)
			registers.flags |= RegisterFlag.ZERO;
	}
}
