import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LD (r16), n8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LD (HL), n8', () => {
		registers.programCounter = 0xC000;
		registers.hl = 0xC010;
		hardware.memory.write(registers.programCounter, 50);

		instructions.get(0x36).execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(50);

		expect(registers.programCounter).toBe(0xC002);
		expect(hardware.cpu.clock).toBe(3);
	});
});
