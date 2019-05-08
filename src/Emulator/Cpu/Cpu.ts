import {ICpu, ICpuRegisters, IHardwareBus, IHardwareBusAware} from '../Hardware';
import {toHex} from '../Utility/number';
import {instructions} from './Instructions';

export enum RegisterFlag {
	CARRY = 0x10,
	HALF_CARRY = 0x20,
	SUBTRACT = 0x40,
	ZERO = 0x80,
}

export type CpuRegister = 'a' | 'b' | 'c' | 'd' | 'e' | 'h' | 'l' | 'stackPointer';

export class Cpu implements ICpu, IHardwareBusAware {
	public readonly registers: ICpuRegisters;

	public clock: number = 0;

	protected hardware: IHardwareBus;

	protected halt: boolean = true;
	protected tickIntervalId: number = null;

	public constructor() {
		this.registers = {
			a: 0,
			b: 0,
			c: 0,
			d: 0,
			e: 0,
			flags: 0,
			h: 0,
			l: 0,
			programCounter: 0,
			stackPointer: 0,
		};
	}

	public pause(): void {
		this.halt = true;
	}

	public start(): void {
		this.halt = false;

		this.frame();
	}

	public step(): void {
		const opcode = this.hardware.memory.read(this.registers.programCounter++);
		const operator = instructions.get(opcode);

		if (!operator) {
			this.pause();

			throw new Error(
				`Instruction ${toHex(opcode)} is not implemented (at ${this.registers.programCounter & 0xFFFF})`,
			);
		}

		this.registers.programCounter &= 0xFFFF;

		operator.execute(this.hardware);
	}

	public reset(): void {
		this.clock = 0;
		this.registers.a = 0;
		this.registers.b = 0;
		this.registers.c = 0;
		this.registers.d = 0;
		this.registers.flags = 0;
		this.registers.e = 0;
		this.registers.h = 0;
		this.registers.l = 0;
		this.registers.programCounter = 0;
		this.registers.stackPointer = 0;
	}

	public setHardwareBus(hardware: IHardwareBus): void {
		this.hardware = hardware;
	}

	protected frame(): void {
		this.tickIntervalId = null;

		const frameClock = this.clock + 17556;

		do {
			this.step();

			if (this.halt)
				return;
		} while (this.clock < frameClock);

		this.tickIntervalId = window.setTimeout(() => this.frame(), 1);
	}
}
