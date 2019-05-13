import {IHardwareBus} from '../../../../Hardware';
import {toRegisterDisplayName} from '../../../../Utility/string';
import {Instruction} from '../../../Instruction';
import {CpuRegister16} from '../../../Registers';

/**
 * PUSH r16
 */
export class Register16 extends Instruction {
	public constructor(code: number, protected source: CpuRegister16) {
		super(code, `PUSH ${toRegisterDisplayName(source)}`, 1, 4);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.memory.stack.push(hardware.cpu.registers[this.source]);
	}
}
