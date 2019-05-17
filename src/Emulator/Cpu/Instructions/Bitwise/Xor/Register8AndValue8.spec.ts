import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../RegisterFlag';
import {instructions} from '../../index';

describe('XOR r8, n8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('XOR A, n8', () => {
		const instruction = instructions.get(0xEE);
		registers.programCounter = 0xC000;

		registers.a = 0b1001;
		hardware.memory.write(registers.programCounter, 0b1100);

		instruction.execute(hardware);

		expect(registers.a).toBe(0b0101);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0xC001);
		expect(hardware.cpu.clock).toBe(2);

		hardware.memory.write(registers.programCounter, 0b0101);

		instruction.execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});
});
