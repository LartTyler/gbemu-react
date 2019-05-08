import {RegisterALeft} from './RegisterALeft';
import {RegisterALeftCarry} from './RegisterALeftCarry';

export const bitshiftInstructions = [
	// RLCA
	new RegisterALeft(0x07),

	// RLA
	new RegisterALeftCarry(0x17),
];
