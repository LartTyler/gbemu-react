import {IHardwareBus} from '../../../../Hardware';
import {CpuRegister8} from '../../../Registers';
import {AbstractXorRegister8} from './AbstractXorRegister8';

/**
 * XOR r8, r8
 */
export class Register8AndRegister8 extends AbstractXorRegister8 {
	public constructor(code: number, protected target: CpuRegister8, protected other: CpuRegister8) {
		super(code, `XOR ${target.toUpperCase()}, ${other.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(registers, registers[this.target], registers[this.other]);
	}
}
