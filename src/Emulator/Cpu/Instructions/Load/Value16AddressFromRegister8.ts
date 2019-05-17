import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';
import {CpuRegister8} from '../../Registers';

/**
 * LD (n16), r8
 */
export class Value16AddressFromRegister8 extends Instruction {
	public constructor(code: number, protected source: CpuRegister8) {
		super(code, `LD (n16), ${source.toUpperCase()}`, 3, 4);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		hardware.memory.write(hardware.memory.readWord(registers.programCounter), registers[this.source]);
	}
}
