import {extendedShiftInstructions} from './Shift';
import {swapInstructions} from './Swap';

export const extendedBitwiseInstructions = [
	...extendedShiftInstructions,
	...swapInstructions,
];
