import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../RegisterFlag';
import {extendedInstructions} from '../../../index';

describe('RRC (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('RRC (HL)', () => {
		const instruction = extendedInstructions.get(0x0E);
		registers.hl = 0xC000;

		hardware.memory.write(registers.hl, 0b0001);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0b10000000);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(3);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0b01000000);
		expect(registers.flags).toBe(0);
	});
});
