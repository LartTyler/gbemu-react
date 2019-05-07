import {InstructionSet} from '../InstructionSet';
import {incrementInstructions} from './Increment';
import {loadInstructions} from './Load';
import {Noop} from './Misc/Noop';

export const instructions = new InstructionSet([
	new Noop(),
	...incrementInstructions,
	...loadInstructions,
]);
