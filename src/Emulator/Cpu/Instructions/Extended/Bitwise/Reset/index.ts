import {Register8} from './Register8';

export const bitResetInstructions = [
	// RES 0, r8
	new Register8(0x80, 'b', 0),
	new Register8(0x81, 'c', 0),
	new Register8(0x82, 'd', 0),
	new Register8(0x83, 'e', 0),
	new Register8(0x84, 'h', 0),
	new Register8(0x85, 'l', 0),
	new Register8(0x87, 'a', 0),

	// RES 1, r8
	new Register8(0x88, 'b', 1),
	new Register8(0x89, 'c', 1),
	new Register8(0x8A, 'd', 1),
	new Register8(0x8B, 'e', 1),
	new Register8(0x8C, 'h', 1),
	new Register8(0x8D, 'l', 1),
	new Register8(0x8F, 'a', 1),

	// RES 2, r8
	new Register8(0x90, 'b', 2),
	new Register8(0x91, 'c', 2),
	new Register8(0x92, 'd', 2),
	new Register8(0x93, 'e', 2),
	new Register8(0x94, 'h', 2),
	new Register8(0x95, 'l', 2),
	new Register8(0x97, 'a', 2),

	// RES 3, r8
	new Register8(0x98, 'b', 3),
	new Register8(0x99, 'c', 3),
	new Register8(0x9A, 'd', 3),
	new Register8(0x9B, 'e', 3),
	new Register8(0x9C, 'h', 3),
	new Register8(0x9D, 'l', 3),
	new Register8(0x9F, 'a', 3),

	// RES 4, r8
	new Register8(0xA0, 'b', 4),
	new Register8(0xA1, 'c', 4),
	new Register8(0xA2, 'd', 4),
	new Register8(0xA3, 'e', 4),
	new Register8(0xA4, 'h', 4),
	new Register8(0xA5, 'l', 4),
	new Register8(0xA7, 'a', 4),

	// RES 5, r8
	new Register8(0xA8, 'b', 5),
	new Register8(0xA9, 'c', 5),
	new Register8(0xAA, 'd', 5),
	new Register8(0xAB, 'e', 5),
	new Register8(0xAC, 'h', 5),
	new Register8(0xAD, 'l', 5),
	new Register8(0xAF, 'a', 5),

	// RES 6, r8
	new Register8(0xB0, 'b', 6),
	new Register8(0xB1, 'c', 6),
	new Register8(0xB2, 'd', 6),
	new Register8(0xB3, 'e', 6),
	new Register8(0xB4, 'h', 6),
	new Register8(0xB5, 'l', 6),
	new Register8(0xB7, 'a', 6),

	// RES 7, r8
	new Register8(0xB8, 'b', 7),
	new Register8(0xB9, 'c', 7),
	new Register8(0xBA, 'd', 7),
	new Register8(0xBB, 'e', 7),
	new Register8(0xBC, 'h', 7),
	new Register8(0xBD, 'l', 7),
	new Register8(0xBF, 'a', 7),
];
