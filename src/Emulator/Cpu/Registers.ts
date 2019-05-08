/* tslint:disable:variable-name */

import {ICpuRegisters} from '../Hardware';
import {from16Bit, to16Bit} from '../Utility/number';

export class Registers implements ICpuRegisters {
	public flags: number = 0;

	protected _a: number = 0;
	protected _b: number = 0;
	protected _c: number = 0;
	protected _d: number = 0;
	protected _e: number = 0;
	protected _h: number = 0;
	protected _l: number = 0;

	protected _programCounter: number = 0;
	protected _stackPointer: number = 0;

	public get a(): number {
		return this._a;
	}

	public set a(value: number) {
		this._a = value & 0xFF;
	}

	public get b(): number {
		return this._b;
	}

	public set b(value: number) {
		this._b = value & 0xFF;
	}

	public get c(): number {
		return this._c;
	}

	public set c(value: number) {
		this._c = value & 0xFF;
	}

	public get d(): number {
		return this._d;
	}

	public set d(value: number) {
		this._d = value & 0xFF;
	}

	public get e(): number {
		return this._e;
	}

	public set e(value: number) {
		this._e = value & 0xFF;
	}

	public get h(): number {
		return this._h;
	}

	public set h(value: number) {
		this._h = value & 0xFF;
	}

	public get l(): number {
		return this._l;
	}

	public set l(value: number) {
		this._l = value & 0xFF;
	}

	public get programCounter(): number {
		return this._programCounter;
	}

	public set programCounter(value: number) {
		this._programCounter = value & 0xFFFF;
	}

	public get stackPointer(): number {
		return this._stackPointer;
	}

	public set stackPointer(value: number) {
		this._stackPointer = value & 0xFFFF;
	}

	public get bc(): number {
		return to16Bit(this.b, this.c);
	}

	public set bc(value: number) {
		({high: this.b, low: this.c} = from16Bit(value & 0xFFFF));
	}

	public get de(): number {
		return to16Bit(this.d, this.e);
	}

	public set de(value: number) {
		({high: this.d, low: this.e} = from16Bit(value & 0xFFFF));
	}

	public get hl(): number {
		return to16Bit(this.h, this.l);
	}

	public set hl(value: number) {
		({high: this.h, low: this.l} = from16Bit(value & 0xFFFF));
	}

	public reset(): void {
		this._a = 0;
		this._b = 0;
		this._c = 0;
		this._d = 0;
		this._e = 0;
		this._h = 0;
		this._l = 0;
		this._programCounter = 0;
		this._stackPointer = 0;
		this.flags = 0;
	}
}
