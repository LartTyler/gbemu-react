import {HardwareBus} from '../../../../Hardware/HardwareBus';
import {to16Bit} from '../../../../Utility/number';
import {RegisterFlag} from '../../../RegisterFlag';
import {instructions} from '../../index';

describe('POP AF', () => {
	const hardware = new HardwareBus();
	const registers = hardware.cpu.registers;

	test('POP AF', () => {
		registers.stackPointer = 0xFFFC;
		hardware.memory.writeWord(registers.stackPointer, to16Bit(150, RegisterFlag.ZERO | RegisterFlag.CARRY));

		instructions.get(0xF1).execute(hardware);

		expect(registers.a).toBe(150);
		expect(registers.flags).toBe(RegisterFlag.ZERO | RegisterFlag.CARRY);
		expect(registers.stackPointer).toBe(0xFFFE);

		expect(registers.programCounter).toBe(0);
		expect(hardware.cpu.clock.total).toBe(3);
	});
});
