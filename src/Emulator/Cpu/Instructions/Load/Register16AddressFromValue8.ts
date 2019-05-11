import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {Instruction} from '../../Instruction';
import {CpuRegister16} from '../../Registers';

/**
 * LD (r16), n8
 */
export class Register16AddressFromValue8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister16) {
		super(code, `LD (${toRegisterDisplayName(target)}), n8`, 2, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		hardware.memory.write(registers[this.target], hardware.memory.read(registers.programCounter));
	}
}
