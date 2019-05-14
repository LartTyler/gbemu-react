import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('RETI', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('RETI', () => {
		registers.programCounter = 0xF000;
		registers.stackPointer = 0xFFFC;
		hardware.memory.writeWord(registers.stackPointer, 0xC000);
		hardware.memory.interrupts.enabled = false;

		instructions.get(0xD9).execute(hardware);

		expect(registers.programCounter).toBe(0xC000);
		expect(registers.stackPointer).toBe(0xFFFE);
		expect(hardware.memory.interrupts.enabled).toBe(true);
		expect(hardware.cpu.clock).toBe(4);
	});
});
