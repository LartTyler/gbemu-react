import {andInstructions} from './And';
import {shiftInstructions} from './Shift';

export const bitwiseInstructions = [
	...andInstructions,
	...shiftInstructions,
];
