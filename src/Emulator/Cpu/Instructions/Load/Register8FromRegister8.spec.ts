import {HardwareBus} from '../../../Hardware/HardwareBus';
import {CpuRegister8} from '../../Registers';
import {instructions} from '../index';

describe('LD r8, r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8, source: CpuRegister8) => {
		registers[source] = 8;

		instructions.get(code).execute(hardware);

		expect(registers[target]).toBe(8);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);
	};

	test('LD B, B', () => runner(0x40, 'b', 'b'));
	test('LD B, C', () => runner(0x41, 'b', 'c'));
	test('LD B, D', () => runner(0x42, 'b', 'd'));
	test('LD B, E', () => runner(0x43, 'b', 'e'));
	test('LD B, H', () => runner(0x44, 'b', 'h'));
	test('LD B, L', () => runner(0x45, 'b', 'l'));
	test('LD B, A', () => runner(0x47, 'b', 'a'));
	test('LD C, B', () => runner(0x48, 'c', 'b'));
	test('LD C, C', () => runner(0x49, 'c', 'c'));
	test('LD C, D', () => runner(0x4A, 'c', 'd'));
	test('LD C, E', () => runner(0x4B, 'c', 'e'));
	test('LD C, H', () => runner(0x4C, 'c', 'h'));
	test('LD C, L', () => runner(0x4D, 'c', 'l'));
	test('LD C, A', () => runner(0x4F, 'c', 'a'));
	test('LD D, B', () => runner(0x50, 'd', 'b'));
	test('LD D, C', () => runner(0x51, 'd', 'c'));
	test('LD D, D', () => runner(0x52, 'd', 'd'));
	test('LD D, E', () => runner(0x53, 'd', 'e'));
	test('LD D, H', () => runner(0x54, 'd', 'h'));
	test('LD D, L', () => runner(0x55, 'd', 'l'));
	test('LD D, A', () => runner(0x57, 'd', 'a'));
	test('LD E, B', () => runner(0x58, 'e', 'b'));
	test('LD E, C', () => runner(0x59, 'e', 'c'));
	test('LD E, D', () => runner(0x5A, 'e', 'd'));
	test('LD E, E', () => runner(0x5B, 'e', 'e'));
	test('LD E, H', () => runner(0x5C, 'e', 'h'));
	test('LD E, L', () => runner(0x5D, 'e', 'l'));
	test('LD E, A', () => runner(0x5F, 'e', 'a'));
	test('LD H, B', () => runner(0x60, 'h', 'b'));
	test('LD H, C', () => runner(0x61, 'h', 'c'));
	test('LD H, D', () => runner(0x62, 'h', 'd'));
	test('LD H, E', () => runner(0x63, 'h', 'e'));
	test('LD H, H', () => runner(0x64, 'h', 'h'));
	test('LD H, L', () => runner(0x65, 'h', 'l'));
	test('LD H, A', () => runner(0x67, 'h', 'a'));
	test('LD L, B', () => runner(0x68, 'l', 'b'));
	test('LD L, C', () => runner(0x69, 'l', 'c'));
	test('LD L, D', () => runner(0x6A, 'l', 'd'));
	test('LD L, E', () => runner(0x6B, 'l', 'e'));
	test('LD L, H', () => runner(0x6C, 'l', 'h'));
	test('LD L, L', () => runner(0x6D, 'l', 'l'));
	test('LD L, A', () => runner(0x6F, 'l', 'a'));
	test('LD A, B', () => runner(0x78, 'a', 'b'));
	test('LD A, C', () => runner(0x79, 'a', 'c'));
	test('LD A, D', () => runner(0x7A, 'a', 'd'));
	test('LD A, E', () => runner(0x7B, 'a', 'e'));
	test('LD A, H', () => runner(0x7C, 'a', 'h'));
	test('LD A, L', () => runner(0x7D, 'a', 'l'));
	test('LD A, A', () => runner(0x7F, 'a', 'a'));
});
