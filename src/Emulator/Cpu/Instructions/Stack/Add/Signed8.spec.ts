import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {toTwosComplement} from '../../../../Utility/number';
import {RegisterFlag} from '../../../RegisterFlag';
import {instructions} from '../../index';

describe('ADD SP, s8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('ADD SP, s8', () => {
		const instruction = instructions.get(0xE8);
		registers.programCounter = 0xC000;
		registers.stackPointer = 0xFFFE;

		hardware.memory.write(registers.programCounter, toTwosComplement(-8));

		instruction.execute(hardware);

		expect(registers.stackPointer).toBe(0xFFF6);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0xC001);
		expect(hardware.cpu.clock).toBe(4);

		hardware.memory.write(registers.programCounter, toTwosComplement(-7));

		instruction.execute(hardware);

		expect(registers.stackPointer).toBe(0xFFEF);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		hardware.memory.write(registers.programCounter, toTwosComplement(17));

		instruction.execute(hardware);

		expect(registers.stackPointer).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);
	});
});
