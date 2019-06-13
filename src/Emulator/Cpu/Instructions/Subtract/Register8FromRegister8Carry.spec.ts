import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../RegisterFlag';
import {CpuRegister8} from '../../Registers';
import {instructions} from '../index';

describe('SBC r8, r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, minuend: CpuRegister8, subtrahend: CpuRegister8) => {
		const instruction = instructions.get(code);

		registers[minuend] = 5;
		registers[subtrahend] = 1;

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);

		expect(registers[minuend]).toBe(4);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT);

		registers[minuend] = 16;
		registers[subtrahend] = 1;

		instruction.execute(hardware);

		expect(registers[minuend]).toBe(15);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.HALF_CARRY);

		registers[minuend] = 1;
		registers[subtrahend] = 5;

		instruction.execute(hardware);

		expect(registers[minuend]).toBe(252);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);

		instruction.execute(hardware);

		expect(registers[minuend]).toBe(246);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT);
	};

	test('SBC A, B', () => runner(0x98, 'a', 'b'));
	test('SBC A, C', () => runner(0x99, 'a', 'c'));
	test('SBC A, D', () => runner(0x9A, 'a', 'd'));
	test('SBC A, E', () => runner(0x9B, 'a', 'e'));
	test('SBC A, H', () => runner(0x9C, 'a', 'h'));
	test('SBC A, L', () => runner(0x9D, 'a', 'l'));

	test('SBC A, A', () => {
		registers.a = 5;

		instructions.get(0x9F).execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.ZERO);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);
	});
});
