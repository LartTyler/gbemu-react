import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LDH (n8), r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LDH (n8), A', () => {
		const instruction = instructions.get(0xE0);
		registers.programCounter = 0xC000;

		registers.a = 5;
		hardware.memory.write(registers.programCounter, 8);

		instruction.execute(hardware);

		expect(hardware.memory.read(0xFF08)).toBe(5);

		expect(registers.programCounter).toBe(0xC001);
		expect(hardware.cpu.clock.total).toBe(3);
	});
});
