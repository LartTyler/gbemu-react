import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('STOP', () => {
	const hardware = new HardwareBus();

	test('STOP', () => {
		instructions.get(0x10).execute(hardware);

		expect(hardware.cpu.clock.total).toBe(1);
		expect(hardware.cpu.registers.programCounter).toBe(1);
	});
});
