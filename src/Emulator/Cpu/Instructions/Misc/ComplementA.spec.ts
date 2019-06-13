import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../RegisterFlag';
import {instructions} from '../index';

describe('CPL', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('CPL', () => {
		registers.a = 0b00101101;

		instructions.get(0x2F).execute(hardware);

		expect(registers.a).toBe(0b11010010);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.HALF_CARRY);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);
	});
});
