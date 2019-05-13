import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../RegisterFlag';
import {CpuRegister8} from '../../Registers';
import {instructions} from '../index';

describe('SUB r8, r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, minuend: CpuRegister8, subtrahend: CpuRegister8) => {
		const instruction = instructions.get(code);

		registers[minuend] = 5;
		registers[subtrahend] = 1;

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);

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
	};

	test('SUB A, B', () => runner(0x90, 'a', 'b'));
	test('SUB A, C', () => runner(0x91, 'a', 'c'));
	test('SUB A, D', () => runner(0x92, 'a', 'd'));
	test('SUB A, E', () => runner(0x93, 'a', 'e'));
	test('SUB A, H', () => runner(0x94, 'a', 'h'));
	test('SUB A, L', () => runner(0x95, 'a', 'l'));

	test('SUB A, A', () => {
		registers.a = 5;

		instructions.get(0x97).execute(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.ZERO);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);
	});
});
