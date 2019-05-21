import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {CpuRegister8} from '../../../../Registers';
import {extendedInstructions} from '../../../index';

describe('RES b, r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8, mask: number) => {
		registers[target] = 0b1111_1111;

		extendedInstructions.get(code).execute(hardware);

		expect(registers[target]).toBe(0b1111_1111 & ~mask);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);
	};

	test('RES 0, B', () => runner(0x80, 'b', 0b0000_0001));
	test('RES 0, C', () => runner(0x81, 'c', 0b0000_0001));
	test('RES 0, D', () => runner(0x82, 'd', 0b0000_0001));
	test('RES 0, E', () => runner(0x83, 'e', 0b0000_0001));
	test('RES 0, H', () => runner(0x84, 'h', 0b0000_0001));
	test('RES 0, L', () => runner(0x85, 'l', 0b0000_0001));
	test('RES 0, A', () => runner(0x87, 'a', 0b0000_0001));

	test('RES 1, B', () => runner(0x88, 'b', 0b0000_0010));
	test('RES 1, C', () => runner(0x89, 'c', 0b0000_0010));
	test('RES 1, D', () => runner(0x8A, 'd', 0b0000_0010));
	test('RES 1, E', () => runner(0x8B, 'e', 0b0000_0010));
	test('RES 1, H', () => runner(0x8C, 'h', 0b0000_0010));
	test('RES 1, L', () => runner(0x8D, 'l', 0b0000_0010));
	test('RES 1, A', () => runner(0x8F, 'a', 0b0000_0010));

	test('RES 2, B', () => runner(0x90, 'b', 0b0000_0100));
	test('RES 2, C', () => runner(0x91, 'c', 0b0000_0100));
	test('RES 2, D', () => runner(0x92, 'd', 0b0000_0100));
	test('RES 2, E', () => runner(0x93, 'e', 0b0000_0100));
	test('RES 2, H', () => runner(0x94, 'h', 0b0000_0100));
	test('RES 2, L', () => runner(0x95, 'l', 0b0000_0100));
	test('RES 2, A', () => runner(0x97, 'a', 0b0000_0100));

	test('RES 3, B', () => runner(0x98, 'b', 0b0000_1000));
	test('RES 3, C', () => runner(0x99, 'c', 0b0000_1000));
	test('RES 3, D', () => runner(0x9A, 'd', 0b0000_1000));
	test('RES 3, E', () => runner(0x9B, 'e', 0b0000_1000));
	test('RES 3, H', () => runner(0x9C, 'h', 0b0000_1000));
	test('RES 3, L', () => runner(0x9D, 'l', 0b0000_1000));
	test('RES 3, A', () => runner(0x9F, 'a', 0b0000_1000));

	test('RES 4, B', () => runner(0xA0, 'b', 0b0001_0000));
	test('RES 4, C', () => runner(0xA1, 'c', 0b0001_0000));
	test('RES 4, D', () => runner(0xA2, 'd', 0b0001_0000));
	test('RES 4, E', () => runner(0xA3, 'e', 0b0001_0000));
	test('RES 4, H', () => runner(0xA4, 'h', 0b0001_0000));
	test('RES 4, L', () => runner(0xA5, 'l', 0b0001_0000));
	test('RES 4, A', () => runner(0xA7, 'a', 0b0001_0000));

	test('RES 5, B', () => runner(0xA8, 'b', 0b0010_0000));
	test('RES 5, C', () => runner(0xA9, 'c', 0b0010_0000));
	test('RES 5, D', () => runner(0xAA, 'd', 0b0010_0000));
	test('RES 5, E', () => runner(0xAB, 'e', 0b0010_0000));
	test('RES 5, H', () => runner(0xAC, 'h', 0b0010_0000));
	test('RES 5, L', () => runner(0xAD, 'l', 0b0010_0000));
	test('RES 5, A', () => runner(0xAF, 'a', 0b0010_0000));

	test('RES 6, B', () => runner(0xB0, 'b', 0b0100_0000));
	test('RES 6, C', () => runner(0xB1, 'c', 0b0100_0000));
	test('RES 6, D', () => runner(0xB2, 'd', 0b0100_0000));
	test('RES 6, E', () => runner(0xB3, 'e', 0b0100_0000));
	test('RES 6, H', () => runner(0xB4, 'h', 0b0100_0000));
	test('RES 6, L', () => runner(0xB5, 'l', 0b0100_0000));
	test('RES 6, A', () => runner(0xB7, 'a', 0b0100_0000));

	test('RES 7, B', () => runner(0xB8, 'b', 0b1000_0000));
	test('RES 7, C', () => runner(0xB9, 'c', 0b1000_0000));
	test('RES 7, D', () => runner(0xBA, 'd', 0b1000_0000));
	test('RES 7, E', () => runner(0xBB, 'e', 0b1000_0000));
	test('RES 7, H', () => runner(0xBC, 'h', 0b1000_0000));
	test('RES 7, L', () => runner(0xBD, 'l', 0b1000_0000));
	test('RES 7, A', () => runner(0xBF, 'a', 0b1000_0000));
});
