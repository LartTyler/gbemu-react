import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8} from '../../Registers';
import {AbstractFromRegister8} from './AbstractFromRegister8';

/**
 * SUB r8, r8
 */
export class Register8FromRegister8 extends AbstractFromRegister8 {
	public constructor(code: number, protected minuend: CpuRegister8, protected subtrahend: CpuRegister8) {
		super(code, `SUB ${minuend.toUpperCase()}, ${subtrahend.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.minuend] = this.process(registers, registers[this.minuend], registers[this.subtrahend]);
	}
}
