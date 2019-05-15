import {ComplementA} from './ComplementA';
import {ComplementCarryFlag} from './ComplementCarryFlag';
import {DecimalAdjustA} from './DecimalAdjustA';
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
];
