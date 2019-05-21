import {ICpuRegisters} from '../../../../../Hardware';
import {Instruction} from '../../../../Instruction';
import {RegisterFlag} from '../../../../RegisterFlag';

export abstract class Abstract8BitSwap extends Instruction {
	protected process(registers: ICpuRegisters, value: number): number {
		const result = (value << 4 & 0xF0) | (value >> 4);

		registers.flags = result === 0 ? RegisterFlag.ZERO : 0;

		return result;
	}
}
