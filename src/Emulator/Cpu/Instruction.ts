import {IHardwareBus} from '../Hardware';

export abstract class Instruction {
	public readonly code: number;
	public readonly duration: number;
	public readonly length: number;
	public readonly mnemonic: string;

	protected constructor(code: number, mnemonic: string, length: number, duration: number = null) {
		this.code = code;
		this.mnemonic = mnemonic;
		this.duration = duration;
		this.length = length;
	}

	public execute(hardware: IHardwareBus): void {
		const programCounter = hardware.cpu.registers.programCounter;

		this.invoke(hardware);

		// Only update PC automatically if it wasn't modified during instruction execution, and length is greater than
		// the default 1 byte that every instruction must occupy.
		if (hardware.cpu.registers.programCounter === programCounter && this.length > 1)
			hardware.cpu.registers.programCounter += this.length - 1;

		// Only update the CPU clock automatically if it wasn't modified during instruction execution.
		if (hardware.cpu.clock.delta === 0 && this.duration !== null)
			hardware.cpu.clock.total += this.duration;
	}

	protected abstract invoke(hardware: IHardwareBus): void;
}
