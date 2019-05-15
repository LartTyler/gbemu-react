import {IHardwareBus} from '../../../../Hardware';
import {Abstract8BitRightCarry} from './Abstract8BitRightCarry';

/**
 * RRA
 */
export class RegisterARightCarry extends Abstract8BitRightCarry {
	public constructor() {
		super(0x1F, 'RRA', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers.a = this.process(registers, registers.a);
	}
}
