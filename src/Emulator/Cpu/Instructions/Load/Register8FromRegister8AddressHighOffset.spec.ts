import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LDH r8, (r8)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LDH A, (C)', () => {
		registers.c = 8;
		hardware.memory.write(0xFF08, 5);

		instructions.get(0xF2).execute(hardware);

		expect(registers.a).toBe(5);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(2);
	});
});
