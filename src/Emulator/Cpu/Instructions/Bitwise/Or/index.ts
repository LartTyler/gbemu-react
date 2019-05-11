import {Register8AndRegister8} from './Register8AndRegister8';

export const orInstructions = [
	// OR r8, r8
	new Register8AndRegister8(0xB0, 'a', 'b'),
	new Register8AndRegister8(0xB1, 'a', 'c'),
	new Register8AndRegister8(0xB2, 'a', 'd'),
	new Register8AndRegister8(0xB3, 'a', 'e'),
	new Register8AndRegister8(0xB4, 'a', 'h'),
	new Register8AndRegister8(0xB5, 'a', 'l'),
	new Register8AndRegister8(0xB7, 'a', 'a'),
];
