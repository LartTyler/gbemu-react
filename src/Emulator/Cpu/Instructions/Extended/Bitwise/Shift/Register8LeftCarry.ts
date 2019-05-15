import {IHardwareBus} from '../../../../../Hardware';
import {CpuRegister8} from '../../../../Registers';
import {Abstract8BitLeftCarry} from '../../../Bitwise/Shift/Abstract8BitLeftCarry';

/**
 * RL r8
 */
export class Register8LeftCarry extends Abstract8BitLeftCarry {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `RL ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(registers, registers[this.target]);
	}
}
