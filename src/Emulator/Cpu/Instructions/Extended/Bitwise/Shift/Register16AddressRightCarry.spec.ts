import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../RegisterFlag';
import {extendedInstructions} from '../../../index';

describe('RR (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('RR (HL)', () => {
		const instruction = extendedInstructions.get(0x1E);
		registers.hl = 0xC000;

		hardware.memory.write(registers.hl, 0b0001);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(3);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0b10000000);
		expect(registers.flags).toBe(0);

		hardware.memory.write(registers.hl, 0);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});
});
