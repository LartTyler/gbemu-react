import {IHardwareBus} from '../../../../../Hardware';
import {RegisterFlag} from '../../../../RegisterFlag';
import {CpuRegister16} from '../../../../Registers';
import {Abstract8BitRight} from '../../../Bitwise/Shift/Abstract8BitRight';

/**
 * RRC (r16)
 */
export class Register16AddressRight extends Abstract8BitRight {
	public constructor(code: number, protected target: CpuRegister16) {
		super(code, `RRC (${target.toUpperCase()})`, 1, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		const value = this.process(registers, hardware.memory.read(registers[this.target]));

		hardware.memory.write(registers[this.target], value);

		if (value === 0)
			registers.flags |= RegisterFlag.ZERO;
	}
}
