import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../RegisterFlag';
import {CpuRegister8} from '../../../../Registers';
import {extendedInstructions} from '../../../index';

describe('RR r8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, target: CpuRegister8) => {
		const instruction = extendedInstructions.get(code);

		registers[target] = 0b0001;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(1);

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b10000000);
		expect(registers.flags).toBe(0);

		registers[target] = 0;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	};

	test('RR B', () => runner(0x18, 'b'));
	test('RR C', () => runner(0x19, 'c'));
	test('RR D', () => runner(0x1A, 'd'));
	test('RR E', () => runner(0x1B, 'e'));
	test('RR H', () => runner(0x1C, 'h'));
	test('RR L', () => runner(0x1D, 'l'));
	test('RR A', () => runner(0x1F, 'a'));
});
