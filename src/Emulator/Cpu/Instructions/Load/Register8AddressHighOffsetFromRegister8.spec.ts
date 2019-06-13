import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LDH (r8), r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LDH (C), A', () => {
		const instruction = instructions.get(0xE2);

		registers.a = 5;
		registers.c = 8;

		instruction.execute(hardware);

		expect(hardware.memory.read(0xFF08)).toBe(5);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(2);
	});
});
