import {to16Bit} from '../Utility/number';
import {fromBinary} from '../Utility/string';

export interface ICartridge {
	readonly logo: Uint8Array;
	readonly title: string;
	readonly licensee: number;

	read(address: number): number;
}

export class Cartridge implements ICartridge {
	public readonly logo: Uint8Array;
	public readonly title: string;
	public readonly licensee: number;

	protected rom: Uint8Array;

	public constructor(rom: Uint8Array) {
		this.rom = rom;

		this.logo = rom.slice(0x0104, 0x0133);
		this.title = fromBinary(rom.slice(0x0134, 0x0143)).trim();

		if (rom[0x014B] === 0x33)
			this.licensee = to16Bit(rom[0x0145], rom[0x0144]);
		else
			this.licensee = rom[0x014B];
	}

	public read(address: number): number {
		return this.rom[address];
	}
}
