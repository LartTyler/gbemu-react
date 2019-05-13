import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('INC (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('INC (HL)', () => {
		const instruction = instructions.get(0x34);

		registers.hl = 0xC000;
		hardware.memory.write(registers.hl, 5);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(6);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(3);

		hardware.memory.write(registers.hl, 15);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(16);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		hardware.memory.write(registers.hl, 255);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY | RegisterFlag.ZERO);
	});
});
