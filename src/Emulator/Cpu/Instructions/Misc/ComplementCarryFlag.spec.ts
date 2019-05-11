import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('CCF', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('CCF', () => {
		const instruction = instructions.get(0x3F);

		registers.flags = ~RegisterFlag.CARRY;

		instruction.execute(hardware);

		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);
		expect(registers.programCounter).toBe(1);
		expect(hardware.cpu.clock).toBe(1);

		registers.flags = RegisterFlag.CARRY;

		instruction.execute(hardware);

		expect(registers.flags).toBe(0);
	});
});
