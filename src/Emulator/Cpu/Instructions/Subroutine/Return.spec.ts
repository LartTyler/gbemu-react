import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('RET', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('RET', () => {
		registers.stackPointer = 0xFFFE;
		registers.programCounter = 0xC100;

		registers.stackPointer -= 2;
		hardware.memory.writeWord(registers.stackPointer, 0xC000);

		instructions.get(0xC9).execute(hardware);

		expect(registers.programCounter).toBe(0xC000);
		expect(registers.stackPointer).toBe(0xFFFE);

		expect(hardware.cpu.clock).toBe(4);
	});
});
