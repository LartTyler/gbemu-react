import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../RegisterFlag';
import {CpuRegister8} from '../../../../Registers';
import {extendedInstructions} from '../../../index';

describe('RRC r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8) => {
		const instruction = extendedInstructions.get(code);

		registers[target] = 0b0001;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b10000000);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b01000000);
		expect(registers.flags).toBe(0);

		registers[target] = 0;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	};

	test('RRC B', () => runner(0x08, 'b'));
	test('RRC C', () => runner(0x09, 'c'));
	test('RRC D', () => runner(0x0A, 'd'));
	test('RRC E', () => runner(0x0B, 'e'));
	test('RRC H', () => runner(0x0C, 'h'));
	test('RRC L', () => runner(0x0D, 'l'));
	test('RRC A', () => runner(0x0F, 'a'));
});
