import {IHardwareBus} from '../../../../Hardware';
import {Instruction} from '../../../Instruction';
import {RegisterFlag} from '../../../RegisterFlag';
import {Abstract8BitLeft} from './Abstract8BitLeft';

/**
 * RLCA
 */
export class RegisterALeft extends Abstract8BitLeft {
	public constructor() {
		super(0x07, 'RLCA', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers.a = this.process(registers, registers.a);
	}
}
