import {HardwareBus} from '../../../Hardware/HardwareBus';
import {Memory} from '../../../Memory/Memory';
import {Cpu, CpuRegister, RegisterFlag} from '../../Cpu';
import {instructions} from '../index';

describe('INC r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();
	});

	const runner = (code: number, target: CpuRegister) => {
		registers[target] = 5;

		instructions.get(code).execute(hardware);

		expect(registers[target]).toBe(6);

		expect(hardware.cpu.clock).toBe(1);
		expect(registers.programCounter).toBe(1);

		registers[target] = 0xFF;

		instructions.get(code).execute(hardware);

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
