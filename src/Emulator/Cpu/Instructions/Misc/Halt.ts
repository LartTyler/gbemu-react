import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

/**
 * HALT
 */
export class Halt extends Instruction {
	public constructor() {
		super(0x76, 'HALT', 1, 0);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.stop();
	}
}
