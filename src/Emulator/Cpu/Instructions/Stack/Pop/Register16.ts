import {IHardwareBus} from '../../../../Hardware';
import {toRegisterDisplayName} from '../../../../Utility/string';
import {Instruction} from '../../../Instruction';
import {CpuRegister16} from '../../../Registers';

/**
 * POP r16
 */
export class Register16 extends Instruction {
	public constructor(code: number, protected target: CpuRegister16) {
		super(code, `POP ${toRegisterDisplayName(target)}`, 1, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = hardware.memory.readWord(registers.stackPointer);
		registers.stackPointer += 2;
	}
}
