import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * LD r8, n8
 */
export class Register8FromValue8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `LD ${target.toUpperCase()}, (PC)`, 2, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.registers[this.target] = hardware.memory.read(hardware.cpu.registers.programCounter);
	}
}
