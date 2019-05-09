import {HardwareBus} from '../../../Hardware/HardwareBus';

describe('STOP', () => {
	const hardware = new HardwareBus();

	test('STOP', () => {
		hardware.cpu.stop();

		expect(hardware.cpu.clock).toBe(1);
		expect(hardware.cpu.registers.programCounter).toBe(2);
	});
});
