import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../Registers';

/**
 * SCF
 */
export class SetCarryFlag extends Instruction {
	public constructor() {
		super(0x37, 'SCF', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.registers.flags &= RegisterFlag.ZERO; // mask off all flags except Z, which shouldn't be modified
		hardware.cpu.registers.flags |= RegisterFlag.CARRY;
	}
}
