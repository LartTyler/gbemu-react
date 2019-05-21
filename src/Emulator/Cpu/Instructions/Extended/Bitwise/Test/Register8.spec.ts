import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../RegisterFlag';
import {BitPosition, CpuRegister8} from '../../../../Registers';
import {extendedInstructions} from '../../../index';

describe('BIT b, r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8, position: BitPosition) => {
		const instruction = extendedInstructions.get(code);

		registers[target] = 0;

		instruction.execute(hardware);

		expect(registers.flags).toBe(RegisterFlag.ZERO | RegisterFlag.HALF_CARRY);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);

		registers[target] = 1 << position;

		instruction.execute(hardware);

		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);
	};

	test('BIT 0, B', () => runner(0x40, 'b', 0));
	test('BIT 0, C', () => runner(0x41, 'c', 0));
	test('BIT 0, D', () => runner(0x42, 'd', 0));
	test('BIT 0, E', () => runner(0x43, 'e', 0));
	test('BIT 0, H', () => runner(0x44, 'h', 0));
	test('BIT 0, L', () => runner(0x45, 'l', 0));
	test('BIT 0, A', () => runner(0x47, 'a', 0));

	test('BIT 1, B', () => runner(0x48, 'b', 1));
	test('BIT 1, C', () => runner(0x49, 'c', 1));
	test('BIT 1, D', () => runner(0x4A, 'd', 1));
	test('BIT 1, E', () => runner(0x4B, 'e', 1));
	test('BIT 1, H', () => runner(0x4C, 'h', 1));
	test('BIT 1, L', () => runner(0x4D, 'l', 1));
	test('BIT 1, A', () => runner(0x4F, 'a', 1));

	test('BIT 2, B', () => runner(0x50, 'b', 2));
	test('BIT 2, C', () => runner(0x51, 'c', 2));
	test('BIT 2, D', () => runner(0x52, 'd', 2));
	test('BIT 2, E', () => runner(0x53, 'e', 2));
	test('BIT 2, H', () => runner(0x54, 'h', 2));
	test('BIT 2, L', () => runner(0x55, 'l', 2));
	test('BIT 2, A', () => runner(0x57, 'a', 2));

	test('BIT 3, B', () => runner(0x58, 'b', 3));
	test('BIT 3, C', () => runner(0x59, 'c', 3));
	test('BIT 3, D', () => runner(0x5A, 'd', 3));
	test('BIT 3, E', () => runner(0x5B, 'e', 3));
	test('BIT 3, H', () => runner(0x5C, 'h', 3));
	test('BIT 3, L', () => runner(0x5D, 'l', 3));
	test('BIT 3, A', () => runner(0x5F, 'a', 3));

	test('BIT 4, B', () => runner(0x60, 'b', 4));
	test('BIT 4, C', () => runner(0x61, 'c', 4));
	test('BIT 4, D', () => runner(0x62, 'd', 4));
	test('BIT 4, E', () => runner(0x63, 'e', 4));
	test('BIT 4, H', () => runner(0x64, 'h', 4));
	test('BIT 4, L', () => runner(0x65, 'l', 4));
	test('BIT 4, A', () => runner(0x67, 'a', 4));

	test('BIT 5, B', () => runner(0x68, 'b', 5));
	test('BIT 5, C', () => runner(0x69, 'c', 5));
	test('BIT 5, D', () => runner(0x6A, 'd', 5));
	test('BIT 5, E', () => runner(0x6B, 'e', 5));
	test('BIT 5, H', () => runner(0x6C, 'h', 5));
	test('BIT 5, L', () => runner(0x6D, 'l', 5));
	test('BIT 5, A', () => runner(0x6F, 'a', 5));

	test('BIT 6, B', () => runner(0x70, 'b', 6));
	test('BIT 6, C', () => runner(0x71, 'c', 6));
	test('BIT 6, D', () => runner(0x72, 'd', 6));
	test('BIT 6, E', () => runner(0x73, 'e', 6));
	test('BIT 6, H', () => runner(0x74, 'h', 6));
	test('BIT 6, L', () => runner(0x75, 'l', 6));
	test('BIT 6, A', () => runner(0x77, 'a', 6));

	test('BIT 7, B', () => runner(0x78, 'b', 7));
	test('BIT 7, C', () => runner(0x79, 'c', 7));
	test('BIT 7, D', () => runner(0x7A, 'd', 7));
	test('BIT 7, E', () => runner(0x7B, 'e', 7));
	test('BIT 7, H', () => runner(0x7C, 'h', 7));
	test('BIT 7, L', () => runner(0x7D, 'l', 7));
	test('BIT 7, A', () => runner(0x7F, 'a', 7));
});
