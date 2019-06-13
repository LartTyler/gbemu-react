import {IResettable} from '../../Hardware';
import {Color, Colors} from './Color';
import {Palette} from './Palette';

export const monochromeColors = [
	Colors.WHITE,
	Colors.LIGHT_GRAY,
	Colors.DARK_GRAY,
	Colors.BLACK,
];

export class MonochromePalette extends Palette implements IResettable {
	public constructor() {
		super(1);

		this.bytes[0] = 0b11100100;
	}

	public getValue(): number {
		return this.bytes[0];
	}

	public setValue(value: number): void {
		this.bytes[0] = value;
	}

	public getColor(index: number): Color {
		const value = (this.bytes[0] >> (index * 2)) & 3;

		return monochromeColors[value];
	}

	public reset(): void {
		this.bytes = new Uint8Array(this.bytes.length);
		this.bytes[0] = 0b11100100;
	}
}
