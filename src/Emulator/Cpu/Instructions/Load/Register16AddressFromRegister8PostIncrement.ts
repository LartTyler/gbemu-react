import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {Instruction} from '../../Instruction';
import {CpuRegister16, CpuRegister8} from '../../Registers';

/**
 * LDI (r16), r8
 */
export class Register16AddressFromRegister8PostIncrement extends Instruction {
	public constructor(code: number, protected target: CpuRegister16, protected source: CpuRegister8) {
		super(code, `LDI (${toRegisterDisplayName(target)}), ${source.toUpperCase()}`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		hardware.memory.write(registers[this.target]++, registers[this.source]);
	}
}
