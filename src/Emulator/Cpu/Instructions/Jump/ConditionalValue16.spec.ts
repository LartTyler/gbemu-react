import {HardwareBus} from '../../../Hardware/HardwareBus';
import {isRegisterFlagUnsetTest, RegisterFlagTest, getTestedRegisterValue} from '../../RegisterFlag';
import {instructions} from '../index';

describe('JP cc, (n16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();

		registers.programCounter = 0xC000;
		hardware.memory.writeWord(0xC002, 0xC100);
	});

	const runner = (code: number, test: RegisterFlagTest) => {
		const instruction = instructions.get(code);
		const flagValue = getTestedRegisterValue(test);

		if (isRegisterFlagUnsetTest(test))
			registers.flags = flagValue;
		else
			registers.flags = ~flagValue;

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC002);
		expect(hardware.cpu.clock).toBe(3);

		registers.flags = ~registers.flags;

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC100);
		expect(hardware.cpu.clock).toBe(7);
	};

	test('JP NZ, (r16)', () => runner(0xC2, 'NZ'));
	test('JP Z, (r16)', () => runner(0xCA, 'Z'));
	test('JP NC, (r16)', () => runner(0xD2, 'NC'));
	test('JP C, (r16)', () => runner(0xDA, 'C'));
});
