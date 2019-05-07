import {instructions} from './index';

describe('Primary instructions', () => {
	test('Correct instruction count', () => {
		expect(instructions.count()).toBe(244);
	});
});
