import {Register8AndRegister16Address} from './Register8AndRegister16Address';
import {Register8AndRegister8} from './Register8AndRegister8';
import {Register8AndValue8} from './Register8AndValue8';

export const orInstructions = [
	// OR r8, r8
	new Register8AndRegister8(0xB0, 'a', 'b'),
	new Register8AndRegister8(0xB1, 'a', 'c'),
	new Register8AndRegister8(0xB2, 'a', 'd'),
	new Register8AndRegister8(0xB3, 'a', 'e'),
	new Register8AndRegister8(0xB4, 'a', 'h'),
	new Register8AndRegister8(0xB5, 'a', 'l'),
	new Register8AndRegister8(0xB7, 'a', 'a'),

	// OR r8, n8
	new Register8AndValue8(0xF6, 'a'),

	// OR r8, (r16)
	new Register8AndRegister16Address(0xB6, 'a', 'hl'),
];
