import {HardwareBus} from '../../../Hardware/HardwareBus';
import {CpuRegister16, RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('ADD r16, 16', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();
	});

	const runner = (code: number, target: CpuRegister16, source: CpuRegister16) => {
		const instruction = instructions.get(code);

		registers[target] = 10;
		registers[source] = 5;

		instruction.execute(hardware);

		expect(registers[target]).toBe(15);
		expect(registers.flags).toBe(0);

		expect(hardware.cpu.clock).toBe(2);
		expect(registers.programCounter).toBe(0);

		registers[target] = 0xFFF;
		registers[source] = 1;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0xFFF + 1);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		registers[target] = 0xF000;
		registers[source] = 0x1000;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		registers[target] = 0xFFFF;
		registers[source] = 1;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);
	};

	test('ADD HL, BC', () => runner(0x09, 'hl', 'bc'));
	test('ADD HL, DE', () => runner(0x19, 'hl', 'de'));
	test('ADD HL, SP', () => runner(0x39, 'hl', 'stackPointer'));

	// ADD HL, HL is a special case, since our normal tests use different values for source and target
	test('ADD HL, HL', () => {
		const instruction = instructions.get(0x29);

		registers.hl = 10;

		instruction.execute(hardware);

		expect(registers.hl).toBe(20);
		expect(registers.flags).toBe(0);

		expect(hardware.cpu.clock).toBe(2);
		expect(registers.programCounter).toBe(0);

		registers.hl = 0xF00;

		instruction.execute(hardware);

		expect(registers.hl).toBe(0xF00 * 2);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		registers.hl = 0xF000;

		instruction.execute(hardware);

		expect(registers.hl).toBe((0xF000 * 2) & 0xFFFF);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		registers.hl = 0xFFFF;

		instruction.execute(hardware);

		expect(registers.hl).toBe((0xFFFF * 2) & 0xFFFF);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY | RegisterFlag.CARRY);
	});
});
