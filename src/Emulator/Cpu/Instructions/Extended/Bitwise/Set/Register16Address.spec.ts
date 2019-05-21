import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {BitPosition, CpuRegister16} from '../../../../Registers';
import {extendedInstructions} from '../../../index';

describe('SET b, (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, pointer: CpuRegister16, position: BitPosition) => {
		registers.hl = 0xC000;
		hardware.memory.write(registers.hl, 0);

		extendedInstructions.get(code).execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(1 << position);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(3);
	};

	test('SET 0, (HL)', () => runner(0xC6, 'hl', 0));
	test('SET 1, (HL)', () => runner(0xCE, 'hl', 1));
	test('SET 2, (HL)', () => runner(0xD6, 'hl', 2));
	test('SET 3, (HL)', () => runner(0xDE, 'hl', 3));
	test('SET 4, (HL)', () => runner(0xE6, 'hl', 4));
	test('SET 5, (HL)', () => runner(0xEE, 'hl', 5));
	test('SET 6, (HL)', () => runner(0xF6, 'hl', 6));
	test('SET 7, (HL)', () => runner(0xFE, 'hl', 7));
});
