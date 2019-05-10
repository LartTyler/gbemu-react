import {HardwareBus} from '../../../Hardware/HardwareBus';
import {CpuRegister, RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('INC r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();
	});

	const runner = (code: number, target: CpuRegister) => {
		const instruction = instructions.get(code);

		registers[target] = 5;

		instruction.execute(hardware);

		expect(registers[target]).toBe(6);

		expect(hardware.cpu.clock).toBe(1);
		expect(registers.programCounter).toBe(1);

		registers[target] = 15;

		instruction.execute(hardware);

		expect(registers[target]).toBe(16);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		registers[target] = 255;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO | RegisterFlag.HALF_CARRY);
	};

	test('INC B', () => runner(0x04, 'b'));
	test('INC C', () => runner(0x0C, 'c'));
	test('INC D', () => runner(0x14, 'd'));
	test('INC E', () => runner(0x1C, 'e'));
	test('INC H', () => runner(0x24, 'h'));
	test('INC L', () => runner(0x2C, 'l'));
	test('INC A', () => runner(0x3C, 'a'));
});
