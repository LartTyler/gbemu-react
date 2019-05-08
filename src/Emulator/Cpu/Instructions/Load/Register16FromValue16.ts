import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {CpuRegister16} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * LD r16, n16
 */
export class Register16FromValue16 extends Instruction {
	public constructor(code: number, protected target: CpuRegister16) {
		super(code, `LD ${toRegisterDisplayName(target)}, n16`, 3, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.registers[this.target] = hardware.memory.readWord(hardware.cpu.registers.programCounter);
	}
}
