import {HardwareBus} from '../../../Hardware/HardwareBus';
import {toTwosComplement} from '../../../Utility/number';
import {getTestedRegisterValue, isRegisterFlagUnsetTest, RegisterFlagTest} from '../../RegisterFlag';
import {instructions} from '../index';

describe('JR cc, s8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();
		hardware.cpu.registers.programCounter = 0xC000;

		hardware.memory.write(0xC001, 7);
		hardware.memory.write(0xC009, toTwosComplement(-8));
	});

	const runner = (code: number, test: RegisterFlagTest) => {
		const instruction = instructions.get(code);

		if (isRegisterFlagUnsetTest(test))
			registers.flags = getTestedRegisterValue(test);
		else
			registers.flags = ~getTestedRegisterValue(test);

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC001);
		expect(hardware.cpu.clock).toBe(2);

		registers.flags = ~registers.flags;

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC009);
		expect(hardware.cpu.clock).toBe(5);

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC002);
		expect(hardware.cpu.clock).toBe(8);
	};

	test('JR NZ, s8', () => runner(0x20, 'NZ'));
	test('JR Z, s8', () => runner(0x28, 'Z'));
	test('JR NC, s8', () => runner(0x30, 'NC'));
	test('JR C, s8', () => runner(0x38, 'C'));
});
