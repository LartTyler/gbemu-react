import {IHardwareBus} from '../../../Hardware';
import {toFlagDisplayName} from '../../../Utility/string';
import {RegisterFlag} from '../../RegisterFlag';
import {AbstractReturn} from './AbstractReturn';

/**
 * RET cc
 */
export class ConditionalReturn extends AbstractReturn {
	public constructor(code: number, protected flag: RegisterFlag, protected requireSet: boolean) {
		super(code, `RET ${requireSet ? '' : 'N'}${toFlagDisplayName(flag)}`, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		this.process(hardware, (flags: number) => {
			const flagCheck = flags & this.flag;

			return this.requireSet && flagCheck > 0 || !this.requireSet && flagCheck === 0;
		});
	}
}
