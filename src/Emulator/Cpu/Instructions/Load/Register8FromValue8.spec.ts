import {HardwareBus} from '../../../Hardware/HardwareBus';
import {CpuRegister} from '../../Registers';
import {instructions} from '../index';

describe('LD r8, n8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();

		hardware.cpu.registers.programCounter = 0xC000;
	});

	const runner = (code: number, target: CpuRegister) => {
		hardware.memory.write(0xC000, 10);

		instructions.get(code).execute(hardware);

		expect(registers[target]).toBe(10);

		expect(registers.programCounter).toBe(0xC002);
		expect(hardware.cpu.clock).toBe(2);
	};

	test('LD B, (PC)', () => runner(0x06, 'b'));
	test('LD C, (PC)', () => runner(0x0E, 'c'));
	test('LD D, (PC)', () => runner(0x16, 'd'));
	test('LD E, (PC)', () => runner(0x1E, 'e'));
	test('LD H, (PC)', () => runner(0x26, 'h'));
	test('LD L, (PC)', () => runner(0x2E, 'l'));
	test('LD A, (PC)', () => runner(0x3E, 'a'));
});
