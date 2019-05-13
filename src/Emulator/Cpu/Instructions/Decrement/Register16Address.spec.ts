import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../RegisterFlag';
import {instructions} from '../index';

describe('DEC (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('DEC (HL)', () => {
		const instruction = instructions.get(0x35);

		registers.hl = 0xC000;
		hardware.memory.write(registers.hl, 5);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(4);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(3);

		hardware.memory.write(registers.hl, 1);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.ZERO);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(255);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.HALF_CARRY);
	});
});
