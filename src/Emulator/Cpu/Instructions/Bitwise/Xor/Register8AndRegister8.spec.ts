import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../RegisterFlag';
import {CpuRegister8} from '../../../Registers';
import {instructions} from '../../index';

describe('XOR r8, r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8, other: CpuRegister8) => {
		const instruction = instructions.get(code);

		registers[target] = 0b1001;
		registers[other] = 0b0101;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b1100);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);

		registers[target] = 0b1101;
		registers[other] = 0b1101;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	};

	test('XOR A, B', () => runner(0xA8, 'a', 'b'));
	test('XOR A, C', () => runner(0xA9, 'a', 'c'));
	test('XOR A, D', () => runner(0xAA, 'a', 'd'));
	test('XOR A, E', () => runner(0xAB, 'a', 'e'));
	test('XOR A, H', () => runner(0xAC, 'a', 'h'));
	test('XOR A, L', () => runner(0xAD, 'a', 'l'));
	test('XOR A, A', () => {
		registers.a = 0b1001;

		instructions.get(0xAF).execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);
	});
});
