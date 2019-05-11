import {HardwareBus} from '../../../Hardware/HardwareBus';
import {CpuRegister8, RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('CP r8, r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, minuend: CpuRegister8, subtrahend: CpuRegister8) => {
		const instruction = instructions.get(code);

		registers[minuend] = 5;
		registers[subtrahend] = 1;

		instruction.execute(hardware);

		expect(registers[minuend]).toBe(5);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT);

		expect(registers.programCounter).toBe(1);
		expect(hardware.cpu.clock).toBe(1);

		registers[minuend] = 16;
		registers[subtrahend] = 1;

		instruction.execute(hardware);

		expect(registers[minuend]).toBe(16);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.HALF_CARRY);

		registers[minuend] = 1;
		registers[subtrahend] = 5;

		instruction.execute(hardware);

		expect(registers[minuend]).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);
	};

	test('SUB A, B', () => runner(0xB8, 'a', 'b'));
	test('SUB A, C', () => runner(0xB9, 'a', 'c'));
	test('SUB A, D', () => runner(0xBA, 'a', 'd'));
	test('SUB A, E', () => runner(0xBB, 'a', 'e'));
	test('SUB A, H', () => runner(0xBC, 'a', 'h'));
	test('SUB A, L', () => runner(0xBD, 'a', 'l'));

	test('SUB A, A', () => {
		registers.a = 5;

		instructions.get(0xBF).execute(hardware);

		expect(registers.a).toBe(5);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.ZERO);

		expect(registers.programCounter).toBe(1);
		expect(hardware.cpu.clock).toBe(1);
	});
});
