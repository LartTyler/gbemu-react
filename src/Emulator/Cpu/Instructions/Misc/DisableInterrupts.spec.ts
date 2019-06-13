import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('DI', () => {
	const hardware = new HardwareBus();

	test('DI', () => {
		instructions.get(0xF3).execute(hardware);

		expect(hardware.memory.interrupts.enabled).toBe(false);

		expect(hardware.cpu.registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);
	});
});
