import {HardwareBus} from '../../../Hardware/HardwareBus';
import {toTwosComplement} from '../../../Utility/number';
import {instructions} from '../index';

describe('JR s8', () => {
	const hardware = new HardwareBus();

	test('JR s8', () => {
		const instruction = instructions.get(0x18);

		hardware.cpu.registers.programCounter = 0xC000;
		hardware.memory.write(0xC000, 8);

		instruction.execute(hardware);

		expect(hardware.cpu.registers.programCounter).toBe(0xC008);
		expect(hardware.cpu.clock).toBe(3);

		hardware.memory.write(0xC008, toTwosComplement(-8));

		instruction.execute(hardware);

		expect(hardware.cpu.registers.programCounter).toBe(0xC000);
		expect(hardware.cpu.clock).toBe(6);
	});
});
