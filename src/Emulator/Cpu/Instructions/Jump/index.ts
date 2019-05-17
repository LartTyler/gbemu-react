import {ConditionalRelativeSigned8} from './ConditionalRelativeSigned8';
import {ConditionalValue16} from './ConditionalValue16';
import {Register16Address} from './Register16Address';
import {RelativeSigned8} from './RelativeSigned8';
import {Value16} from './Value16';

export const jumpInstructions = [
	// JP n16
	new Value16(/* 0xC3 */),

	// JP (r16)
	new Register16Address(0xE9, 'hl'),

	// JP cc, n16
	new ConditionalValue16(0xC2, 'NZ'),
	new ConditionalValue16(0xCA, 'Z'),
	new ConditionalValue16(0xD2, 'NC'),
	new ConditionalValue16(0xDA, 'C'),

	// JR s8
	new RelativeSigned8(/* 0x18 */),

	// JR cc, s8
	new ConditionalRelativeSigned8(0x20, 'NZ'),
	new ConditionalRelativeSigned8(0x28, 'Z'),
	new ConditionalRelativeSigned8(0x30, 'NC'),
	new ConditionalRelativeSigned8(0x38, 'C'),
];
