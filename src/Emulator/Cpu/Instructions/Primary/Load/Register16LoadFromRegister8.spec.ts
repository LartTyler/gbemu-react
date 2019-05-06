import {HardwareBus} from '../../../../hardware';
import {Memory} from '../../../../Memory/Memory';
import {to16Bit} from '../../../../Utility/number';
import {Cpu, CpuRegister} from '../../../Cpu';
import {instructions} from '../index';
import {Register16LoadFromRegister8} from './Register16LoadFromRegister8';

describe('Load r8 into r16', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory());

	beforeEach(() => {
		hardware.cpu.reset();
	});

	const runner = (code: number, high: CpuRegister, low: CpuRegister, source: CpuRegister) => {
		hardware.cpu.registers[source] = 10;

		instructions.get(code).invoke(hardware);

		expect(to16Bit(hardware.cpu.registers[high], hardware.cpu.registers[low])).toBe(10);
	};

	test('LD (BC), A', () => runner(0x02, 'b', 'c', 'a'));
	test('LD (DE), A', () => runner(0x12, 'd', 'e', 'a'));
});
