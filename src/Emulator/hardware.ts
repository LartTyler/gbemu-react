import {Omit} from 'yargs';
import {ICartridge} from './Cartridge/Cartridge';

export interface IResettable {
	reset(): void;
}

export interface ICpuRegisters {
	a: number;
	b: number;
	c: number;
	d: number;
	e: number;
	flags: number;
	h: number;
	l: number;
	stackPointer: number;
	programCounter: number;
}

export interface ICpu extends IResettable {
	clock: number;

	readonly registers: ICpuRegisters;

	start(): void;
	pause(): void;
	step(): void;
}

export interface IMemory extends IResettable {
	loadCartridge(file: File): Promise<FileReader>;
	getCartridge(): ICartridge;
	read(address: number): number;
	readWord(address: number): number;
	write(address: number, value: number): void;
	writeWord(address: number, value: number): void;
}

export interface IHardwareBus extends IResettable {
	readonly cpu: ICpu;
	readonly memory: IMemory;
}

export interface IHardwareBusAware {
	setHardwareBus(hardware: IHardwareBus): void;
}

export class HardwareBus {
	public readonly cpu: ICpu;
	public readonly memory: IMemory;

	public constructor(cpu: ICpu, memory: IMemory) {
		this.cpu = cpu;
		this.memory = memory;

		if (isHardwareBusAware(cpu))
			cpu.setHardwareBus(this);

		if (isHardwareBusAware(memory))
			memory.setHardwareBus(this);
	}

	public reset(): void {
		this.cpu.reset();
		this.memory.reset();
	}
}

export const isHardwareBusAware = (value: any): value is IHardwareBusAware => {
	return typeof value === 'object' && 'setHardwareBus' in value;
};
