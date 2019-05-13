import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('NOP', () => {
	const hardware = new HardwareBus();

	test('NOP', () => {
		instructions.get(0x00).execute(hardware);

		expect(hardware.cpu.registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);
	});
});
