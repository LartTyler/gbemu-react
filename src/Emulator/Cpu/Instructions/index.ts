import {InstructionSet} from '../InstructionSet';
import {addInstructions} from './Add';
import {bitshiftInstructions} from './BitShift';
import {decrementInstructions} from './Decrement';
import {incrementInstructions} from './Increment';
import {jumpInstructions} from './Jump';
import {loadInstructions} from './Load';
import {miscInstructions} from './Misc';
import {subtractInstructions} from './Subtract';

export const instructions = new InstructionSet([
	...miscInstructions,
	...addInstructions,
	...subtractInstructions,
	...bitshiftInstructions,
	...decrementInstructions,
	...incrementInstructions,
	...jumpInstructions,
	...loadInstructions,
]);

export const extendedInstructions = new InstructionSet([]);
