import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8, RegisterFlag} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * INC r8
 */
export class Register8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `INC ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] += 1;

		registers.flags &= RegisterFlag.CARRY; // Mask off all flags except CARRY, which shouldn't be modified

		if (registers[this.target] === 0)
			registers.flags |= RegisterFlag.ZERO | RegisterFlag.HALF_CARRY;
	}
}
