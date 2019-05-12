import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {CpuRegister16} from '../../../Registers';
import {instructions} from '../../index';

describe('POP r16', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();
		registers.stackPointer = 0xFFFE;

		registers.stackPointer -= 2;
		hardware.memory.writeWord(registers.stackPointer, 500);

		registers.stackPointer -= 2;
		hardware.memory.writeWord(registers.stackPointer, 250);
	});

	const runner = (code: number, target: CpuRegister16) => {
		const instruction = instructions.get(code);

		instruction.execute(hardware);

		expect(registers[target]).toBe(250);
		expect(registers.stackPointer).toBe(0xFFFC);

		expect(registers.programCounter).toBe(1);
		expect(hardware.cpu.clock).toBe(3);

		instruction.execute(hardware);

		expect(registers[target]).toBe(500);
		expect(registers.stackPointer).toBe(0xFFFE);
	};

	test('POP BC', () => runner(0xC1, 'bc'));
	test('POP DE', () => runner(0xD1, 'de'));
	test('POP HL', () => runner(0xE1, 'hl'));
});
