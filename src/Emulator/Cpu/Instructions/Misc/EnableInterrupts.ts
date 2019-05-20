import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

/**
 * EI
 */
export class EnableInterrupts extends Instruction {
	public constructor() {
		super(0xFB, 'EI', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.memory.interrupts.enabled = true;
	}
}
