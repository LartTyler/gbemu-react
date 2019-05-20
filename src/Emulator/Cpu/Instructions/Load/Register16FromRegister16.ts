import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {Instruction} from '../../Instruction';
import {CpuRegister16} from '../../Registers';

/**
 * LD r16, r16
 */
export class Register16FromRegister16 extends Instruction {
	public constructor(code: number, protected target: CpuRegister16, protected source: CpuRegister16) {
		super(code, `LD ${toRegisterDisplayName(target)}, ${toRegisterDisplayName(source)}`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.registers[this.target] = hardware.cpu.registers[this.source];
	}
}
