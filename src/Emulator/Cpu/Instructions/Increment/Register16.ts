import {IHardwareBus} from '../../../Hardware';
import {from16Bit, to16Bit} from '../../../Utility/number';
import {toRegisterDisplayName} from '../../../Utility/string';
import {Instruction} from '../../Instruction';
import {CpuRegister, CpuRegister16} from '../../Registers';

/**
 * INC r16
 */
export class Register16 extends Instruction {
	public constructor(code: number, protected target: CpuRegister16) {
		super(code, `INC ${toRegisterDisplayName(target)}`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.registers[this.target] += 1;
	}
}
