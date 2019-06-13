export class Palette {
	protected bytes: Uint8Array;

	public constructor(bytes: number) {
		this.bytes = new Uint8Array(bytes);
	}

	public get(offset: number): number {
		return this.bytes[offset];
	}

	public set(offset: number, value: number): void {
		this.bytes[offset] = value & 0xFF;
	}
}
