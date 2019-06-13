import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../RegisterFlag';
import {CpuRegister8} from '../../Registers';
import {instructions} from '../index';

describe('ADD r8, r8', () => {
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
		expect(hardware.cpu.clock.total).toBe(1);

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

		expect(registers[target]).toBe(4);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
	};

	test('ADD A, B', () => runner(0x80, 'a', 'b'));
	test('ADD A, C', () => runner(0x81, 'a', 'c'));
	test('ADD A, D', () => runner(0x82, 'a', 'd'));
	test('ADD A, E', () => runner(0x83, 'a', 'e'));
	test('ADD A, H', () => runner(0x84, 'a', 'h'));
	test('ADD A, L', () => runner(0x85, 'a', 'l'));
	test('ADD A, A', () => runner(0x87, 'a', 'a'));
});
