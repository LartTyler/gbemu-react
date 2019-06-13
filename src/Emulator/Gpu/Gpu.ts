import {IGpu, IHardwareBus, IHardwareBusAware} from '../Hardware';
import {LcdMode, LcdStatus} from './LcdStatus';
import {Color} from './Palette/Color';

export interface IPalette {
	get(index: number): Color;

}

export class Gpu implements IGpu, IHardwareBusAware {
	public control: number = 0;
	public status: number = 0;
	public currentLine: number = 0;
	public currentLineCompare: number = 0;
	public scrollY: number = 0;
	public scrollX: number = 0;
	public windowY: number = 0;
	public windowX: number = 7;

	protected hardware: IHardwareBus;

	protected clock: number = 0;

	public setHardwareBus(hardware: IHardwareBus): void {
		this.hardware = hardware;

		this.reset();
	}

	public tick(): void {
		this.clock += this.hardware.cpu.clock.delta;

		switch (this.status & LcdStatus.MODE) {
			case LcdMode.HBLANK:
				if (this.clock >= 51) {
					if (this.currentLine === 143) {
						// TODO
					}
				}
		}
	}

	public reset(): void {
		this.hardware.memory.write(0xFF41, LcdMode.OAM_SEARCH);
		this.clock = 0;
	}
}
