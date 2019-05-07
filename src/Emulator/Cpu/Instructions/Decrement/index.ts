import {Register8} from './Register8';

export const decrementInstructions = [
	// DEC r8
	new Register8(0x05, 'b'),
	new Register8(0x0D, 'c'),
	new Register8(0x15, 'd'),
	new Register8(0x1D, 'e'),
	new Register8(0x25, 'h'),
	new Register8(0x2D, 'l'),
	new Register8(0x3D, 'a'),
];
