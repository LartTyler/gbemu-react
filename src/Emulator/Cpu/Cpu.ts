import {ICpu, ICpuRegisters, IHardwareBus, IHardwareBusAware} from '../Hardware';
import {toHex} from '../Utility/number';
import {instructions} from './Instructions';
import {Registers} from './Registers';

export enum RegisterFlag {
	CARRY = 0x10,
	HALF_CARRY = 0x20,
	SUBTRACT = 0x40,
	ZERO = 0x80,
}

export type CpuRegister8 = 'a' | 'b' | 'c' | 'd' | 'e' | 'h' | 'l';
export type CpuRegister16 = 'stackPointer' | 'bc' | 'de' | 'hl';
export type CpuRegister = CpuRegister8 | CpuRegister16;

export class Cpu implements ICpu, IHardwareBusAware {
	public readonly registers: Registers;

	public clock: number = 0;

	protected hardware: IHardwareBus;

	protected halt: boolean = true;
	protected tickIntervalId: number = null;

	public constructor() {
		this.registers = new Registers();
	}

	public stop(): void {
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
			this.stop();

			throw new Error(
				`Instruction ${toHex(opcode)} is not implemented (at ${this.registers.programCounter})`,
			);
		}

		operator.execute(this.hardware);
	}

	public reset(): void {
		this.clock = 0;

		this.registers.reset();
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
