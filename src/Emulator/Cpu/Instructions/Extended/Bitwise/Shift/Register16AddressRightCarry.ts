import {IHardwareBus} from '../../../../../Hardware';
import {toRegisterDisplayName} from '../../../../../Utility/string';
import {RegisterFlag} from '../../../../RegisterFlag';
import {CpuRegister16} from '../../../../Registers';
import {Abstract8BitRightCarry} from '../../../Bitwise/Shift/Abstract8BitRightCarry';

/**
 * RR (r16)
 */
export class Register16AddressRightCarry extends Abstract8BitRightCarry {
	public constructor(code: number, protected target: CpuRegister16) {
		super(code, `RR (${toRegisterDisplayName(target)})`, 1, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		const value = this.process(registers, hardware.memory.read(registers[this.target]));

		hardware.memory.write(registers[this.target], value);

		if (value === 0)
			registers.flags |= RegisterFlag.ZERO;
	}
}
