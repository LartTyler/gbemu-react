import {IHardwareBus} from '../../../hardware';
import {CpuRegister, RegisterFlag} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * INC r8
 */
export class Register8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister) {
		super(code, `INC ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = (registers[this.target] + 1) & 0xFF;

		registers.flags &= RegisterFlag.CARRY;

		if (registers[this.target] === 0)
			registers.flags |= RegisterFlag.ZERO | RegisterFlag.HALF_CARRY;
	}
}
