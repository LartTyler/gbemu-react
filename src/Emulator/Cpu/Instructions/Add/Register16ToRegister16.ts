import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../RegisterFlag';
import {CpuRegister16} from '../../Registers';

/**
 * ADD r16, r16
 */
export class Register16ToRegister16 extends Instruction {
	public constructor(code: number, protected target: CpuRegister16, protected source: CpuRegister16) {
		super(code, `ADD ${target.toUpperCase()}, ${source.toUpperCase()}`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		registers.flags &= RegisterFlag.ZERO; // Mask off all flags except ZERO, which shouldn't be modified

		// TODO Double check that ZERO should not be set if the result is zero. It seems odd that all docs claim it
		//      isn't, when logically it should be.

		const a = registers[this.target];
		const b = registers[this.source];

		// if adding only the lower 11 bits of a and b give a result where the 12th bit is set
		if ((a & 0xFFF) + (b & 0xFFF) & 0x1000)
			registers.flags |= RegisterFlag.HALF_CARRY;

		const result = a + b;

		if (result > 0xFFFF)
			registers.flags |= RegisterFlag.CARRY;

		registers[this.target] = result;
	}
}
