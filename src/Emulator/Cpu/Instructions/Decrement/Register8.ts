import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8, RegisterFlag} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * DEC r8
 */
export class Register8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `DEC ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] -= 1;

		registers.flags &= RegisterFlag.CARRY; // Mask off all flags except the carry flag, which shouldn't be modified
		registers.flags |= RegisterFlag.SUBTRACT;

		if (registers[this.target] === 0xFF)
			registers.flags |= RegisterFlag.HALF_CARRY;
		else if (registers[this.target] === 0)
			registers.flags |= RegisterFlag.ZERO;
	}
}
