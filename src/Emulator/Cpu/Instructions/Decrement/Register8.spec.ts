import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../RegisterFlag';
import {CpuRegister} from '../../Registers';
import {instructions} from '../index';

describe('DEC r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();
	});

	const runner = (code: number, target: CpuRegister) => {
		registers[target] = 5;

		instructions.get(code).execute(hardware);

		expect(registers[target]).toBe(4);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT);

		expect(hardware.cpu.clock.total).toBe(1);
		expect(registers.programCounter).toBe(0);

		registers[target] = 1;

		instructions.get(code).execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.ZERO);

		registers[target] = 16;

		instructions.get(code).execute(hardware);

		expect(registers[target]).toBe(15);
		expect(registers.flags).toBe(RegisterFlag.SUBTRACT | RegisterFlag.HALF_CARRY);
	};

	test('DEC B', () => runner(0x05, 'b'));
	test('DEC C', () => runner(0x0D, 'c'));
	test('DEC D', () => runner(0x15, 'd'));
	test('DEC E', () => runner(0x1D, 'e'));
	test('DEC H', () => runner(0x25, 'h'));
	test('DEC L', () => runner(0x2D, 'l'));
	test('DEC A', () => runner(0x3D, 'a'));
});
