import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../RegisterFlag';
import {instructions} from '../index';

describe('CCF', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('CCF', () => {
		const instruction = instructions.get(0x3F);

		registers.flags = ~RegisterFlag.CARRY;

		instruction.execute(hardware);

		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);
		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);

		registers.flags = RegisterFlag.CARRY;

		instruction.execute(hardware);

		expect(registers.flags).toBe(0);
	});
});
