import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {BitPosition} from '../../../../Registers';
import {extendedInstructions} from '../../../index';

describe('RES b, (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, position: BitPosition) => {
		registers.hl = 0xC000;

		hardware.memory.write(registers.hl, 0xFF);

		extendedInstructions.get(code).execute(hardware);

		expect(hardware.memory.read(registers.hl)).toBe(0xFF & ~(1 << position));

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(3);
	};

	test('RES 0, (HL)', () => runner(0x86, 0));
	test('RES 1, (HL)', () => runner(0x8E, 1));
	test('RES 2, (HL)', () => runner(0x96, 2));
	test('RES 3, (HL)', () => runner(0x9E, 3));
	test('RES 4, (HL)', () => runner(0xA6, 4));
	test('RES 5, (HL)', () => runner(0xAE, 5));
	test('RES 6, (HL)', () => runner(0xB6, 6));
	test('RES 7, (HL)', () => runner(0xBE, 7));
});
