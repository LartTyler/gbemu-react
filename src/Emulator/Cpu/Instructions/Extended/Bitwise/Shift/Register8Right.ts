import {IHardwareBus} from '../../../../../Hardware';
import {RegisterFlag} from '../../../../RegisterFlag';
import {CpuRegister8} from '../../../../Registers';
import {Abstract8BitRight} from '../../../Bitwise/Shift/Abstract8BitRight';

export class Register8Right extends Abstract8BitRight {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `RLC ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(registers, registers[this.target]);

		if (registers[this.target] === 0)
			registers.flags |= RegisterFlag.ZERO;
	}
}
