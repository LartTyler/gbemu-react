import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../RegisterFlag';
import {instructions} from '../../index';

describe('AND r8, n8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('AND A, n8', () => {
		const instruction = instructions.get(0xE6);
		registers.programCounter = 0xC000;

		registers.a = 0b1100;
		hardware.memory.write(registers.programCounter, 0b0100);

		instruction.execute(hardware);

		expect(registers.a).toBe(0b0100);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		expect(registers.programCounter).toBe(0xC001);
		expect(hardware.cpu.clock).toBe(2);

		registers.a = 0b1101;
		hardware.memory.write(registers.programCounter, 0b000);

		instruction.execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY | RegisterFlag.ZERO);
	});
});
