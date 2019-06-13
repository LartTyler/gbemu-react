import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../RegisterFlag';
import {instructions} from '../../index';

describe('PUSH AF', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('PUSH AF', () => {
		registers.stackPointer = 0xFFFE;

		registers.a = 5;
		registers.flags = RegisterFlag.ZERO | RegisterFlag.SUBTRACT;

		instructions.get(0xF5).execute(hardware);

		expect(registers.stackPointer).toBe(0xFFFC);
		expect(hardware.memory.read(registers.stackPointer)).toBe(RegisterFlag.ZERO | RegisterFlag.SUBTRACT);
		expect(hardware.memory.read(registers.stackPointer + 1)).toBe(5);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(4);
	});
});
