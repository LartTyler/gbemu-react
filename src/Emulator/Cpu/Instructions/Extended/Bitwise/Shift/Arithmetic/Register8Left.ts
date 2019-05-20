import {IHardwareBus} from '../../../../../../Hardware';
import {CpuRegister8} from '../../../../../Registers';
import {Abstract8BitLeft} from './Abstract8BitLeft';

/**
 * SLA r8
 */
export class Register8Left extends Abstract8BitLeft {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `SLA ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(registers, registers[this.target]);
	}
}
