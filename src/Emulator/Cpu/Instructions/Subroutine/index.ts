import {RegisterFlag} from '../../RegisterFlag';
import {Call} from './Call';
import {ConditionalReturn} from './ConditionalReturn';
import {Return} from './Return';

export const subroutineInstructions = [
	// CALL
	new Call(/* 0xCD */),

	// RET
	new Return(/* 0xC9 */),

	// RET cc
	new ConditionalReturn(0xC0, RegisterFlag.ZERO, false),  // RET NZ
	new ConditionalReturn(0xC8, RegisterFlag.ZERO, true),   // RET Z
	new ConditionalReturn(0xD0, RegisterFlag.CARRY, false), // RET NC
	new ConditionalReturn(0xD8, RegisterFlag.CARRY, true),  // RET C
];
