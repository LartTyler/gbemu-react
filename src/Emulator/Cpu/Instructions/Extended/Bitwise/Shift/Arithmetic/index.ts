import {Register16AddressLeft} from './Register16AddressLeft';
import {Register8Left} from './Register8Left';

export const shiftArithmeticInstructions = [
	// SLA r8
	new Register8Left(0x20, 'b'),
	new Register8Left(0x21, 'c'),
	new Register8Left(0x22, 'd'),
	new Register8Left(0x23, 'e'),
	new Register8Left(0x24, 'h'),
	new Register8Left(0x25, 'l'),
	new Register8Left(0x27, 'a'),

	// SLA (r16)
	new Register16AddressLeft(0x26, 'hl'),
];
