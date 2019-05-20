import {IHardwareBus} from '../../../Hardware';
import {fromTwosComplement} from '../../../Utility/number';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../RegisterFlag';
import {CpuRegister16} from '../../Registers';

/**
 * LDHL SP, s8
 */
export class Register16FromSPAndSignedValue8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister16) {
		super(code, `LDHL SP, s8`, 2, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		registers.flags = 0;

		const value = fromTwosComplement(hardware.memory.read(registers.programCounter));
		const result = registers.stackPointer + value;

		if (result > 0xFFFF)
			registers.flags |= RegisterFlag.CARRY;

		if (value > 0) {
			if ((registers.stackPointer & 0xF) + (value & 0xF) & 0x10)
				registers.flags |= RegisterFlag.HALF_CARRY;
		} else if (value < 0) {
			if ((registers.stackPointer & 0xF) - (Math.abs(value) & 0xF) < 0)
				registers.flags |= RegisterFlag.HALF_CARRY;
		}

		registers[this.target] = result;
	}
}
