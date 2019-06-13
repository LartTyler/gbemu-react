import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LDI r8, (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LDI A, (HL)', () => {
		const instruction = instructions.get(0x2A);

		registers.hl = 0xC000;
		hardware.memory.write(registers.hl, 10);

		instruction.execute(hardware);

		expect(registers.a).toBe(10);
		expect(registers.hl).toBe(0xC001);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(2);
	});
});
