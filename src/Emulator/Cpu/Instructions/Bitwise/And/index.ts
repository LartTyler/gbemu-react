import {Register8AndRegister16Address} from './Register8AndRegister16Address';
import {Register8AndRegister8} from './Register8AndRegister8';

export const andInstructions = [
	// AND r8, r8
	new Register8AndRegister8(0xA0, 'a', 'b'),
	new Register8AndRegister8(0xA1, 'a', 'c'),
	new Register8AndRegister8(0xA2, 'a', 'd'),
	new Register8AndRegister8(0xA3, 'a', 'e'),
	new Register8AndRegister8(0xA4, 'a', 'h'),
	new Register8AndRegister8(0xA5, 'a', 'l'),
	new Register8AndRegister8(0xA7, 'a', 'a'),

	// AND r8, (r16)
	new Register8AndRegister16Address(0xA6, 'a', 'hl'),
];
