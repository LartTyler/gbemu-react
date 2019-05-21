import {Register16Address} from './Register16Address';
import {Register8} from './Register8';

export const bitTestInstructions = [
	// BIT 0, r8
	new Register8(0x40, 'b', 0),
	new Register8(0x41, 'c', 0),
	new Register8(0x42, 'd', 0),
	new Register8(0x43, 'e', 0),
	new Register8(0x44, 'h', 0),
	new Register8(0x45, 'l', 0),
	new Register8(0x47, 'a', 0),

	// BIT 1, r8
	new Register8(0x48, 'b', 1),
	new Register8(0x49, 'c', 1),
	new Register8(0x4A, 'd', 1),
	new Register8(0x4B, 'e', 1),
	new Register8(0x4C, 'h', 1),
	new Register8(0x4D, 'l', 1),
	new Register8(0x4F, 'a', 1),

	// BIT 2, r8
	new Register8(0x50, 'b', 2),
	new Register8(0x51, 'c', 2),
	new Register8(0x52, 'd', 2),
	new Register8(0x53, 'e', 2),
	new Register8(0x54, 'h', 2),
	new Register8(0x55, 'l', 2),
	new Register8(0x57, 'a', 2),

	// BIT 3, r8
	new Register8(0x58, 'b', 3),
	new Register8(0x59, 'c', 3),
	new Register8(0x5A, 'd', 3),
	new Register8(0x5B, 'e', 3),
	new Register8(0x5C, 'h', 3),
	new Register8(0x5D, 'l', 3),
	new Register8(0x5F, 'a', 3),

	// BIT 4, r8
	new Register8(0x60, 'b', 4),
	new Register8(0x61, 'c', 4),
	new Register8(0x62, 'd', 4),
	new Register8(0x63, 'e', 4),
	new Register8(0x64, 'h', 4),
	new Register8(0x65, 'l', 4),
	new Register8(0x67, 'a', 4),

	// BIT 5, r8
	new Register8(0x68, 'b', 5),
	new Register8(0x69, 'c', 5),
	new Register8(0x6A, 'd', 5),
	new Register8(0x6B, 'e', 5),
	new Register8(0x6C, 'h', 5),
	new Register8(0x6D, 'l', 5),
	new Register8(0x6F, 'a', 5),

	// BIT 6, r8
	new Register8(0x70, 'b', 6),
	new Register8(0x71, 'c', 6),
	new Register8(0x72, 'd', 6),
	new Register8(0x73, 'e', 6),
	new Register8(0x74, 'h', 6),
	new Register8(0x75, 'l', 6),
	new Register8(0x77, 'a', 6),

	// BIT 7, r8
	new Register8(0x78, 'b', 7),
	new Register8(0x79, 'c', 7),
	new Register8(0x7A, 'd', 7),
	new Register8(0x7B, 'e', 7),
	new Register8(0x7C, 'h', 7),
	new Register8(0x7D, 'l', 7),
	new Register8(0x7F, 'a', 7),

	// BIT b, (r16)
	new Register16Address(0x46, 'hl', 0),
	new Register16Address(0x4E, 'hl', 1),
	new Register16Address(0x56, 'hl', 2),
	new Register16Address(0x5E, 'hl', 3),
	new Register16Address(0x66, 'hl', 4),
	new Register16Address(0x6E, 'hl', 5),
	new Register16Address(0x76, 'hl', 6),
	new Register16Address(0x7E, 'hl', 7),
];
