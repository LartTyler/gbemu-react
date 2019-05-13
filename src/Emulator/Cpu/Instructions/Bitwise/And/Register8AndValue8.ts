import {IHardwareBus} from '../../../../Hardware';
import {CpuRegister8} from '../../../Registers';
import {AbstractAndRegister8} from './AbstractAndRegister8';

/**
 * AND r8, n8
 */
export class Register8AndValue8 extends AbstractAndRegister8 {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `AND ${target.toUpperCase()}, n8`, 2, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(
			registers,
			registers[this.target],
			hardware.memory.read(registers.programCounter),
		);
	}
}
