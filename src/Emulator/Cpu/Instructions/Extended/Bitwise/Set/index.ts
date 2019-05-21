import {Register8} from './Register8';

export const bitSetInstructions = [
	// BIT 0, r8
	new Register8(0xC0, 'b', 0),
	new Register8(0xC1, 'c', 0),
	new Register8(0xC2, 'd', 0),
	new Register8(0xC3, 'e', 0),
	new Register8(0xC4, 'h', 0),
	new Register8(0xC5, 'l', 0),
	new Register8(0xC7, 'a', 0),

	// BIT 1, r8
	new Register8(0xC8, 'b', 1),
	new Register8(0xC9, 'c', 1),
	new Register8(0xCA, 'd', 1),
	new Register8(0xCB, 'e', 1),
	new Register8(0xCC, 'h', 1),
	new Register8(0xCD, 'l', 1),
	new Register8(0xCF, 'a', 1),

	// BIT 2, r8
	new Register8(0xD0, 'b', 2),
	new Register8(0xD1, 'c', 2),
	new Register8(0xD2, 'd', 2),
	new Register8(0xD3, 'e', 2),
	new Register8(0xD4, 'h', 2),
	new Register8(0xD5, 'l', 2),
	new Register8(0xD7, 'a', 2),

	// BIT 3, r8
	new Register8(0xD8, 'b', 3),
	new Register8(0xD9, 'c', 3),
	new Register8(0xDA, 'd', 3),
	new Register8(0xDB, 'e', 3),
	new Register8(0xDC, 'h', 3),
	new Register8(0xDD, 'l', 3),
	new Register8(0xDF, 'a', 3),

	// BIT 4, r8
	new Register8(0xE0, 'b', 4),
	new Register8(0xE1, 'c', 4),
	new Register8(0xE2, 'd', 4),
	new Register8(0xE3, 'e', 4),
	new Register8(0xE4, 'h', 4),
	new Register8(0xE5, 'l', 4),
	new Register8(0xE7, 'a', 4),

	// BIT 5, r8
	new Register8(0xE8, 'b', 5),
	new Register8(0xE9, 'c', 5),
	new Register8(0xEA, 'd', 5),
	new Register8(0xEB, 'e', 5),
	new Register8(0xEC, 'h', 5),
	new Register8(0xED, 'l', 5),
	new Register8(0xEF, 'a', 5),

	// BIT 6, r8
	new Register8(0xF0, 'b', 6),
	new Register8(0xF1, 'c', 6),
	new Register8(0xF2, 'd', 6),
	new Register8(0xF3, 'e', 6),
	new Register8(0xF4, 'h', 6),
	new Register8(0xF5, 'l', 6),
	new Register8(0xF7, 'a', 6),

	// BIT 7, r8
	new Register8(0xF8, 'b', 7),
	new Register8(0xF9, 'c', 7),
	new Register8(0xFA, 'd', 7),
	new Register8(0xFB, 'e', 7),
	new Register8(0xFC, 'h', 7),
	new Register8(0xFD, 'l', 7),
	new Register8(0xFF, 'a', 7),
];
