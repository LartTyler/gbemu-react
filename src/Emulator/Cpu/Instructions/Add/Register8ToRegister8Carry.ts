import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {CpuRegister8, RegisterFlag} from '../../Registers';

/**
 * ADC r8, r8
 */
export class Register8ToRegister8Carry extends Instruction {
	public constructor(code: number, protected target: CpuRegister8, protected source: CpuRegister8) {
		super(code, `ADC ${target.toUpperCase()}, ${source.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		const a = registers[this.target];
		const b = registers[this.source];
		const carry = registers.flags & RegisterFlag.CARRY;

		registers.flags = 0;

		if ((a & 0xF) + (b & 0xF) + 1 & 0x10)
			registers.flags |= RegisterFlag.HALF_CARRY;

		const result = a + b + (carry ? 1 : 0);

		if (result > 0xFF)
			registers.flags |= RegisterFlag.CARRY;

		registers[this.target] = result;

		if (registers[this.target] === 0)
			registers.flags |= RegisterFlag.ZERO;
	}
}
