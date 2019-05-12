import {RegisterFlag} from '../../Registers';
import {ConditionalReturn} from './ConditionalReturn';

export const subroutineInstructions = [
	// RET cc
	new ConditionalReturn(0xC0, RegisterFlag.ZERO, false),  // RET NZ
	new ConditionalReturn(0xC8, RegisterFlag.ZERO, true),   // RET Z
	new ConditionalReturn(0xD0, RegisterFlag.CARRY, false), // RET NC
	new ConditionalReturn(0xD8, RegisterFlag.CARRY, true),  // RET C
];
