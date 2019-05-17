import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {CpuRegister8} from '../../Registers';

/**
 * LDH r8, (n8)
 */
export class Register8FromValue8HighOffset extends Instruction {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `LDH ${target.toUpperCase()}, (n8)`, 2, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = hardware.memory.read(0xFF00 + hardware.memory.read(registers.programCounter));
	}
}
