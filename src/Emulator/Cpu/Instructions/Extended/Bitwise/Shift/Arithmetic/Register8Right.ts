import {IHardwareBus} from '../../../../../../Hardware';
import {CpuRegister8} from '../../../../../Registers';
import {Abstract8BitRight} from './Abstract8BitRight';

/**
 * SRA r8
 */
export class Register8Right extends Abstract8BitRight {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `SRA ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(registers, registers[this.target]);
	}
}
