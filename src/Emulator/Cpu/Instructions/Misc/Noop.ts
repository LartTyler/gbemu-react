import {IHardwareBus} from '../../../hardware';
import {Instruction} from '../../Instruction';

export class Noop extends Instruction {
	public constructor() {
		super(0x00, 'NOP', 1, 1);
	}

	public invoke(hardware: IHardwareBus): void {
		// Noop
	}
}
