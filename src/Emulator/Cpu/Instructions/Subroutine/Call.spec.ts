import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('CALL n16', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('CALL n16', () => {
		registers.programCounter = 0xC000;
		registers.stackPointer = 0xFFFE;
		hardware.memory.writeWord(registers.programCounter, 0xC100);

		instructions.get(0xCD).execute(hardware);

		expect(registers.programCounter).toBe(0xC100);
		expect(registers.stackPointer).toBe(0xFFFC);
		expect(hardware.memory.readWord(registers.stackPointer)).toBe(0xC002);

		expect(hardware.cpu.clock.total).toBe(6);
	});
});
