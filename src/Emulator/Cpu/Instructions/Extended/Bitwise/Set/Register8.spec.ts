import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {BitPosition, CpuRegister8} from '../../../../Registers';
import {extendedInstructions} from '../../../index';

describe('SET b, r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8, position: BitPosition) => {
		extendedInstructions.get(code).execute(hardware);

		expect(registers[target]).toBe(1 << position);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);
	};

	test('SET 0, B', () => runner(0xC0, 'b', 0));
	test('SET 0, C', () => runner(0xC1, 'c', 0));
	test('SET 0, D', () => runner(0xC2, 'd', 0));
	test('SET 0, E', () => runner(0xC3, 'e', 0));
	test('SET 0, H', () => runner(0xC4, 'h', 0));
	test('SET 0, L', () => runner(0xC5, 'l', 0));
	test('SET 0, A', () => runner(0xC7, 'a', 0));

	test('SET 1, B', () => runner(0xC8, 'b', 1));
	test('SET 1, C', () => runner(0xC9, 'c', 1));
	test('SET 1, D', () => runner(0xCA, 'd', 1));
	test('SET 1, E', () => runner(0xCB, 'e', 1));
	test('SET 1, H', () => runner(0xCC, 'h', 1));
	test('SET 1, L', () => runner(0xCD, 'l', 1));
	test('SET 1, A', () => runner(0xCF, 'a', 1));

	test('SET 2, B', () => runner(0xD0, 'b', 2));
	test('SET 2, C', () => runner(0xD1, 'c', 2));
	test('SET 2, D', () => runner(0xD2, 'd', 2));
	test('SET 2, E', () => runner(0xD3, 'e', 2));
	test('SET 2, H', () => runner(0xD4, 'h', 2));
	test('SET 2, L', () => runner(0xD5, 'l', 2));
	test('SET 2, A', () => runner(0xD7, 'a', 2));

	test('SET 3, B', () => runner(0xD8, 'b', 3));
	test('SET 3, C', () => runner(0xD9, 'c', 3));
	test('SET 3, D', () => runner(0xDA, 'd', 3));
	test('SET 3, E', () => runner(0xDB, 'e', 3));
	test('SET 3, H', () => runner(0xDC, 'h', 3));
	test('SET 3, L', () => runner(0xDD, 'l', 3));
	test('SET 3, A', () => runner(0xDF, 'a', 3));

	test('SET 4, B', () => runner(0xE0, 'b', 4));
	test('SET 4, C', () => runner(0xE1, 'c', 4));
	test('SET 4, D', () => runner(0xE2, 'd', 4));
	test('SET 4, E', () => runner(0xE3, 'e', 4));
	test('SET 4, H', () => runner(0xE4, 'h', 4));
	test('SET 4, L', () => runner(0xE5, 'l', 4));
	test('SET 4, A', () => runner(0xE7, 'a', 4));

	test('SET 5, B', () => runner(0xE8, 'b', 5));
	test('SET 5, C', () => runner(0xE9, 'c', 5));
	test('SET 5, D', () => runner(0xEA, 'd', 5));
	test('SET 5, E', () => runner(0xEB, 'e', 5));
	test('SET 5, H', () => runner(0xEC, 'h', 5));
	test('SET 5, L', () => runner(0xED, 'l', 5));
	test('SET 5, A', () => runner(0xEF, 'a', 5));

	test('SET 6, B', () => runner(0xF0, 'b', 6));
	test('SET 6, C', () => runner(0xF1, 'c', 6));
	test('SET 6, D', () => runner(0xF2, 'd', 6));
	test('SET 6, E', () => runner(0xF3, 'e', 6));
	test('SET 6, H', () => runner(0xF4, 'h', 6));
	test('SET 6, L', () => runner(0xF5, 'l', 6));
	test('SET 6, A', () => runner(0xF7, 'a', 6));

	test('SET 7, B', () => runner(0xF8, 'b', 7));
	test('SET 7, C', () => runner(0xF9, 'c', 7));
	test('SET 7, D', () => runner(0xFA, 'd', 7));
	test('SET 7, E', () => runner(0xFB, 'e', 7));
	test('SET 7, H', () => runner(0xFC, 'h', 7));
	test('SET 7, L', () => runner(0xFD, 'l', 7));
	test('SET 7, A', () => runner(0xFF, 'a', 7));
});
