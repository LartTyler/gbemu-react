import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('RRCA', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('RRCA', () => {
		const instruction = instructions.get(0x0F);

		registers.a = 0b0001;

		instruction.execute(hardware);

		expect(registers.a).toBe(0b10000000);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		expect(registers.programCounter).toBe(1);
		expect(hardware.cpu.clock).toBe(1);

		instruction.execute(hardware);

		expect(registers.a).toBe(0b01000000);
		expect(registers.flags).toBe(0);
	});
});
