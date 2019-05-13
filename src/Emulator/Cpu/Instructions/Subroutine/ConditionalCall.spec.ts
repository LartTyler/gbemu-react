import {HardwareBus} from '../../../Hardware/HardwareBus';
import {getTestedRegisterValue, isRegisterFlagUnsetTest, RegisterFlagTest} from '../../RegisterFlag';
import {instructions} from '../index';

describe('CALL cc, n16', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();

		registers.programCounter = 0xC000;
		registers.stackPointer = 0xFFFE;

		hardware.memory.writeWord(0xC002, 0xC100);
	});

	const runner = (code: number, test: RegisterFlagTest) => {
		const instruction = instructions.get(code);

		if (isRegisterFlagUnsetTest(test))
			registers.flags = getTestedRegisterValue(test);
		else
			registers.flags = ~getTestedRegisterValue(test);

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC002);
		expect(registers.stackPointer).toBe(0xFFFE);
		expect(hardware.cpu.clock).toBe(3);

		registers.flags = ~registers.flags;

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC100);
		expect(registers.stackPointer).toBe(0xFFFC);
		expect(hardware.memory.readWord(registers.stackPointer)).toBe(0xC004);
		expect(hardware.cpu.clock).toBe(9);
	};

	test('CALL NZ, n16', () => runner(0xC4, 'NZ'));
	test('CALL Z, n16', () => runner(0xCC, 'Z'));
	test('CALL NC, n16', () => runner(0xD4, 'NC'));
	test('CALL C, n16', () => runner(0xDC, 'C'));
});
