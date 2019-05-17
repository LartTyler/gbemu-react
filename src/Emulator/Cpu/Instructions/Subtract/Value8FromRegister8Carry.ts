import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8} from '../../Registers';
import {AbstractFromRegister8} from './AbstractFromRegister8';

/**
 * SBC r8, n8
 */
export class Value8FromRegister8Carry extends AbstractFromRegister8 {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `SBC ${target.toUpperCase()}`, 2, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(
			registers,
			registers[this.target],
			hardware.memory.read(registers.programCounter),
			true,
		);
	}
}
