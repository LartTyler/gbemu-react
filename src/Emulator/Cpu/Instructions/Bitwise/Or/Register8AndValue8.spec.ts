import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../RegisterFlag';
import {instructions} from '../../index';

describe('OR r8, n8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('OR A, n8', () => {
		const instruction = instructions.get(0xF6);
		registers.programCounter = 0xC000;

		registers.a = 0b1001;
		hardware.memory.write(registers.programCounter, 0b0101);

		instruction.execute(hardware);

		expect(registers.a).toBe(0b1101);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0xC001);
		expect(hardware.cpu.clock.total).toBe(2);

		registers.a = 0;
		hardware.memory.write(registers.programCounter, 0);

		instruction.execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});
});
