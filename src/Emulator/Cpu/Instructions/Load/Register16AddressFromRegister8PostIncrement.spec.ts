import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LDI (r16), r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.reset();
	});

	test('LDI (HL), A', () => {
		registers.a = 15;
		registers.hl = 0xC000;

		instructions.get(0x22).execute(hardware);

		expect(hardware.memory.read(0xC000)).toBe(15);
		expect(registers.hl).toBe(0xC001);

		expect(hardware.cpu.clock.total).toBe(2);
		expect(registers.programCounter).toBe(0);
	});
});
