import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {CpuRegister8, RegisterFlag} from '../../Registers';

/**
 * ADD r8, r8
 */
export class Register8ToRegister8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister8, protected source: CpuRegister8) {
		super(code, `ADD ${target.toUpperCase()}, ${source.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		registers.flags = 0;

		const a = registers[this.target];
		const b = registers[this.source];

		if ((a & 0xF) + (b & 0xF) & 0x10)
			registers.flags |= RegisterFlag.HALF_CARRY;

		const result = a + b;

		if (result > 0xFF)
			registers.flags |= RegisterFlag.CARRY;

		registers[this.target] = result;

		if (registers[this.target] === 0)
			registers.flags |= RegisterFlag.ZERO;
	}
}
