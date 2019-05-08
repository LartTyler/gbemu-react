import {RegisterALeft} from './RegisterALeft';
import {RegisterALeftCarry} from './RegisterALeftCarry';
import {RegisterARight} from './RegisterARight';
import {RegisterARightCarry} from './RegisterARightCarry';

export const bitshiftInstructions = [
	// RLCA
	new RegisterALeft(0x07),

	// RLA
	new RegisterALeftCarry(0x17),

	// RRCA
	new RegisterARight(0x0F),

	// RRA
	new RegisterARightCarry(0x1F),
];
