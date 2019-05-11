import {toHex} from '../../Utility/number';
import {extendedInstructions, instructions} from './index';

declare global {
	namespace jest {
		interface Matchers<R> {
			toContainOpcodes(expected: number[]): R;
		}
	}
}

describe('Instructions', () => {
	expect.extend({
		toContainOpcodes(actual: number[], expected: number[]) {
			const missing: number[] = [];

			for (const code of expected) {
				if (actual.indexOf(code) === -1)
					missing.push(code);
			}

			if (missing.length) {
				return {
					message: () => {
						let message = `expected input to contain ${toHex(missing[0])}`;

						if (missing.length > 1)
							message += ` (and ${missing.length - 1} other${missing.length > 2 ? 's' : ''})`;

						return message;
					},
					pass: false,
				};
			}

			return {
				message: () => 'passed',
				pass: true,
			};
		},
	});

	test('All primary instructions are implemented', () => {
		const implemented = instructions.all().map(instruction => instruction.code);

		const skipped = [0xD3, 0xDB, 0xE3, 0xE4, 0xEB, 0xEC, 0xED, 0xF4, 0xFC, 0xFD];
		const opcodes = (new Array(255))
			.fill(0)
			.map((_, index) => index)
			.filter(code => skipped.indexOf(code) === -1);

		expect(implemented).toContainOpcodes(opcodes);
	});

	test('All extended instructions are implemented', () => {
		const implemented = extendedInstructions.all().map(instruction => instruction.code);
		const opcodes = (new Array(255)).fill(0).map((_, index) => index);

		expect(implemented).toContainOpcodes(opcodes);
	});
});
