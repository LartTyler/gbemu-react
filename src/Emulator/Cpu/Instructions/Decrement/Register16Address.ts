import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {Instruction} from '../../Instruction';
import {CpuRegister16, RegisterFlag} from '../../Registers';

/**
 * DEC (r16)
 */
export class Register16Address extends Instruction {
	public constructor(code: number, protected target: CpuRegister16) {
		super(code, `DEC (${toRegisterDisplayName(target)})`, 1, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		const value = hardware.memory.read(registers[this.target]);

		const halfCarry = (value & 0x0F) === 0;
		hardware.memory.write(registers[this.target], value - 1);

		registers.flags &= RegisterFlag.CARRY; // mask off all flags except C, which shouldn't be modified
		registers.flags |= RegisterFlag.SUBTRACT;

		if (halfCarry)
			registers.flags |= RegisterFlag.HALF_CARRY;
		else if (value - 1 === 0)
			registers.flags |= RegisterFlag.ZERO;
	}
}
