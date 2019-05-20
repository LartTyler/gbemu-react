import {ComplementA} from './ComplementA';
import {ComplementCarryFlag} from './ComplementCarryFlag';
import {DecimalAdjustA} from './DecimalAdjustA';
import {DisableInterrupts} from './DisableInterrupts';
import {EnableInterrupts} from './EnableInterrupts';
import {Halt} from './Halt';
import {Noop} from './Noop';
import {Prefix} from './Prefix';
import {SetCarryFlag} from './SetCarryFlag';
import {Stop} from './Stop';

export const miscInstructions = [
	// NOP
	new Noop(),

	// STOP
	new Stop(),

	// HALT
	new Halt(),

	// DAA
	new DecimalAdjustA(),

	// CPL
	new ComplementA(),

	// SCF
	new SetCarryFlag(),

	// CCF
	new ComplementCarryFlag(),

	// PREFIX CB
	new Prefix(),

	// DI
	new DisableInterrupts(/* 0xF3 */),

	// EI
	new EnableInterrupts(/* 0xFB */),
];
