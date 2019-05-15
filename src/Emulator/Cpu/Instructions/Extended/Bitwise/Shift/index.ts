import {Register8Left} from './Register8Left';
import {Register8LeftCarry} from './Register8LeftCarry';

export const extendedShiftInstructions = [
	// RLC r8
	new Register8Left(0x00, 'b'),
	new Register8Left(0x01, 'c'),
	new Register8Left(0x02, 'd'),
	new Register8Left(0x03, 'e'),
	new Register8Left(0x04, 'h'),
	new Register8Left(0x05, 'l'),
	new Register8Left(0x07, 'a'),

	// RL r8
	new Register8LeftCarry(0x10, 'b'),
	new Register8LeftCarry(0x11, 'c'),
	new Register8LeftCarry(0x12, 'd'),
	new Register8LeftCarry(0x13, 'e'),
	new Register8LeftCarry(0x14, 'h'),
	new Register8LeftCarry(0x15, 'l'),
	new Register8LeftCarry(0x17, 'a'),
];
