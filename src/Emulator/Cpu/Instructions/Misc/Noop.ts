import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

export class Noop extends Instruction {
	public constructor() {
		super(0x00, 'NOP', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		// Noop
	}
}
