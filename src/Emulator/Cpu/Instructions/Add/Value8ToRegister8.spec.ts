import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../RegisterFlag';
import {instructions} from '../index';

describe('ADD r8, n8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('ADD A, n8', () => {
		const instruction = instructions.get(0xC6);

		registers.programCounter = 0xC000;

		registers.a = 1;
		hardware.memory.write(registers.programCounter, 1);
		registers.flags = RegisterFlag.SUBTRACT;

		instruction.execute(hardware);

		expect(registers.a).toBe(2);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0xC001);
		expect(hardware.cpu.clock.total).toBe(2);

		registers.a = 15;
		hardware.memory.write(registers.programCounter, 15);

		instruction.execute(hardware);

		expect(registers.a).toBe(30);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		registers.a = 128;
		hardware.memory.write(registers.programCounter, 128);

		instruction.execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO | RegisterFlag.CARRY);

		registers.a = 130;
		hardware.memory.write(registers.programCounter, 130);

		instruction.execute(hardware);

		expect(registers.a).toBe(4);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
	});
});
