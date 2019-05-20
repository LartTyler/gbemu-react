import {shiftArithmeticInstructions} from './Arithmetic';
import {Register16AddressLeft} from './Register16AddressLeft';
import {Register16AddressLeftCarry} from './Register16AddressLeftCarry';
import {Register16AddressRight} from './Register16AddressRight';
import {Register16AddressRightCarry} from './Register16AddressRightCarry';
import {Register8Left} from './Register8Left';
import {Register8LeftCarry} from './Register8LeftCarry';
import {Register8Right} from './Register8Right';
import {Register8RightCarry} from './Register8RightCarry';

export const extendedShiftInstructions = [
	// RLC r8
	new Register8Left(0x00, 'b'),
	new Register8Left(0x01, 'c'),
	new Register8Left(0x02, 'd'),
	new Register8Left(0x03, 'e'),
	new Register8Left(0x04, 'h'),
	new Register8Left(0x05, 'l'),
	new Register8Left(0x07, 'a'),

	// RLC (r16)
	new Register16AddressLeft(0x06, 'hl'),

	// RL r8
	new Register8LeftCarry(0x10, 'b'),
	new Register8LeftCarry(0x11, 'c'),
	new Register8LeftCarry(0x12, 'd'),
	new Register8LeftCarry(0x13, 'e'),
	new Register8LeftCarry(0x14, 'h'),
	new Register8LeftCarry(0x15, 'l'),
	new Register8LeftCarry(0x17, 'a'),

	// RL (r16)
	new Register16AddressLeftCarry(0x16, 'hl'),

	// RRC r8
	new Register8Right(0x08, 'b'),
	new Register8Right(0x09, 'c'),
	new Register8Right(0x0A, 'd'),
	new Register8Right(0x0B, 'e'),
	new Register8Right(0x0C, 'h'),
	new Register8Right(0x0D, 'l'),
	new Register8Right(0x0F, 'a'),

	// RRC (r16)
	new Register16AddressRight(0x0E, 'hl'),

	// RR r8
	new Register8RightCarry(0x18, 'b'),
	new Register8RightCarry(0x19, 'c'),
	new Register8RightCarry(0x1A, 'd'),
	new Register8RightCarry(0x1B, 'e'),
	new Register8RightCarry(0x1C, 'h'),
	new Register8RightCarry(0x1D, 'l'),
	new Register8RightCarry(0x1F, 'a'),

	// RR (r16)
	new Register16AddressRightCarry(0x1E, 'hl'),

	...shiftArithmeticInstructions,
];
