import {ICpuRegisters} from '../../../../Hardware';
import {Instruction} from '../../../Instruction';
import {RegisterFlag} from '../../../RegisterFlag';

export abstract class AbstractOrRegister8 extends Instruction {
	protected process(registers: ICpuRegisters, a: number, b: number): number {
		registers.flags = 0;

		const result = a | b;

		if (result === 0)
			registers.flags |= RegisterFlag.ZERO;

		return result;
	}
}
