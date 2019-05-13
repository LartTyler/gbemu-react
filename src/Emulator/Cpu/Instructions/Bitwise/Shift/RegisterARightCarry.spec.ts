import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../Registers';
import {instructions} from '../../index';

describe('RRA', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('RRA', () => {
		const instruction = instructions.get(0x1F);

		registers.a = 0b0001;

		instruction.execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);

		instruction.execute(hardware);

		expect(registers.a).toBe(0b10000000);
		expect(registers.flags).toBe(0);
	});
});
