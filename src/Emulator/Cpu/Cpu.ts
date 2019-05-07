import {ICpu, ICpuRegisters, IHardwareBus, IHardwareBusAware} from '../hardware';
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
		throw new Error('Cpu.pause() not implemented yet');
	}

	public start(): void {
		throw new Error('Cpu.start() not implemented yet');
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

		operator.invoke(this.hardware);

		throw new Error('Cpu.step() not fully implemented yet');
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
}
