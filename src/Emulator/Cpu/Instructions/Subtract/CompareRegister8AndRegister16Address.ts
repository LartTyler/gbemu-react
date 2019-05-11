import {IHardwareBus} from '../../../Hardware';
import {toRegisterDisplayName} from '../../../Utility/string';
import {CpuRegister16, CpuRegister8} from '../../Registers';
import {AbstractFromRegister8} from './AbstractFromRegister8';

/**
 * CP r8, (r16)
 */
export class CompareRegister8AndRegister16Address extends AbstractFromRegister8 {
	public constructor(code: number, protected minuend: CpuRegister8, protected subtrahend: CpuRegister16) {
		super(code, `CP ${minuend.toUpperCase()}, (${toRegisterDisplayName(subtrahend)})`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		this.process(
			hardware.cpu.registers,
			hardware.cpu.registers[this.minuend],
			hardware.memory.read(hardware.cpu.registers[this.subtrahend]),
			false,
		);
	}
}
