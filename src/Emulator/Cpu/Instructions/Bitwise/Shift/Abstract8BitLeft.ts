import {ICpuRegisters} from '../../../../Hardware';
import {Instruction} from '../../../Instruction';
import {RegisterFlag} from '../../../RegisterFlag';

export abstract class Abstract8BitLeft extends Instruction {
	protected process(registers: ICpuRegisters, value: number): number {
		const highBit = value & 0x80; // Mask off every bit except the MSB
		let result = value << 1;

		if (highBit) {
			result |= 0x01;
			registers.flags = RegisterFlag.CARRY;
		} else
			registers.flags = 0;

		return result;
	}
}
