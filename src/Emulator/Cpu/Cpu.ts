import {ICpu, IHardwareBus, IHardwareBusAware} from '../Hardware';
import {toHex} from '../Utility/number';
import {instructions} from './Instructions';
import {Registers} from './Registers';

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

		/**
		 * Note: additional clock and PC updates are handled by {@see Instruction}.
		 */
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
