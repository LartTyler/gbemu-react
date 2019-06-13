import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../RegisterFlag';
import {instructions} from '../../index';

describe('AND r8, (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('AND A, (HL)', () => {
		const instruction = instructions.get(0xA6);
		registers.hl = 0xC000;

		registers.a = 0b1100;
		hardware.memory.write(registers.hl, 0b0100);

		instruction.execute(hardware);

		expect(registers.a).toBe(0b0100);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(2);

		registers.a = 0b1101;
		hardware.memory.write(registers.hl, 0b000);

		instruction.execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY | RegisterFlag.ZERO);
	});
});
