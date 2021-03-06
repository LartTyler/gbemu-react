import {Register16} from './Register16';
import {Register16Address} from './Register16Address';
import {Register8} from './Register8';

export const incrementInstructions = [
	// INC r8
	new Register8(0x04, 'b'),
	new Register8(0x0C, 'c'),
	new Register8(0x14, 'd'),
	new Register8(0x1C, 'e'),
	new Register8(0x24, 'h'),
	new Register8(0x2C, 'l'),
	new Register8(0x3C, 'a'),

	// INC r16
	new Register16(0x03, 'bc'),
	new Register16(0x13, 'de'),
	new Register16(0x23, 'hl'),
	new Register16(0x33, 'stackPointer'),

	// INC (r16)
	new Register16Address(0x34, 'hl'),
];
