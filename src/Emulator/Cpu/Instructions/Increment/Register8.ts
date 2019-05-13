import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../RegisterFlag';
import {CpuRegister8} from '../../Registers';

/**
 * INC r8
 */
export class Register8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `INC ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		const halfCarry = ((registers[this.target] & 0xF) + 1) & 0x10;
		registers[this.target] += 1;

		registers.flags &= RegisterFlag.CARRY; // Mask off all flags except CARRY, which shouldn't be modified

		if (halfCarry)
			registers.flags |= RegisterFlag.HALF_CARRY;

		if (registers[this.target] === 0)
			registers.flags |= RegisterFlag.ZERO;
	}
}
