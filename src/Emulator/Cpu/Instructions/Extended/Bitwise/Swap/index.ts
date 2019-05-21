import {Register16Address} from './Register16Address';
import {Register8} from './Register8';

export const swapInstructions = [
	// SWAP r8
	new Register8(0x30, 'b'),
	new Register8(0x31, 'c'),
	new Register8(0x32, 'd'),
	new Register8(0x33, 'e'),
	new Register8(0x34, 'h'),
	new Register8(0x35, 'l'),
	new Register8(0x37, 'a'),

	// SWAP (r16)
	new Register16Address(0x36, 'hl'),
];
