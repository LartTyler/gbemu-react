import {HardwareBus} from '../../../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../../../RegisterFlag';
import {BitPosition, CpuRegister16} from '../../../../Registers';
import {extendedInstructions} from '../../../index';

describe('BIT b, (r16)', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => hardware.cpu.reset());

	const runner = (code: number, pointer: CpuRegister16, position: BitPosition) => {
		const instruction = extendedInstructions.get(code);
		registers.hl = 0xC000;

		hardware.memory.write(registers.hl, 0);

		instruction.execute(hardware);

		expect(registers.flags).toBe(RegisterFlag.ZERO | RegisterFlag.HALF_CARRY);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(2);

		hardware.memory.write(registers.hl, 1 << position);

		instruction.execute(hardware);

		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);
	};

	test('BIT 0, (HL)', () => runner(0x46, 'hl', 0));
	test('BIT 1, (HL)', () => runner(0x4E, 'hl', 1));
	test('BIT 2, (HL)', () => runner(0x56, 'hl', 2));
	test('BIT 3, (HL)', () => runner(0x5E, 'hl', 3));
	test('BIT 4, (HL)', () => runner(0x66, 'hl', 4));
	test('BIT 5, (HL)', () => runner(0x6E, 'hl', 5));
	test('BIT 6, (HL)', () => runner(0x76, 'hl', 6));
	test('BIT 7, (HL)', () => runner(0x7E, 'hl', 7));
});
