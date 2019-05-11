import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8} from '../../Registers';
import {AbstractFromRegister8} from './AbstractFromRegister8';

/**
 * CP r8, r8
 */
export class CompareRegister8AndRegister8 extends AbstractFromRegister8 {
	public constructor(code: number, protected minuend: CpuRegister8, protected subtrahend: CpuRegister8) {
		super(code, `CP ${minuend.toUpperCase()}, ${subtrahend.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		this.process(
			hardware.cpu.registers,
			hardware.cpu.registers[this.minuend],
			hardware.cpu.registers[this.subtrahend],
			false,
		);
	}
}
