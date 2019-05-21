import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../RegisterFlag';
import {extendedInstructions} from '../../../index';

describe('SWAP (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('SWAP (HL)', () => {
		const instruction = extendedInstructions.get(0x36);
		registers.hl = 0xC000;

		hardware.memory.write(registers.hl, 0b1100_1011);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0b1011_1100);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(3);

		hardware.memory.write(registers.hl, 0);

		instruction.execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});
});
