import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

/**
 * DI
 */
export class DisableInterrupts extends Instruction {
	public constructor() {
		super(0xF3, 'DI', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.memory.interrupts.enabled = false;
	}
}
