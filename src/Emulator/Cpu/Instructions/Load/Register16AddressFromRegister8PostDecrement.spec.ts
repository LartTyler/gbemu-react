import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LDD (r16), r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LDD (HL), A', () => {
		registers.a = 15;
		registers.hl = 0xC000;

		instructions.get(0x32).execute(hardware);

		expect(hardware.memory.read(0xC000)).toBe(15);
		expect(registers.hl).toBe(0xBFFF);

		expect(hardware.cpu.clock).toBe(2);
		expect(registers.programCounter).toBe(1);
	});
});
