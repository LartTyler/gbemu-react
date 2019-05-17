import {stackAddInstructions} from './Add';
import {popInstructions} from './Pop';
import {pushInstructions} from './Push';

export const stackInstructions = [
	...pushInstructions,
	...popInstructions,
	...stackAddInstructions,
];
