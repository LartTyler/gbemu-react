import {IHardwareBus} from '../../../../Hardware';
import {Instruction} from '../../../Instruction';
import {RegisterFlag} from '../../../RegisterFlag';

/**
 * RRA
 */
export class RegisterARightCarry extends Instruction {
	public constructor() {
		super(0x1F, 'RRA', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		const lowBit = registers.a & 0x01; // mask off all bits except LSB
		registers.a = registers.a >> 1;

		if (registers.flags & RegisterFlag.CARRY)
			registers.a |= 0x80; // mask on MSB

		if (lowBit)
			registers.flags = RegisterFlag.CARRY;
		else
			registers.flags = 0;
	}
}
