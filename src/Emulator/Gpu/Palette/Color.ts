export class Color {
	public readonly r: number;
	public readonly g: number;
	public readonly b: number;

	public constructor(r: number, g: number, b: number) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	public get hex(): string {
		return `${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`.toUpperCase();
	}
}

export const Colors = {
	BLACK: new Color(0, 0, 0),
	DARK_GRAY: new Color(10, 10, 10),
	LIGHT_GRAY: new Color(20, 20, 20),
	WHITE: new Color(31, 31, 31),
};
