import {InstructionSet} from '../InstructionSet';
import {bitshiftInstructions} from './BitShift';
import {decrementInstructions} from './Decrement';
import {incrementInstructions} from './Increment';
import {loadInstructions} from './Load';
import {Noop} from './Misc/Noop';

export const instructions = new InstructionSet([
	new Noop(),
	...bitshiftInstructions,
	...decrementInstructions,
	...incrementInstructions,
	...loadInstructions,
]);
