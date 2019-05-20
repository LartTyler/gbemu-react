import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {CpuRegister8} from '../../Registers';

/**
 * LD r8, (n16)
 */
export class Register8FromValue16Address extends Instruction {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `LD ${target.toUpperCase()}, (n16)`, 3, 4);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = hardware.memory.read(hardware.memory.readWord(registers.programCounter));
	}
}
