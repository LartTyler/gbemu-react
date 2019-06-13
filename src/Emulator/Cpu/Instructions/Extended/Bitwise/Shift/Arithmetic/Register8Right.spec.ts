import {HardwareBus} from '../../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../../RegisterFlag';
import {CpuRegister8} from '../../../../../Registers';
import {extendedInstructions} from '../../../../index';

describe('SRA r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8) => {
		const instruction = extendedInstructions.get(code);

		registers[target] = 0;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);

		registers[target] = 0b0110;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b0011);
		expect(registers.flags).toBe(0);

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b0001);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);

		registers[target] = 0b1000_1010;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b1100_0101);
		expect(registers.flags).toBe(0);
	};

	test('SRA B', () => runner(0x28, 'b'));
	test('SRA C', () => runner(0x29, 'c'));
	test('SRA D', () => runner(0x2A, 'd'));
	test('SRA E', () => runner(0x2B, 'e'));
	test('SRA H', () => runner(0x2C, 'h'));
	test('SRA L', () => runner(0x2D, 'l'));
	test('SRA A', () => runner(0x2F, 'a'));
});
