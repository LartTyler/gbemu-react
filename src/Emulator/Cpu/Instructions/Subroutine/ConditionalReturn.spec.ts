import {HardwareBus} from '../../../Hardware/HardwareBus';
import {getTestedRegisterValue, isRegisterFlagUnsetTest, RegisterFlagTest} from '../../RegisterFlag';
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

	const runner = (code: number, test: RegisterFlagTest) => {
		const instruction = instructions.get(code);

		if (isRegisterFlagUnsetTest(test))
			registers.flags = getTestedRegisterValue(test);
		else
			registers.flags = ~getTestedRegisterValue(test);

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC100);
		expect(hardware.cpu.clock.total).toBe(2);

		registers.flags = ~registers.flags;

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC000);
		expect(registers.stackPointer).toBe(0xFFFE);
		expect(hardware.cpu.clock.total).toBe(7);
	};

	test('RET NZ', () => runner(0xC0, 'NZ'));
	test('RET Z', () => runner(0xC8, 'Z'));
	test('RET NC', () => runner(0xD0, 'NC'));
	test('RET C', () => runner(0xD8, 'C'));
});
