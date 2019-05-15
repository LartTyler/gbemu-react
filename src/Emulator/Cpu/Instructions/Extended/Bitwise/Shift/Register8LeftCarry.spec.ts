import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../RegisterFlag';
import {CpuRegister8} from '../../../../Registers';
import {extendedInstructions} from '../../../index';

describe('RL r8', () => {
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

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b0001);
		expect(registers.flags).toBe(0);
	};

	test('RL B', () => runner(0x10, 'b'));
	test('RL C', () => runner(0x11, 'c'));
	test('RL D', () => runner(0x12, 'd'));
	test('RL E', () => runner(0x13, 'e'));
	test('RL H', () => runner(0x14, 'h'));
	test('RL L', () => runner(0x15, 'l'));
	test('RL A', () => runner(0x17, 'a'));
});
