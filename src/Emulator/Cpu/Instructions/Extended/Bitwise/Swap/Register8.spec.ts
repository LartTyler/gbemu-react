import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../RegisterFlag';
import {CpuRegister8} from '../../../../Registers';
import {extendedInstructions} from '../../../index';

describe('SWAP r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8) => {
		const instruction = extendedInstructions.get(code);

		registers[target] = 0b1100_1011;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b1011_1100);
		expect(registers.flags).toBe(0);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);

		registers[target] = 0;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	};

	test('SWAP B', () => runner(0x30, 'b'));
	test('SWAP C', () => runner(0x31, 'c'));
	test('SWAP D', () => runner(0x32, 'd'));
	test('SWAP E', () => runner(0x33, 'e'));
	test('SWAP H', () => runner(0x34, 'h'));
	test('SWAP L', () => runner(0x35, 'l'));
	test('SWAP A', () => runner(0x37, 'a'));
});
