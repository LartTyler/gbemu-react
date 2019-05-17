import {IHardwareBus} from '../../../../Hardware';
import {fromTwosComplement} from '../../../../Utility/number';
import {Instruction} from '../../../Instruction';
import {RegisterFlag} from '../../../RegisterFlag';

/**
 * ADD SP, s8
 */
export class Signed8 extends Instruction {
	public constructor() {
		super(0xE8, 'ADD SP, n8', 2, 4);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		registers.flags = 0;

		const value = fromTwosComplement(hardware.memory.read(registers.programCounter));
		const result = registers.stackPointer + value;

		if (result > 0xFFFF)
			registers.flags |= RegisterFlag.CARRY;

		if (value > 0) {
			if ((registers.stackPointer & 0xF) + (value & 0xF) & 0x10)
				registers.flags |= RegisterFlag.HALF_CARRY;
		} else if (value < 0) {
			if ((registers.stackPointer & 0xF) - (Math.abs(value) & 0xF) < 0)
				registers.flags |= RegisterFlag.HALF_CARRY;
		}

		registers.stackPointer = result;
	}
}
