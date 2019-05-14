import {RegisterFlag} from '../../RegisterFlag';
import {Call} from './Call';
import {ConditionalCall} from './ConditionalCall';
import {ConditionalReturn} from './ConditionalReturn';
import {InterruptReturn} from './InterruptReturn';
import {Return} from './Return';

export const subroutineInstructions = [
	// CALL
	new Call(/* 0xCD */),

	// CALL cc, n16
	new ConditionalCall(0xC4, 'NZ'),
	new ConditionalCall(0xCC, 'Z'),
	new ConditionalCall(0xD4, 'NC'),
	new ConditionalCall(0xDC, 'C'),

	// RET
	new Return(/* 0xC9 */),

	// RET cc
	new ConditionalReturn(0xC0, 'NZ'),
	new ConditionalReturn(0xC8, 'Z'),
	new ConditionalReturn(0xD0, 'NC'),
	new ConditionalReturn(0xD8, 'C'),

	// RETI
	new InterruptReturn(/* 0xD9 */),
];
