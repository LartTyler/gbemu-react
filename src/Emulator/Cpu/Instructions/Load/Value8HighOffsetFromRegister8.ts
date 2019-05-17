import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {CpuRegister8} from '../../Registers';

/**
 * LDH (n8), r8
 */
export class Value8HighOffsetFromRegister8 extends Instruction {
	public constructor(code: number, protected source: CpuRegister8) {
		super(code, `LDH (n8), ${source.toUpperCase()}`, 2, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		hardware.memory.write(0xFF00 + hardware.memory.read(registers.programCounter), registers[this.source]);
	}
}
