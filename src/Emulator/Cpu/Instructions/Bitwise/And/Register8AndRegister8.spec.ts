import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../RegisterFlag';
import {CpuRegister8} from '../../../Registers';
import {instructions} from '../../index';

describe('AND r8, r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8, other: CpuRegister8) => {
		const instruction = instructions.get(code);

		registers[target] = 0b1100;
		registers[other] = 0b0100;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b0100);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);

		registers[target] = 0b1101;
		registers[other] = 0b000;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY | RegisterFlag.ZERO);
	};

	test('AND A, B', () => runner(0xA0, 'a', 'b'));
	test('AND A, C', () => runner(0xA1, 'a', 'c'));
	test('AND A, D', () => runner(0xA2, 'a', 'd'));
	test('AND A, E', () => runner(0xA3, 'a', 'e'));
	test('AND A, H', () => runner(0xA4, 'a', 'h'));
	test('AND A, L', () => runner(0xA5, 'a', 'l'));
	test('AND A, A', () => runner(0xA7, 'a', 'a'));
});
