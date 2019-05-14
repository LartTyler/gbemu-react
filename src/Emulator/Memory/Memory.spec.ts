import {Cartridge} from '../Cartridge/Cartridge';
import {HardwareBus} from '../Hardware/HardwareBus';
import {Memory} from './Memory';

describe('Memory', () => {
	const hardware = new HardwareBus();
	const memory = hardware.memory;

	test('Read and write byte', () => {
		memory.write(0xC000, 10);

		expect(memory.read(0xC000)).toBe(10);
	});

	test('Read and write word', () => {
		memory.writeWord(0xC000, 500);

		expect(memory.readWord(0xC000)).toBe(500);
	});

	test('Reads from BIOS', () => {
		expect(memory.read(0)).toBe(0x31);
	});

	test('Cannot write BIOS', () => {
		expect(() => memory.write(0, 10)).toThrow('is not writeable');
	});

	test('First read to $0100 turns off BIOS', () => {
		memory.setCartridge(new Cartridge(new Uint8Array(8192)));

		expect(memory.read(0)).toBe(0x31);

		memory.read(0x100);

		expect(memory.read(0)).toBe(0);
	});
});
