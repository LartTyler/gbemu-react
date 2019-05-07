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
		this.invoke(hardware);

		hardware.cpu.registers.programCounter += this.length;

		if (this.duration !== null)
			hardware.cpu.clock += this.duration;
	}

	protected abstract invoke(hardware: IHardwareBus): void;
}
