import {IResettable} from '../../Hardware';
import {Color} from './Color';
import {from16BitColor} from './color-correction';
import {Palette} from './Palette';

export class ColorPalette extends Palette implements IResettable {
	public constructor() {
		super(64);
	}

	public getColor(paletteIndex: number, colorIndex: number): Color {
		const index = paletteIndex * 8 + colorIndex;

		return from16BitColor(this.bytes[index] + (this.bytes[index + 1] << 8));
	}

	public reset(): void {
		this.bytes = new Uint8Array(this.bytes.length);
	}
}
