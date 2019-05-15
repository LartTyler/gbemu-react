import {InstructionSet} from '../InstructionSet';
import {addInstructions} from './Add';
import {bitwiseInstructions} from './Bitwise';
import {decrementInstructions} from './Decrement';
import {extendedBitwiseInstructions} from './Extended/Bitwise';
import {incrementInstructions} from './Increment';
import {jumpInstructions} from './Jump';
import {loadInstructions} from './Load';
import {miscInstructions} from './Misc';
import {stackInstructions} from './Stack';
import {subroutineInstructions} from './Subroutine';
import {subtractInstructions} from './Subtract';

export const instructions = new InstructionSet([
	...miscInstructions,
	...addInstructions,
	...subtractInstructions,
	...bitwiseInstructions,
	...decrementInstructions,
	...incrementInstructions,
	...jumpInstructions,
	...loadInstructions,
	...stackInstructions,
	...subroutineInstructions,
]);

export const extendedInstructions = new InstructionSet([
	...extendedBitwiseInstructions,
]);
