import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('JP n16', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('JP n16', () => {
		registers.programCounter = 0xC000;
		hardware.memory.writeWord(registers.programCounter, 0xC100);

		instructions.get(0xC3).execute(hardware);

		expect(registers.programCounter).toBe(0xC100);
		expect(hardware.cpu.clock).toBe(4);
	});
});
