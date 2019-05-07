import {Register16} from './Register16';
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

	// DEC r16
	new Register16(0x0B, 'b', 'c'),
	new Register16(0x1B, 'd', 'e'),
	new Register16(0x2B, 'h', 'l'),
	new Register16(0x3B, 'stackPointer'),
];
