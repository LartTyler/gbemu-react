import {IHardwareBus} from '../../../../Hardware';
import {Instruction} from '../../../Instruction';
import {RegisterFlag} from '../../../RegisterFlag';

/**
 * RRCA
 */
export class RegisterARight extends Instruction {
	public constructor() {
		super(0x0F, 'RRCA', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		const lowBit = registers.a & 0x01; // mask off all bits except LSB
		registers.a = registers.a >> 1;

		if (lowBit) {
			registers.a |= 0x80; // mask on MSB
			registers.flags = RegisterFlag.CARRY;
		} else
			registers.flags = 0;
	}
}
