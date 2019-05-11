import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {CpuRegister16, CpuRegister8} from '../../Registers';
import {AbstractFromRegister8} from './AbstractFromRegister8';

/**
 * SUB r8, (r16)
 */
export class Register16AddressFromRegister8 extends AbstractFromRegister8 {
	public constructor(code: number, protected minuend: CpuRegister8, protected subtrahend: CpuRegister16) {
		super(code, `SUB ${minuend.toUpperCase()}, (${toRegisterDisplayName(subtrahend)})`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.minuend] = this.process(
			registers,
			registers[this.minuend],
			hardware.memory.read(registers[this.subtrahend]),
			false,
		);
	}
}
