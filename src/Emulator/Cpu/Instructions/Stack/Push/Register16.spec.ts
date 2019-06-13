import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {CpuRegister16} from '../../../Registers';
import {instructions} from '../../index';

describe('PUSH r16', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();

		registers.stackPointer = 0xFFFE;
	});

	const runner = (code: number, target: CpuRegister16) => {
		registers[target] = 500;

		instructions.get(code).execute(hardware);

		expect(registers.stackPointer).toBe(0xFFFC);
		expect(registers.programCounter).toBe(0);

		expect(hardware.cpu.clock.total).toBe(4);
	};

	test('PUSH BC', () => runner(0xC5, 'bc'));
	test('PUSH DE', () => runner(0xD5, 'de'));
	test('PUSH HL', () => runner(0xE5, 'hl'));
});
