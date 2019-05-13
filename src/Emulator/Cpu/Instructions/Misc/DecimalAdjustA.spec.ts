import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('DAA', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('DAA', () => {
		const instruction = instructions.get(0x27);

		registers.a = 5;

		instruction.execute(hardware);

		expect(registers.a).toBe(5);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);

		registers.a = 0;

		instruction.execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		registers.a = 10;

		instruction.execute(hardware);

		expect(registers.a).toBe(0x10);
		expect(registers.flags).toBe(0);

		registers.a = 0xFF;

		instruction.execute(hardware);

		expect(registers.a).toBe(0x65);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		registers.a = 10;
		registers.flags = RegisterFlag.SUBTRACT | RegisterFlag.HALF_CARRY;

		instruction.execute(hardware);

		expect(registers.a).toBe(4);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT);

		registers.a = 0xFF;
		registers.flags = RegisterFlag.SUBTRACT | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY;

		instruction.execute(hardware);

		expect(registers.a).toBe(0x99);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.CARRY);
	});
});
