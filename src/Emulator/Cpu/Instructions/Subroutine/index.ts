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
	new ConditionalReturn(0xC0, 'NZ'),
	new ConditionalReturn(0xC8, 'Z'),
	new ConditionalReturn(0xD0, 'NC'),
	new ConditionalReturn(0xD8, 'C'),
];
