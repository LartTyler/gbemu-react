export enum Interrupt {
	VBLANK = 1,
	LCD = 2,
	TIMER = 4,
	SERIAL = 8,
	JOYPAD = 16,
}

export const interruptVectors: { [key in Interrupt]: number } = {
	[Interrupt.VBLANK]: 0x40,
	[Interrupt.LCD]: 0x48,
	[Interrupt.TIMER]: 0x50,
	[Interrupt.SERIAL]: 0x58,
	[Interrupt.JOYPAD]: 0x60,
};

export class Interrupts {
	public enabled: boolean;
	public flags: number;

	public constructor() {
		this.reset();
	}

	public getNextInterrupt(): Interrupt {
		for (const interrupt of Object.values(Interrupts) as number[]) {
			if (interrupt & this.flags)
				return interrupt;
		}

		return null;
	}

	public reset(): void {
		this.enabled = true;
		this.flags = 0;
	}
}
