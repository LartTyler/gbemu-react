import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('CP r8, (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('CP A, (HL)', () => {
		const instruction = instructions.get(0xBE);
		registers.hl = 0xC000;

		registers.a = 5;
		hardware.memory.write(registers.hl, 1);

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(1);
		expect(hardware.cpu.clock).toBe(2);

		expect(registers.a).toBe(5);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT);

		registers.a = 16;
		hardware.memory.write(registers.hl, 1);

		instruction.execute(hardware);

		expect(registers.a).toBe(16);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.HALF_CARRY);

		registers.a = 1;
		hardware.memory.write(registers.hl, 5);

		instruction.execute(hardware);

		expect(registers.a).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);
	});
});
