import {IHardwareBus} from '../../../../Hardware';
import {CpuRegister8} from '../../../Registers';
import {AbstractXorRegister8} from './AbstractXorRegister8';

/**
 * XOR r8, n8
 */
export class Register8AndValue8 extends AbstractXorRegister8 {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `XOR ${target.toUpperCase()}, n8`, 2, 2);
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
