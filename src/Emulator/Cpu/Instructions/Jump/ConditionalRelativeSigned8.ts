import {IHardwareBus} from '../../../Hardware';
import {toFlagDisplayName} from '../../../Utility/string';
import {RegisterFlag} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * JR cc, s8
 */
export class ConditionalRelativeSigned8 extends Instruction {
	public constructor(code: number, protected flag: RegisterFlag, protected requireSet: boolean) {
		super(code, `JR ${requireSet ? '' : 'N'}${toFlagDisplayName(flag)}`, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		// TODO Finish implementation
	}
}
