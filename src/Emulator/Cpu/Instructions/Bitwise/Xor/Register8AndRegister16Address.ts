import {IHardwareBus} from '../../../../Hardware';
import {toRegisterDisplayName} from '../../../../Utility/string';
import {CpuRegister16, CpuRegister8} from '../../../Registers';
import {AbstractXorRegister8} from './AbstractXorRegister8';

/**
 * XOR r8, (r16)
 */
export class Register8AndRegister16Address extends AbstractXorRegister8 {
	public constructor(code: number, protected target: CpuRegister8, protected source: CpuRegister16) {
		super(code, `XOR ${target.toUpperCase()}, (${toRegisterDisplayName(source)})`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(
			registers,
			registers[this.target],
			hardware.memory.read(registers[this.source]),
		);
	}
}
