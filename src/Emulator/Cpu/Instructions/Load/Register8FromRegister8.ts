import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {CpuRegister8} from '../../Registers';

/**
 * LD r8, r8
 */
export class Register8FromRegister8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister8, protected source: CpuRegister8) {
		super(code, `LD ${target.toUpperCase()}, ${source.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.registers[this.target] = hardware.cpu.registers[this.source];
	}
}
