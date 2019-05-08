import {InstructionSet} from '../InstructionSet';
import {addInstructions} from './Add';
import {bitshiftInstructions} from './BitShift';
import {decrementInstructions} from './Decrement';
import {incrementInstructions} from './Increment';
import {loadInstructions} from './Load';
import {Noop} from './Misc/Noop';

export const instructions = new InstructionSet([
	new Noop(),
	...addInstructions,
	...bitshiftInstructions,
	...decrementInstructions,
	...incrementInstructions,
	...loadInstructions,
]);
