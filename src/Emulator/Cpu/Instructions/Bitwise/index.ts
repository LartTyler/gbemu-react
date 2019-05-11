import {andInstructions} from './And';
import {shiftInstructions} from './Shift';
import {xorInstructions} from './Xor';

export const bitwiseInstructions = [
	...andInstructions,
	...xorInstructions,
	...shiftInstructions,
];
