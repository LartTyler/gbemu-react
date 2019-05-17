import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../RegisterFlag';
import {instructions} from '../index';

describe('SBC r8, n8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('SBC A, n8', () => {
		const instruction = instructions.get(0xDE);
		registers.programCounter = 0xC000;

		registers.a = 5;
		hardware.memory.write(registers.programCounter, 1);

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC001);
		expect(hardware.cpu.clock).toBe(2);

		expect(registers.a).toBe(4);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT);

		registers.a = 16;
		hardware.memory.write(registers.programCounter, 1);

		instruction.execute(hardware);

		expect(registers.a).toBe(15);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.HALF_CARRY);

		registers.a = 1;
		hardware.memory.write(registers.programCounter, 5);

		instruction.execute(hardware);

		expect(registers.a).toBe(252);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);

		hardware.memory.write(registers.programCounter, 5);

		instruction.execute(hardware);

		expect(registers.a).toBe(246);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT);
	});
});
