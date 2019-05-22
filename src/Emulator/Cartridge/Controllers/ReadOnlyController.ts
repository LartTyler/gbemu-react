import {IController} from '../Cartridge';

export class ReadOnlyController implements IController {
	public constructor(protected data: Uint8Array) {
	}

	public read(address: number): number {
		return this.data[address];
	}

	public write(address: number, value: number): void {
		// noop
	}
}
