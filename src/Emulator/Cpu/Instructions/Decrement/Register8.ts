import {IHardwareBus} from '../../../hardware';
import {CpuRegister, RegisterFlag} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * DEC r8
 */
export class Register8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister) {
		super(code, `DEC ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = (registers[this.target] - 1) & 0xFF;

		registers.flags &= RegisterFlag.CARRY;
		registers.flags |= RegisterFlag.SUBTRACT;

		if (registers[this.target] === 0xFF)
			registers.flags |= RegisterFlag.HALF_CARRY;
		else if (registers[this.target] === 0)
			registers.flags |= RegisterFlag.ZERO;
	}
}
