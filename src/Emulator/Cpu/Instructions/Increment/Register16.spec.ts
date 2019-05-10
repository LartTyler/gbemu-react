import {HardwareBus} from '../../../Hardware/HardwareBus';
import {Memory} from '../../../Memory/Memory';
import {from16Bit, to16Bit} from '../../../Utility/number';
import {Cpu} from '../../Cpu';
import {CpuRegister} from '../../Registers';
import {instructions} from '../index';

describe('INC r16', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();
	});

	const runner = (code: number, high: CpuRegister, low: CpuRegister) => {
		const values = from16Bit(500);

		registers[high] = values.high;
		registers[low] = values.low;

		instructions.get(code).execute(hardware);

		expect(to16Bit(registers[high], registers[low])).toBe(501);
	};

	test('INC BC', () => runner(0x03, 'b', 'c'));
	test('INC DE', () => runner(0x13, 'd', 'e'));
	test('INC HL', () => runner(0x23, 'h', 'l'));

	test('INC SP', () => {
		registers.stackPointer = 500;

		instructions.get(0x33).execute(hardware);

		expect(registers.stackPointer).toBe(501);
	});
});
