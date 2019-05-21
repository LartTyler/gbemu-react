import {HardwareBus} from '../../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../../RegisterFlag';
import {CpuRegister8} from '../../../../../Registers';
import {extendedInstructions} from '../../../../index';

describe('SRL r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8) => {
		const instruction = extendedInstructions.get(code);

		registers[target] = 0b1000_0110;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b0100_0011);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);

		registers[target] = 0b0011;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b0001);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	};

	test('SRL B', () => runner(0x38, 'b'));
	test('SRL C', () => runner(0x39, 'c'));
	test('SRL D', () => runner(0x3A, 'd'));
	test('SRL E', () => runner(0x3B, 'e'));
	test('SRL H', () => runner(0x3C, 'h'));
	test('SRL L', () => runner(0x3D, 'l'));
	test('SRL A', () => runner(0x3F, 'a'));
});
