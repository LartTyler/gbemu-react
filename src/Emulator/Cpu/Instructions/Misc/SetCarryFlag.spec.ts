import {HardwareBus} from '../../../Hardware/HardwareBus';
import {RegisterFlag} from '../../Registers';
import {instructions} from '../index';

describe('SCF', () => {
	const hardware = new HardwareBus();

	test('SCF', () => {
		hardware.cpu.registers.flags = RegisterFlag.HALF_CARRY | RegisterFlag.SUBTRACT;

		instructions.get(0x37).execute(hardware);

		expect(hardware.cpu.registers.flags).toBe(RegisterFlag.CARRY);
		expect(hardware.cpu.registers.programCounter).toBe(0);
		expect(hardware.cpu.clock).toBe(1);
	});
});
