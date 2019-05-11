import {andInstructions} from './And';
import {orInstructions} from './Or';
import {shiftInstructions} from './Shift';
import {xorInstructions} from './Xor';

export const bitwiseInstructions = [
	...andInstructions,
	...orInstructions,
	...xorInstructions,
	...shiftInstructions,
];
