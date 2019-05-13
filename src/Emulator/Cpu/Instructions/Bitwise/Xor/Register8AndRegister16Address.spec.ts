import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../RegisterFlag';
import {instructions} from '../../index';

describe('XOR r8, (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('XOR A, (HL)', () => {
		const instruction = instructions.get(0xAE);
		registers.hl = 0xC000;

		registers.a = 0b1001;
		hardware.memory.write(registers.hl, 0b0101);

		instruction.execute(hardware);

		expect(registers.a).toBe(0b1100);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(2);

		registers.a = 0b1101;
		hardware.memory.write(registers.hl, 0b1101);

		instruction.execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});
});
