import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8} from '../../Registers';
import {AbstractToRegister8} from './AbstractToRegister8';

/**
 * ADD r8, r8
 */
export class Register8ToRegister8 extends AbstractToRegister8 {
	public constructor(code: number, protected target: CpuRegister8, protected source: CpuRegister8) {
		super(code, `ADD ${target.toUpperCase()}, ${source.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(registers, registers[this.target], registers[this.source]);
	}
}
