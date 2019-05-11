import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {Instruction} from '../../Instruction';
import {CpuRegister16, CpuRegister8, RegisterFlag} from '../../Registers';

/**
 * ADD r8, (r16)
 */
export class Register16AddressToRegister8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister8, protected source: CpuRegister16) {
		super(code, `ADD ${target.toUpperCase()}, (${toRegisterDisplayName(source)})`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		registers.flags = 0;

		const a = registers[this.target];
		const b = hardware.memory.read(registers[this.source]);

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
