import {RegisterALeft} from './RegisterALeft';
import {RegisterALeftCarry} from './RegisterALeftCarry';
import {RegisterARight} from './RegisterARight';
import {RegisterARightCarry} from './RegisterARightCarry';

export const shiftInstructions = [
	// RLCA
	new RegisterALeft(),

	// RLA
	new RegisterALeftCarry(),

	// RRCA
	new RegisterARight(),

	// RRA
	new RegisterARightCarry(),
];
