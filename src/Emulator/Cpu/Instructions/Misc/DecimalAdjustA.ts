import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../RegisterFlag';

/**
 * DAA
 */
export class DecimalAdjustA extends Instruction {
	public constructor() {
		super(0x27, 'DAA', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		// Mask off all flags except N (which shouldn't be modified) and C (which should remain set if it was
		// already set
		let newFlags = registers.flags & (RegisterFlag.SUBTRACT | RegisterFlag.CARRY);

		if (registers.flags & RegisterFlag.SUBTRACT) {
			if (registers.flags & RegisterFlag.CARRY)
				registers.a -= 0x60;

			if (registers.flags & RegisterFlag.HALF_CARRY)
				registers.a -= 0x06;
		} else {
			if (registers.flags & RegisterFlag.CARRY || registers.a > 0x99) {
				registers.a += 0x60;

				newFlags |= RegisterFlag.CARRY; // Mask on C, in case the overflow test triggered this block
			}

			if (registers.flags & RegisterFlag.HALF_CARRY || (registers.a & 0x0F) > 0x09)
				registers.a += 0x06;
		}

		if (registers.a === 0)
			newFlags |= RegisterFlag.ZERO;

		registers.flags = newFlags;
	}
}
