import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {CpuRegister16} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * DEC r16
 */
export class Register16 extends Instruction {
	public constructor(code: number, protected target: CpuRegister16) {
		super(code, `DEC ${toRegisterDisplayName(target)}`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.registers[this.target] -= 1;
	}
}
