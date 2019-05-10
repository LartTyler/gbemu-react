import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LDD r8, (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LDD A, (HL)', () => {
		const instruction = instructions.get(0x3A);

		registers.hl = 0xC000;
		hardware.memory.write(registers.hl, 10);

		instruction.execute(hardware);

		expect(registers.a).toBe(10);
		expect(registers.hl).toBe(0xBFFF);

		expect(registers.programCounter).toBe(1);
		expect(hardware.cpu.clock).toBe(2);
	});
});
