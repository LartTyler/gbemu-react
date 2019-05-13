import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../RegisterFlag';
import {instructions} from '../index';

describe('RET cc', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.reset();

		registers.programCounter = 0xC100;
		registers.stackPointer = 0xFFFE;

		registers.stackPointer -= 2;
		hardware.memory.writeWord(registers.stackPointer, 0xC000);
	});

	const runner = (code: number, flag: RegisterFlag) => {
		const instruction = instructions.get(code);

		registers.flags = ~flag;

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC100);
		expect(hardware.cpu.clock).toBe(2);

		registers.flags = flag;

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC000);
		expect(registers.stackPointer).toBe(0xFFFE);
		expect(hardware.cpu.clock).toBe(7);
	};

	test('RET NZ', () => runner(0xC0, ~RegisterFlag.ZERO));
	test('RET Z', () => runner(0xC8, RegisterFlag.ZERO));
	test('RET NC', () => runner(0xD0, ~RegisterFlag.CARRY));
	test('RET C', () => runner(0xD8, RegisterFlag.CARRY));
});
