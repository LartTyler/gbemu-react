import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../RegisterFlag';
import {instructions} from '../index';

describe('CP r8, n8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('CP A, n8', () => {
		const instruction = instructions.get(0xFE);
		registers.programCounter = 0xC000;

		registers.a = 5;
		hardware.memory.write(registers.programCounter, 1);

		instruction.execute(hardware);

		expect(registers.a).toBe(5);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT);

		expect(registers.programCounter).toBe(0xC001);
		expect(hardware.cpu.clock.total).toBe(2);

		registers.a = 16;
		hardware.memory.write(registers.programCounter, 1);

		instruction.execute(hardware);

		expect(registers.a).toBe(16);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.HALF_CARRY);

		registers.a = 1;
		hardware.memory.write(registers.programCounter, 5);

		instruction.execute(hardware);

		expect(registers.a).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);
	});
});
