import {HardwareBus} from '../../../Hardware/HardwareBus';
import {toTwosComplement} from '../../../Utility/number';
import {RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('JR cc, s8', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	beforeEach(() => {
		hardware.cpu.reset();
		hardware.cpu.registers.programCounter = 0xC000;

		hardware.memory.write(0xC002, 6);
		hardware.memory.write(0xC008, toTwosComplement(-8));
	});

	const runner = (code: number, flags: number) => {
		const instruction = instructions.get(code);

		registers.flags = ~flags;

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC002);
		expect(hardware.cpu.clock).toBe(2);

		registers.flags = flags;

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC008);
		expect(hardware.cpu.clock).toBe(5);

		instruction.execute(hardware);

		expect(registers.programCounter).toBe(0xC000);
		expect(hardware.cpu.clock).toBe(8);
	};

	test('JR NZ, s8', () => runner(0x20, ~RegisterFlag.ZERO));
	test('JR Z, s8', () => runner(0x28, RegisterFlag.ZERO));
	test('JR NC, s8', () => runner(0x30, ~RegisterFlag.CARRY));
	test('JR C, s8', () => runner(0x38, RegisterFlag.CARRY));
});
