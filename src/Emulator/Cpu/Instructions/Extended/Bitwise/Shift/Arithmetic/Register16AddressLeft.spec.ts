import {HardwareBus} from '../../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../../RegisterFlag';
import {extendedInstructions} from '../../../../index';

describe('SLA (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('SLA (HL)', () => {
		const instruction = extendedInstructions.get(0x26);
		registers.hl = 0xC000;

		hardware.memory.write(registers.hl, 0);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(3);

		hardware.memory.write(registers.hl, 0b0001);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0b0010);
		expect(registers.flags).toBe(0);

		hardware.memory.write(registers.hl, 0b1100_0000);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0b1000_0000);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);
	});
});
