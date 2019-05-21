import {Register16AddressRight} from './Register16AddressRight';
import {Register8Right} from './Register8Right';

export const shiftLogicalInstructions = [
	// SRL r8
	new Register8Right(0x38, 'b'),
	new Register8Right(0x39, 'c'),
	new Register8Right(0x3A, 'd'),
	new Register8Right(0x3B, 'e'),
	new Register8Right(0x3C, 'h'),
	new Register8Right(0x3D, 'l'),
	new Register8Right(0x3F, 'a'),

	// SRL (r16)
	new Register16AddressRight(0x3E, 'hl'),
];
