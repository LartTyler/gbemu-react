import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

/**
 * STOP
 */
export class Stop extends Instruction {
	public constructor() {
		super(0x10, 'STOP', 2, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.stop();
	}
}
