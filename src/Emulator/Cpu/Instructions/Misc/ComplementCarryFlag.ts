import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../RegisterFlag';

/**
 * CCF
 */
export class ComplementCarryFlag extends Instruction {
	public constructor() {
		super(0x3F, 'CCF', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		// Mask off all flags except Z, which shouldn't be modified, and C, which will be toggled in the next
		// expression.
		registers.flags &= RegisterFlag.ZERO | RegisterFlag.CARRY;

		registers.flags ^= RegisterFlag.CARRY; // Carry flag, you're looking quite stunning tonight
	}
}
