import {IHardwareBus} from '../../../../Hardware';
import {Abstract8BitLeftCarry} from './Abstract8BitLeftCarry';

/**
 * RLA
 */
export class RegisterALeftCarry extends Abstract8BitLeftCarry {
	public constructor() {
		super(0x17, 'RLA', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers.a = this.process(registers, registers.a);
	}
}
