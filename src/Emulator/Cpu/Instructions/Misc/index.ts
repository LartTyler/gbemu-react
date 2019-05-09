import {Noop} from './Noop';
import {Stop} from './Stop';

export const miscInstructions = [
	// NOP
	new Noop(),

	// STOP
	new Stop(),
];
