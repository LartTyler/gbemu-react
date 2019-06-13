import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../RegisterFlag';
import {CpuRegister8} from '../../../Registers';
import {instructions} from '../../index';

describe('OR r8, r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8, other: CpuRegister8) => {
		const instruction = instructions.get(code);

		registers[target] = 0b1001;
		registers[other] = 0b0101;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b1101);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);

		registers[target] = 0;
		registers[other] = 0;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	};

	test('OR A, B', () => runner(0xB0, 'a', 'b'));
	test('OR A, C', () => runner(0xB1, 'a', 'c'));
	test('OR A, D', () => runner(0xB2, 'a', 'd'));
	test('OR A, E', () => runner(0xB3, 'a', 'e'));
	test('OR A, H', () => runner(0xB4, 'a', 'h'));
	test('OR A, L', () => runner(0xB5, 'a', 'l'));
	test('OR A, A', () => {
		const instruction = instructions.get(0xB7);

		registers.a = 0b1001;

		instruction.execute(hardware);

		expect(registers.a).toBe(0b1001);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);

		registers.a = 0;

		instruction.execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});
});
