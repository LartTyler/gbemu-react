import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8} from '../../Registers';
import {AbstractFromRegister8} from './AbstractFromRegister8';

/**
 * SUB r8, n8
 */
export class Value8FromRegister8 extends AbstractFromRegister8 {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `SUB ${target.toUpperCase()}, n8`, 2, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(
			registers,
			registers[this.target],
			hardware.memory.read(registers.programCounter),
			false,
		);
	}
}
