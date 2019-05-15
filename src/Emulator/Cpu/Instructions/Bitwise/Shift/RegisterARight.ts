import {IHardwareBus} from '../../../../Hardware';
import {Abstract8BitRight} from './Abstract8BitRight';

/**
 * RRCA
 */
export class RegisterARight extends Abstract8BitRight {
	public constructor() {
		super(0x0F, 'RRCA', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers.a = this.process(registers, registers.a);
	}
}
