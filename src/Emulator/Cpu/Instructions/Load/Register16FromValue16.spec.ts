import {HardwareBus} from '../../../Hardware/HardwareBus';
import {Memory} from '../../../Memory/Memory';
import {to16Bit} from '../../../Utility/number';
import {Cpu} from '../../Cpu';
import {CpuRegister} from '../../Registers';
import {instructions} from '../index';

describe('LD r16, n16', () => {
	const hardware = new HardwareBus();

	beforeEach(() => {
		hardware.cpu.reset();
		hardware.cpu.registers.programCounter = 0xC000;

		hardware.memory.writeWord(0xC000, 500);
	});

	const runner = (code: number, high: CpuRegister, low?: CpuRegister) => {
		instructions.get(code).execute(hardware);

		if (high === 'stackPointer')
			expect(hardware.cpu.registers.stackPointer).toBe(500);
		else
			expect(to16Bit(hardware.cpu.registers[high], hardware.cpu.registers[low])).toBe(500);

		expect(hardware.cpu.clock).toBe(3);
		expect(hardware.cpu.registers.programCounter).toBe(0xC002);
	};

	test('LD BC, (PC)', () => runner(0x01, 'b', 'c'));
	test('LD DE, (PC)', () => runner(0x11, 'd', 'e'));
	test('LD HL, (PC)', () => runner(0x21, 'h', 'l'));
	test('LD SP, (PC)', () => runner(0x31, 'stackPointer'));
});
