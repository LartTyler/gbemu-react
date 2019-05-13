import {IHardwareBus} from '../../../Hardware';
import {AbstractCall} from './AbstractCall';

/**
 * CALL n16
 */
export class Call extends AbstractCall {
	public constructor() {
		super(0xCD, 'CALL n16', 3, 6);
	}

	protected invoke(hardware: IHardwareBus): void {
		this.process(hardware);
	}
}
