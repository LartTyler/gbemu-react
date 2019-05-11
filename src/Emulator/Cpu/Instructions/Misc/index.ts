import {ComplementA} from './ComplementA';
import {ComplementCarryFlag} from './ComplementCarryFlag';
import {DecimalAdjustA} from './DecimalAdjustA';
import {Noop} from './Noop';
import {SetCarryFlag} from './SetCarryFlag';
import {Stop} from './Stop';

export const miscInstructions = [
	// NOP
	new Noop(),

	// STOP
	new Stop(),

	// DAA
	new DecimalAdjustA(),

	// CPL
	new ComplementA(),

	// SCF
	new SetCarryFlag(),

	// CCF
	new ComplementCarryFlag(),
];
