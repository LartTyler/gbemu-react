import {IHardwareBus} from '../../../../../Hardware';
import {toRegisterDisplayName} from '../../../../../Utility/string';
import {CpuRegister16} from '../../../../Registers';
import {Abstract8BitLeft} from '../../../Bitwise/Shift/Abstract8BitLeft';

/**
 * RLC (r16)
 */
export class Register16AddressLeft extends Abstract8BitLeft {
	public constructor(code: number, protected source: CpuRegister16) {
		super(code, `RLC (${toRegisterDisplayName(source)})`, 1, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		const value = this.process(registers, hardware.memory.read(registers[this.source]));

		hardware.memory.write(registers[this.source], value);
	}
}
