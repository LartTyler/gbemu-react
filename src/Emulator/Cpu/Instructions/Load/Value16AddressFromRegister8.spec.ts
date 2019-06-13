import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LD (n16), r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LD (n16), A', () => {
		registers.a = 5;
		registers.programCounter = 0xC000;
		hardware.memory.writeWord(registers.programCounter, 0xC100);

		instructions.get(0xEA).execute(hardware);

		expect(hardware.memory.read(0xC100)).toBe(5);

		expect(registers.programCounter).toBe(0xC002);
		expect(hardware.cpu.clock.total).toBe(4);
	});
});
