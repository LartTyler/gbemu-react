import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8} from '../../Registers';
import {AbstractFromRegister8} from './AbstractFromRegister8';

/**
 * SBC r8, r8
 */
export class Register8FromRegister8Carry extends AbstractFromRegister8 {
	public constructor(code: number, protected minuend: CpuRegister8, protected subtrahend: CpuRegister8) {
		super(code, `SBC ${minuend.toUpperCase()}, ${subtrahend.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.minuend] = this.process(registers, registers[this.minuend], registers[this.subtrahend], true);
	}
}
