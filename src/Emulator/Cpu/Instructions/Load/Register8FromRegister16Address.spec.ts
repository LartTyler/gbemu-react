import {HardwareBus} from '../../../Hardware/HardwareBus';
import {CpuRegister16, CpuRegister8} from '../../Registers';
import {instructions} from '../index';

describe('LD r8, (r16)', () => {
	const hardware = new HardwareBus();

	beforeEach(() => {
		hardware.cpu.reset();

		hardware.memory.write(0xC000, 10);
	});

	const runner = (code: number, target: CpuRegister8, source: CpuRegister16) => {
		hardware.cpu.registers[source] = 0xC000;

		instructions.get(code).execute(hardware);

		expect(hardware.cpu.registers[target]).toBe(10);
		expect(hardware.cpu.clock).toBe(2);
		expect(hardware.cpu.registers.programCounter).toBe(1);
	};

	test('LD A, (BC)', () => runner(0x0A, 'a', 'bc'));
	test('LD A, (DE)', () => runner(0x1A, 'a', 'de'));
});
