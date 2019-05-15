import {ICpuRegisters} from '../../../../Hardware';
import {Instruction} from '../../../Instruction';
import {RegisterFlag} from '../../../RegisterFlag';

export abstract class Abstract8BitRight extends Instruction {
	protected process(registers: ICpuRegisters, value: number): number {
		const lowBit = value & 0x01; // Mask off every bit except the LSB
		let result = value >> 1;

		if (lowBit) {
			result |= 0x80;
			registers.flags = RegisterFlag.CARRY;
		} else
			registers.flags = 0;

		return result;
	}
}
