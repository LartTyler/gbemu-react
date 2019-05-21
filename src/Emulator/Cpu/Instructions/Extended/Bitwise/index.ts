import {extendedShiftInstructions} from './Shift';
import {swapInstructions} from './Swap';
import {bitTestInstructions} from './Test';

export const extendedBitwiseInstructions = [
	...extendedShiftInstructions,
	...swapInstructions,
	...bitTestInstructions,
];
