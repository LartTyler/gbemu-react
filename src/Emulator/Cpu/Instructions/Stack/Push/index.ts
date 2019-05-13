import {AccumulatorAndFlags} from './AccumulatorAndFlags';
import {Register16} from './Register16';

export const pushInstructions = [
	// PUSH r16
	new Register16(0xC5, 'bc'),
	new Register16(0xD5, 'de'),
	new Register16(0xE5, 'hl'),

	// PUSH AF
	new AccumulatorAndFlags(/* 0xF5 */),
];
