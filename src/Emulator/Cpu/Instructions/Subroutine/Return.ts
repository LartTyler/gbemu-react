import {IHardwareBus} from '../../../Hardware';
import {AbstractReturn} from './AbstractReturn';

/**
 * RET
 */
export class Return extends AbstractReturn {
	public constructor() {
		super(0xC9, 'RET', 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		this.process(hardware);
	}
}
