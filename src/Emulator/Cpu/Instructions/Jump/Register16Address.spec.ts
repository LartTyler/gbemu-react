import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('JP (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('JP (HL)', () => {
		registers.hl = 0xC000;
		hardware.memory.writeWord(registers.hl, 0xC100);

		instructions.get(0xE9).execute(hardware);

		expect(registers.programCounter).toBe(0xC100);
		expect(hardware.cpu.clock).toBe(1);
	});
});
