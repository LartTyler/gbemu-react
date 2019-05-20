import {IHardwareBus} from '../../../../../Hardware';
import {toRegisterDisplayName} from '../../../../../Utility/string';
import {CpuRegister16} from '../../../../Registers';
import {Abstract8BitLeftCarry} from '../../../Bitwise/Shift/Abstract8BitLeftCarry';

/**
 * RL (r16)
 */
export class Register16AddressLeftCarry extends Abstract8BitLeftCarry {
	public constructor(code: number, protected target: CpuRegister16) {
		super(code, `RL ${toRegisterDisplayName(target)}`, 1, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		const value = this.process(registers, hardware.memory.read(registers[this.target]));

		hardware.memory.write(registers[this.target], value);
	}
}
