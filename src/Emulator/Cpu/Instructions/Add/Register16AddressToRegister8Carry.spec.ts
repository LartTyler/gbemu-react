import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('ADC r8, (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('ADC A, (HL)', () => {
		const instruction = instructions.get(0x8E);

		registers.hl = 0xC000;

		registers.a = 1;
		hardware.memory.write(registers.hl, 1);
		registers.flags = RegisterFlag.SUBTRACT;

		instruction.execute(hardware);

		expect(registers.a).toBe(2);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(2);

		registers.a = 15;
		hardware.memory.write(registers.hl, 15);

		instruction.execute(hardware);

		expect(registers.a).toBe(30);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		registers.a = 128;
		hardware.memory.write(registers.hl, 128);

		instruction.execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO | RegisterFlag.CARRY);

		registers.a = 130;
		hardware.memory.write(registers.hl, 130);

		instruction.execute(hardware);

		expect(registers.a).toBe(5);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
	});
});
