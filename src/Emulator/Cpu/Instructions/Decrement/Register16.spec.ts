import {HardwareBus} from '../../../hardware';
import {Memory} from '../../../Memory/Memory';
import {from16Bit} from '../../../Utility/number';
import {Cpu, CpuRegister} from '../../Cpu';
import {instructions} from '../index';

describe('DEC r16', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory());
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();
	});

	const runner = (code: number, high: CpuRegister, low: CpuRegister) => {
		let values = from16Bit(256);

		registers[high] = values.high;
		registers[low] = values.low;

		instructions.get(code).execute(hardware);

		expect(registers[high]).toBe(0);
		expect(registers[low]).toBe(255);

		expect(hardware.cpu.clock).toBe(2);
		expect(registers.programCounter).toBe(1);

		values = from16Bit(500);

		registers[high] = values.high;
		registers[low] = values.low;

		instructions.get(code).execute(hardware);

		expect(registers[high]).toBe(from16Bit(499).high);
		expect(registers[low]).toBe(from16Bit(499).low);

		registers[high] = 0;
		registers[low] = 0;

		instructions.get(code).execute(hardware);

		expect(registers[high]).toBe(255);
		expect(registers[low]).toBe(255);
	};

	test('DEC BC', () => runner(0x0B, 'b', 'c'));
	test('DEC DE', () => runner(0x1B, 'd', 'e'));
	test('DEC HL', () => runner(0x2B, 'h', 'l'));

	test('DEC SP', () => {
		const instruction = instructions.get(0x3B);

		registers.stackPointer = 256;

		instruction.execute(hardware);

		expect(registers.stackPointer).toBe(255);

		expect(hardware.cpu.clock).toBe(2);
		expect(registers.programCounter).toBe(1);

		registers.stackPointer = 0;

		instruction.execute(hardware);

		expect(registers.stackPointer).toBe(0xFFFF);
	});
});
