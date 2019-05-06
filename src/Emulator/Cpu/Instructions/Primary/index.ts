import {InstructionSet} from '../../InstructionSet';
import {loadInstructions} from './Load';
import {NoopInstruction} from './Misc/Noop';

export const instructions = new InstructionSet([
	new NoopInstruction(),
	...loadInstructions,
]);
