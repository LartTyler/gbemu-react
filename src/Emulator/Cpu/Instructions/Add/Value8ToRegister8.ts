import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8} from '../../Registers';
import {AbstractToRegister8} from './AbstractToRegister8';

/**
 * ADD r8, n8
 */
export class Value8ToRegister8 extends AbstractToRegister8 {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `ADD ${target.toUpperCase()}, n8`, 2, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(
			registers,
			registers[this.target],
			hardware.memory.read(registers.programCounter),
			false,
		);
	}
}
