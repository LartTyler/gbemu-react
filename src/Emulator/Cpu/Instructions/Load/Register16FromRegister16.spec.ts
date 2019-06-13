import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LD r16, r16', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LD SP, HL', () => {
		registers.hl = 5;

		instructions.get(0xF9).execute(hardware);

		expect(registers.stackPointer).toBe(5);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(2);
	});
});
