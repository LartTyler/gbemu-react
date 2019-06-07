import {IGpu, IHardwareBus, IHardwareBusAware, isResettable} from '../Hardware';
import {Color, Colors} from './Color';

export interface IPalette {
	get(index: number): Color;

}

export class Gpu implements IGpu, IHardwareBusAware {
	protected hardware: IHardwareBus;

	public setHardwareBus(hardware: IHardwareBus): void {
		this.hardware = hardware;
	}

	public tick(): void {
		// noop
	}

	public reset(): void {
	}
}
