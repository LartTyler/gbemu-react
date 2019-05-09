import {InstructionSet} from '../InstructionSet';
import {addInstructions} from './Add';
import {bitshiftInstructions} from './BitShift';
import {decrementInstructions} from './Decrement';
import {incrementInstructions} from './Increment';
import {jumpInstructions} from './Jump';
import {loadInstructions} from './Load';
import {miscInstructions} from './Misc';

export const instructions = new InstructionSet([
	...miscInstructions,
	...addInstructions,
	...bitshiftInstructions,
	...decrementInstructions,
	...incrementInstructions,
	...jumpInstructions,
	...loadInstructions,
]);
