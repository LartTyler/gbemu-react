import {IResettable} from '../../Hardware';
import {ColorPalette} from './ColorPalette';

export class ColorPaletteManager implements IResettable {
	public readonly background: ColorPalette;
	public readonly foreground: ColorPalette;

	public constructor() {
		this.background = new ColorPalette();
		this.foreground = new ColorPalette();
	}

	public reset(): void {
		this.background.reset();
		this.foreground.reset();
	}
}
