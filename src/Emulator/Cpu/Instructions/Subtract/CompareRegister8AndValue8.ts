import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8} from '../../Registers';
import {AbstractFromRegister8} from './AbstractFromRegister8';

export class CompareRegister8AndValue8 extends AbstractFromRegister8 {
	public constructor(code: number, protected minuend: CpuRegister8) {
		super(code, `CP ${minuend.toUpperCase()}, n8`, 2, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		this.process(
			hardware.cpu.registers,
			hardware.cpu.registers[this.minuend],
			hardware.memory.read(hardware.cpu.registers.programCounter),
			false,
		);
	}
}
