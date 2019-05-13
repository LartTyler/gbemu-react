import {RegisterFlag} from '../../RegisterFlag';
import {ConditionalRelativeSigned8} from './ConditionalRelativeSigned8';
import {ConditionalValue16} from './ConditionalValue16';
import {RelativeSigned8} from './RelativeSigned8';

export const jumpInstructions = [
	// JP cc, (n16)
	new ConditionalValue16(0xC2, 'NZ'),
	new ConditionalValue16(0xCA, 'Z'),
	new ConditionalValue16(0xD2, 'NC'),
	new ConditionalValue16(0xDA, 'C'),

	// JR s8
	new RelativeSigned8(),

	// JR cc, s8
	new ConditionalRelativeSigned8(0x20, 'NZ'),
	new ConditionalRelativeSigned8(0x28, 'Z'),
	new ConditionalRelativeSigned8(0x30, 'NC'),
	new ConditionalRelativeSigned8(0x38, 'C'),
];
