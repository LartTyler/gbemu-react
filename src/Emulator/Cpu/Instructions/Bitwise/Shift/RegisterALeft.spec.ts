import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../RegisterFlag';
import {instructions} from '../../index';

describe('RLCA', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('RLCA', () => {
		const instruction = instructions.get(0x07);

		registers.a = 0b0001;

		instruction.execute(hardware);

		expect(registers.a).toBe(0b0010);
		expect(registers.flags).toBe(0);

		expect(hardware.cpu.clock).toBe(1);
		expect(registers.programCounter).toBe(0);

		registers.a = 0b10000000;

		instruction.execute(hardware);

		expect(registers.a).toBe(0b0001);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
	});
});
