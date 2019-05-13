import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../RegisterFlag';
import {CpuRegister16} from '../../Registers';

/**
 * INC (r16)
 */
export class Register16Address extends Instruction {
	constructor(code: number, protected target: CpuRegister16) {
		super(code, `INC (${toRegisterDisplayName(target)})`, 1, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		const value = hardware.memory.read(registers[this.target]);
		const halfCarry = ((value & 0xF) + 1) & 0x10;

		hardware.memory.write(registers[this.target], value + 1);

		registers.flags &= RegisterFlag.CARRY; // mask off all flags except C, which shouldn't be modified

		if (halfCarry)
			registers.flags |= RegisterFlag.HALF_CARRY;

		if (value + 1 > 0xFF)
			registers.flags |= RegisterFlag.ZERO;
	}
}
