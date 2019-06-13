export class Clock {
	protected value: number = 0;
	protected valueDelta: number = 0;

	get total(): number {
		return this.value;
	}

	set total(value: number) {
		this.valueDelta += value - this.value;
		this.value = value;
	}

	get delta(): number {
		return this.valueDelta;
	}

	public next() {
		this.valueDelta = 0;
	}

	public reset() {
		this.value = 0;
		this.valueDelta = 0;
	}
}
