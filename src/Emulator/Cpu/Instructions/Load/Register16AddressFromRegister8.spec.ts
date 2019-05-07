import {HardwareBus} from '../../../hardware';
import {Memory} from '../../../Memory/Memory';
import {Cpu, CpuRegister} from '../../Cpu';
import {instructions} from '../index';

describe('LD (r16), r8', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory());

	beforeEach(() => {
		hardware.cpu.reset();
	});

	const runner = (code: number, high: CpuRegister, low: CpuRegister, source: CpuRegister) => {
		hardware.cpu.registers[source] = 10;
		hardware.cpu.registers[high] = 0xC0;
		hardware.cpu.registers[low] = 0x00;

		instructions.get(code).execute(hardware);

		expect(hardware.memory.read(0xC000)).toBe(10);

		expect(hardware.cpu.registers.programCounter).toBe(1);
		expect(hardware.cpu.clock).toBe(2);
	};

	test('LD (BC), A', () => runner(0x02, 'b', 'c', 'a'));
	test('LD (DE), A', () => runner(0x12, 'd', 'e', 'a'));
});