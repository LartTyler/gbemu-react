import {CpuTickEvent} from '../Events/Cpu/CpuTickEvent';
import {ICpu, IHardwareBus, IHardwareBusAware} from '../Hardware';
import {interruptVectors} from '../Memory/Interrupts';
import {toHex} from '../Utility/number';
import {instructions} from './Instructions';
import {Registers} from './Registers';

export class Cpu implements ICpu, IHardwareBusAware {
	public readonly registers: Registers;

	public clock: number = 0;

	protected hardware: IHardwareBus;

	protected halt: boolean = true;
	protected tickIntervalId: number = null;

	protected tickRate: number = 0;

	public constructor() {
		this.registers = new Registers();
	}

	public stop(): void {
		this.halt = true;

		if (this.tickIntervalId) {
			window.clearTimeout(this.tickIntervalId);

			this.tickIntervalId = null;
		}
	}

	public start(): void {
		this.halt = false;

		this.frame();
	}

	public step(): void {
		if (this.hardware.memory.interrupts.enabled) {
			const interrupt = this.hardware.memory.interrupts.getNextInterrupt();

			if (interrupt !== null) {
				this.hardware.memory.stack.push(this.registers.programCounter);
				this.registers.programCounter = interruptVectors[interrupt];

				this.hardware.memory.interrupts.enabled = false;
				this.hardware.memory.interrupts.flags &= ~interrupt;

				// At this point, we're ready to enter an interrupt. The value of PC before the interrupt has been
				// pushed onto the stack (to be popped off later by a `RET` or `RETI` instruction), interrupts have
				// been disabled (though nested interrupts may be enabled later by a `EI` instruction, and the interrupt
				// that we're handling has been masked off.
				//
				// The next instruction to execute (in the code below) will be the instruction at the interrupt vector.
			}
		}

		const opcode = this.hardware.memory.read(this.registers.programCounter++);
		const operator = instructions.get(opcode);

		this.hardware.eventDispatcher.dispatch(new CpuTickEvent(this, this.registers.programCounter - 1, operator));

		if (!operator) {
			this.stop();

			throw new Error(
				`Instruction ${toHex(opcode)} is not implemented (at ${this.registers.programCounter - 1})`,
			);
		}

		/**
		 * Note: additional clock and PC updates are handled by {@see Instruction}.
		 */
		operator.execute(this.hardware);
	}

	public reset(): void {
		this.clock = 0;
		this.halt = true;

		if (this.tickIntervalId) {
			window.clearTimeout(this.tickIntervalId);

			this.tickIntervalId = null;
		}

		this.registers.reset();
	}

	public setTickRate(delay: number): void {
		this.tickRate = delay;
	}

	public setHardwareBus(hardware: IHardwareBus): void {
		this.hardware = hardware;
	}

	protected frame(): void {
		const frameClock = this.clock + 17556;

		do {
			this.step();

			if (this.halt) {
				this.tickIntervalId = null;

				return;
			}
		} while (this.tickRate <= 1 && this.clock < frameClock);

		this.tickIntervalId = window.setTimeout(() => this.frame(), Math.max(this.tickRate, 1));
	}
}
