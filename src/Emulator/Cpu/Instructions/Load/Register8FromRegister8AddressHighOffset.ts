import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {CpuRegister8} from '../../Registers';

/**
 * LDH r8, (r8)
 */
export class Register8FromRegister8AddressHighOffset extends Instruction {
	public constructor(code: number, protected target: CpuRegister8, protected source: CpuRegister8) {
		super(code, `LDH ${target.toUpperCase()}, (${source.toUpperCase()})`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = hardware.memory.read(0xFF00 + registers[this.source]);
	}
}
