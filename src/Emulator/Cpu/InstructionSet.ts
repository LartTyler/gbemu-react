import {Instruction} from './Instruction';

export class InstructionSet {
	protected instructions: Instruction[];
	protected opcodes: {[key: number]: number} = {};

	public constructor(instructions: Instruction[]) {
		this.instructions = instructions;

		for (let i = 0; i < this.instructions.length; i++)
			this.opcodes[this.instructions[i].code] = i;
	}

	public get(code: number): Instruction {
		const index = this.opcodes[code];

		if (typeof index === 'undefined')
			return null;

		return this.instructions[index];
	}

	public all(): Instruction[] {
		return this.instructions;
	}

	public count(): number {
		return this.all().length;
	}
}
