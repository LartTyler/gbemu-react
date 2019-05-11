import {Register8AndRegister8} from './Register8AndRegister8';

export const xorInstructions = [
	// XOR r8, r8
	new Register8AndRegister8(0xA8, 'a', 'b'),
	new Register8AndRegister8(0xA9, 'a', 'c'),
	new Register8AndRegister8(0xAA, 'a', 'd'),
	new Register8AndRegister8(0xAB, 'a', 'e'),
	new Register8AndRegister8(0xAC, 'a', 'h'),
	new Register8AndRegister8(0xAD, 'a', 'l'),
	new Register8AndRegister8(0xAF, 'a', 'a'),
];
