import {IHardwareBus} from '../../../Hardware';
import {CpuRegister8} from '../../Registers';
import {AbstractToRegister8} from './AbstractToRegister8';

/**
 * ADD r8, n8
 */
export class Value8ToRegister8 extends AbstractToRegister8 {
	public constructor(code: number, target: CpuRegister8) {
		super(code, `ADD ${target.toUpperCase()}, n8`, 2, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers.a = this.process(registers, registers.a, hardware.memory.read(registers.programCounter), false);
	}
}
