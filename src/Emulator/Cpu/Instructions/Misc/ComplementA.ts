import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../RegisterFlag';

/**
 * CPL
 */
export class ComplementA extends Instruction {
	constructor() {
		super(0x2F, 'CPL', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.registers.a = ~hardware.cpu.registers.a;
		hardware.cpu.registers.flags |= RegisterFlag.SUBTRACT | RegisterFlag.HALF_CARRY;
	}
}
