import {IHardwareBus} from '../../../../../../Hardware';
import {toRegisterDisplayName} from '../../../../../../Utility/string';
import {CpuRegister16} from '../../../../../Registers';
import {Abstract8BitLeft} from './Abstract8BitLeft';

/**
 * SLA (r16)
 */
export class Register16AddressLeft extends Abstract8BitLeft {
	public constructor(code: number, protected pointer: CpuRegister16) {
		super(code, `SLA ${toRegisterDisplayName(pointer)}`, 1, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		const value = this.process(registers, hardware.memory.read(registers[this.pointer]));

		hardware.memory.write(registers[this.pointer], value);
	}
}
