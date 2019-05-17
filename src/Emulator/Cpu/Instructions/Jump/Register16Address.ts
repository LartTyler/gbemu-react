import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {Instruction} from '../../Instruction';
import {CpuRegister16} from '../../Registers';

/**
 * JP (r16)
 */
export class Register16Address extends Instruction {
	public constructor(code: number, protected source: CpuRegister16) {
		super(code, `JP (${toRegisterDisplayName(source)})`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers.programCounter = hardware.memory.readWord(registers[this.source]);
	}
}
