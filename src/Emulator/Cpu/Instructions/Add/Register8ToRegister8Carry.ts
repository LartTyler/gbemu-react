import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8} from '../../Registers';
import {AbstractToRegister8} from './AbstractToRegister8';

/**
 * ADC r8, r8
 */
export class Register8ToRegister8Carry extends AbstractToRegister8 {
	public constructor(code: number, protected target: CpuRegister8, protected source: CpuRegister8) {
		super(code, `ADC ${target.toUpperCase()}, ${source.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(registers, registers[this.target], registers[this.source], true);
	}
}
