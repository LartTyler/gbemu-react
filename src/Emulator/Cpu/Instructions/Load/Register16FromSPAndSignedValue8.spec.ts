import {HardwareBus} from '../../../Hardware/HardwareBus';
import {toTwosComplement} from '../../../Utility/number';
import {RegisterFlag} from '../../RegisterFlag';
import {instructions} from '../index';

describe('LDHL SP, s8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('LDHL SP, s8', () => {
		const instruction = instructions.get(0xF8);
		registers.stackPointer = 0xFFFC;
		registers.programCounter = 0xC000;

		hardware.memory.write(registers.programCounter, toTwosComplement(2));

		instruction.execute(hardware);

		expect(registers.hl).toBe(0xFFFE);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0xC001);
		expect(hardware.cpu.clock.total).toBe(3);

		registers.stackPointer = 0xFFFE;
		hardware.memory.write(registers.programCounter, toTwosComplement(-8));

		instruction.execute(hardware);

		expect(registers.hl).toBe(0xFFF6);
		expect(registers.flags).toBe(0);

		registers.stackPointer = 0xFFF6;
		hardware.memory.write(registers.programCounter, toTwosComplement(-10));

		instruction.execute(hardware);

		expect(registers.hl).toBe(0xFFEC);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		registers.stackPointer = 0xFFEC;
		hardware.memory.write(registers.programCounter, 20);

		instruction.execute(hardware);

		expect(registers.hl).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);
	});
});
