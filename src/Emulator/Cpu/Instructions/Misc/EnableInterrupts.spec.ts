import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('EI', () => {
	const hardware = new HardwareBus();

	test('EI', () => {
		hardware.memory.interrupts.enabled = false;

		instructions.get(0xFB).execute(hardware);

		expect(hardware.memory.interrupts.enabled).toBe(true);

		expect(hardware.cpu.registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);
	});
});
