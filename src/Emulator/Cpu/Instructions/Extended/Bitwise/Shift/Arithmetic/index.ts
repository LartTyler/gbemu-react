import {Register16AddressLeft} from './Register16AddressLeft';
import {Register16AddressRight} from './Register16AddressRight';
import {Register8Left} from './Register8Left';
import {Register8Right} from './Register8Right';

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

	// SRA r8
	new Register8Right(0x28, 'b'),
	new Register8Right(0x29, 'c'),
	new Register8Right(0x2A, 'd'),
	new Register8Right(0x2B, 'e'),
	new Register8Right(0x2C, 'h'),
	new Register8Right(0x2D, 'l'),
	new Register8Right(0x2F, 'a'),

	// SRA (r16)
	new Register16AddressRight(0x2E, 'hl'),
];
