import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LD (PC), SP', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LD (PC), SP', () => {
		const instruction = instructions.get(0x08);

		registers.stackPointer = 500;
		registers.programCounter = 0xC000;
		hardware.memory.writeWord(registers.programCounter, 0xC100);

		instruction.execute(hardware);

		expect(hardware.memory.readWord(0xC000)).toBe(500);

		expect(hardware.cpu.clock.total).toBe(5);
		expect(registers.programCounter).toBe(0xC002);
	});
});
