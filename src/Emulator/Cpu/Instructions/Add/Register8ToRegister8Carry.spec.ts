import {HardwareBus} from '../../../Hardware/HardwareBus';
import {CpuRegister8, RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('ADC r8, r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();
	});

	const runner = (code: number, target: CpuRegister8, source: CpuRegister8) => {
		const instruction = instructions.get(code);

		registers[target] = 1;
		registers[source] = 1;
		registers.flags = RegisterFlag.SUBTRACT;

		instruction.execute(hardware);

		expect(registers[target]).toBe(2);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);

		registers[target] = 15;
		registers[source] = 15;

		instruction.execute(hardware);

		expect(registers[target]).toBe(30);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		registers[target] = 128;
		registers[source] = 128;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO | RegisterFlag.CARRY);

		registers[target] = 130;
		registers[source] = 130;

		instruction.execute(hardware);

		expect(registers[target]).toBe(5);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
	};

	test('ADC A, B', () => runner(0x88, 'a', 'b'));
	test('ADC A, C', () => runner(0x89, 'a', 'c'));
	test('ADC A, D', () => runner(0x8A, 'a', 'd'));
	test('ADC A, E', () => runner(0x8B, 'a', 'e'));
	test('ADC A, H', () => runner(0x8C, 'a', 'h'));
	test('ADC A, L', () => runner(0x8D, 'a', 'l'));
	test('ADC A, A', () => runner(0x8F, 'a', 'a'));
});
