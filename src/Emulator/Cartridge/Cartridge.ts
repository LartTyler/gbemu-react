import {to16Bit} from '../Utility/number';
import {fromBinary} from '../Utility/string';
import {ReadOnlyController} from './Controllers/ReadOnlyController';

export interface ICartridge {
	readonly logo: Uint8Array;
	readonly title: string;
	readonly licensee: number;

	read(address: number): number;
	write(address: number, value: number): void;
}

export interface IController {
	read(address: number): number;
	write(address: number, value: number): void;
}

export class Cartridge implements ICartridge {
	public readonly logo: Uint8Array;
	public readonly title: string;
	public readonly licensee: number;

	protected controller: IController;

	public constructor(data: Uint8Array) {
		this.controller = new ReadOnlyController(data);

		this.logo = data.slice(0x0104, 0x0133);
		this.title = fromBinary(data.slice(0x0134, 0x0143)).trim();

		if (data[0x014B] === 0x33)
			this.licensee = to16Bit(data[0x0145], data[0x0144]);
		else
			this.licensee = data[0x014B];
	}

	public read(address: number): number {
		return this.controller.read(address);
	}

	public write(address: number, value: number): void {
		this.controller.write(address, value);
	}
}
