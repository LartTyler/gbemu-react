import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../RegisterFlag';
import {CpuRegister8} from '../../Registers';

/**
 * DEC r8
 */
export class Register8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `DEC ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		// A half carry can occur if the bits in the lower nibble are all off prior to the operation.
		const halfCarry = (registers[this.target] & 0xF) === 0;
		registers[this.target] -= 1;

		registers.flags &= RegisterFlag.CARRY; // Mask off all flags except the carry flag, which shouldn't be modified
		registers.flags |= RegisterFlag.SUBTRACT;

		if (halfCarry)
			registers.flags |= RegisterFlag.HALF_CARRY;
		else if (registers[this.target] === 0)
			registers.flags |= RegisterFlag.ZERO;
	}
}
