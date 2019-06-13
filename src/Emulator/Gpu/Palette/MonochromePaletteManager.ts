import {IResettable} from '../../Hardware';
import {MonochromePalette} from './MonochromePalette';

export class MonochromePaletteManager implements IResettable {
	public readonly background: MonochromePalette;
	public readonly foreground1: MonochromePalette;
	public readonly foreground2: MonochromePalette;

	public constructor() {
		this.background = new MonochromePalette();
		this.foreground1 = new MonochromePalette();
		this.foreground2 = new MonochromePalette();
	}

	public reset() {
		this.background.reset();
		this.foreground1.reset();
		this.foreground2.reset();
	}
}
