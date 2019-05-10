import {RegisterFlag} from '../../Registers';
import {ConditionalRelativeSigned8} from './ConditionalRelativeSigned8';
import {RelativeSigned8} from './RelativeSigned8';

export const jumpInstructions = [
	// JR s8
	new RelativeSigned8(),

	// JR cc, s8
	new ConditionalRelativeSigned8(0x20, RegisterFlag.ZERO, false),
	new ConditionalRelativeSigned8(0x28, RegisterFlag.ZERO, true),
	new ConditionalRelativeSigned8(0x30, RegisterFlag.CARRY, false),
	new ConditionalRelativeSigned8(0x38, RegisterFlag.CARRY, true),
];
