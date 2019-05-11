import {Register8FromRegister8} from './Register8FromRegister8';

export const subtractInstructions = [
	// SUB r8, r8
	new Register8FromRegister8(0x90, 'a', 'b'),
	new Register8FromRegister8(0x91, 'a', 'c'),
	new Register8FromRegister8(0x92, 'a', 'd'),
	new Register8FromRegister8(0x93, 'a', 'e'),
	new Register8FromRegister8(0x94, 'a', 'h'),
	new Register8FromRegister8(0x95, 'a', 'l'),
	new Register8FromRegister8(0x97, 'a', 'a'),
];
