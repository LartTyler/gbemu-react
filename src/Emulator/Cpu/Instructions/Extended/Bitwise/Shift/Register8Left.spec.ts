import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../RegisterFlag';
import {CpuRegister8} from '../../../../Registers';
import {extendedInstructions} from '../../../index';

describe('RLC r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8) => {
		const instruction = extendedInstructions.get(code);

		registers[target] = 0b0001;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b0010);
		expect(registers.flags).toBe(0);

		expect(hardware.cpu.clock).toBe(1);
		expect(registers.programCounter).toBe(0);

		registers[target] = 0b10000000;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b0001);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		registers[target] = 0;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	};

	test('RLC B', () => runner(0x00, 'b'));
	test('RLC C', () => runner(0x01, 'c'));
	test('RLC D', () => runner(0x02, 'd'));
	test('RLC E', () => runner(0x03, 'e'));
	test('RLC H', () => runner(0x04, 'h'));
	test('RLC L', () => runner(0x05, 'l'));
	test('RLC A', () => runner(0x07, 'a'));
});
