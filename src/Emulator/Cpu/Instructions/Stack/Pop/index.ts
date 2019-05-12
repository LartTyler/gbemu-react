import {Register16} from './Register16';

export const popInstructions = [
	// POP r16
	new Register16(0xC1, 'bc'),
	new Register16(0xD1, 'de'),
	new Register16(0xE1, 'hl'),
];
