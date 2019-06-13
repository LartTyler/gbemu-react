import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('HALT', () => {
	const hardware = new HardwareBus();

	test('HALT', () => {
		instructions.get(0x76).execute(hardware);

		expect(hardware.cpu.registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(0);
	});
});
