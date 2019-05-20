import {HardwareBus} from '../../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../../RegisterFlag';
import {CpuRegister8} from '../../../../../Registers';
import {extendedInstructions} from '../../../../index';

describe('SLA r8', () => {
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
		expect(hardware.cpu.clock).toBe(1);

		registers[target] = 0b0001;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b0010);
		expect(registers.flags).toBe(0);

		registers[target] = 0b1100_0000;

		instruction.execute(hardware);

		expect(registers[target]).toBe(0b1000_0000);
		expect(registers.flags).toBe(RegisterFlag.CARRY);

		instruction.execute(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);
	};

	test('SLA B', () => runner(0x20, 'b'));
	test('SLA C', () => runner(0x21, 'c'));
	test('SLA D', () => runner(0x22, 'd'));
	test('SLA E', () => runner(0x23, 'e'));
	test('SLA H', () => runner(0x24, 'h'));
	test('SLA L', () => runner(0x25, 'l'));
	test('SLA A', () => runner(0x27, 'a'));
});
