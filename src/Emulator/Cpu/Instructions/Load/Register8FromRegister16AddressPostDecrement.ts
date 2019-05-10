import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {Instruction} from '../../Instruction';
import {CpuRegister16, CpuRegister8} from '../../Registers';

/**
 * LDD r8, (r16)
 */
export class Register8FromRegister16AddressPostDecrement extends Instruction {
	public constructor(code: number, protected target: CpuRegister8, protected source: CpuRegister16) {
		super(code, `LDD ${target.toUpperCase()}, (${toRegisterDisplayName(source)})`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = hardware.memory.read(registers[this.source]--);
	}
}
