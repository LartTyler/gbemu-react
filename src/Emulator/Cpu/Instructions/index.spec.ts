import {toHex} from '../../Utility/number';
import {instructions} from './index';

declare global {
	namespace jest {
		interface Matchers<R> {
			toContainOpcodes(expected: number[]): R;
		}
	}
}

describe('Primary instructions', () => {
	const primarySkipped = [0xD3, 0xDB, 0xE3, 0xE4, 0xEB, 0xEC, 0xED, 0xF4, 0xFC, 0xFD];
	const primaryOpcodes = (new Array(255))
		.fill(0)
		.map((_, index) => index)
		.filter(code => primarySkipped.indexOf(code) === -1);

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

	test('Correct instruction count', () => {
		const implemented = instructions.all().map(instruction => instruction.code);

		expect(implemented).toContainOpcodes(primaryOpcodes);
	});
});
