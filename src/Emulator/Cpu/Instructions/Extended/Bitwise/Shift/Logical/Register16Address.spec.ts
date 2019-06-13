import {HardwareBus} from '../../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../../RegisterFlag';
import {extendedInstructions} from '../../../../index';

describe('SRL (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('SRL (HL)', () => {
		const instruction = extendedInstructions.get(0x3E);
		registers.hl = 0xC000;

		hardware.memory.write(registers.hl, 0b1000_0110);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0b0100_0011);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(3);

		hardware.memory.write(registers.hl, 0b0011);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0b0001);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});
});
