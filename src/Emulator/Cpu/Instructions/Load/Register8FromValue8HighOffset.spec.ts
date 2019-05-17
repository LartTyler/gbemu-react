import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LDH r8, (n8)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LDH A, (n8)', () => {
		registers.programCounter = 0xC000;
		hardware.memory.write(registers.programCounter, 8);
		hardware.memory.write(0xFF08, 5);

		instructions.get(0xF0).execute(hardware);

		expect(registers.a).toBe(5);

		expect(registers.programCounter).toBe(0xC001);
		expect(hardware.cpu.clock).toBe(3);
	});
});
