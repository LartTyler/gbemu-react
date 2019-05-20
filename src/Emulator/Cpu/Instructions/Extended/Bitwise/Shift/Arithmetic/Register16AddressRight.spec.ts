import {HardwareBus} from '../../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../../RegisterFlag';
import {extendedInstructions} from '../../../../index';

describe('SRA (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('SRA (HL)', () => {
		const instruction = extendedInstructions.get(0x2E);
		registers.hl = 0xC000;

		hardware.memory.write(registers.hl, 0);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(3);

		hardware.memory.write(registers.hl, 0b0110);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0b0011);
		expect(registers.flags).toBe(0);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0b0001);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);

		hardware.memory.write(registers.hl, 0b1000_1010);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0b1100_0101);
		expect(registers.flags).toBe(0);
	});
});
