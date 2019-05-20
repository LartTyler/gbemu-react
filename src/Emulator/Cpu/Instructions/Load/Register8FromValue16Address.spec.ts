import {HardwareBus} from '../../../Hardware/HardwareBus';
import {instructions} from '../index';

describe('LD r8, (n16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LD A, (n16)', () => {
		registers.programCounter = 0xC000;
		hardware.memory.writeWord(registers.programCounter, 0xC100);
		hardware.memory.write(0xC100, 5);

		instructions.get(0xFA).execute(hardware);

		expect(registers.a).toBe(5);

		expect(registers.programCounter).toBe(0xC002);
		expect(hardware.cpu.clock).toBe(4);
	});
});
