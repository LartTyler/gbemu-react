import {IHardwareBus} from '../Hardware';

export interface IStack {
	push(value: number): void;
	pop(): number;
}

export class Stack implements IStack {
	public constructor(protected hardware: IHardwareBus) {
	}

	public push(value: number): void {
		this.hardware.cpu.registers.stackPointer -= 2;
		this.hardware.memory.writeWord(this.hardware.cpu.registers.stackPointer, value);
	}

	public pop(): number {
		const value = this.hardware.memory.readWord(this.hardware.cpu.registers.stackPointer);
		this.hardware.cpu.registers.stackPointer += 2;

		return value;
	}
}
