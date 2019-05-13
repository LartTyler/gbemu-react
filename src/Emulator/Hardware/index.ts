import {ICartridge} from '../Cartridge/Cartridge';
import {IStack} from '../Memory/Stack';

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

	bc: number;
	de: number;
	hl: number;
}

export interface ICpu extends IResettable {
	clock: number;

	readonly registers: ICpuRegisters;

	start(): void;
	stop(): void;
	step(): void;
}

export interface IMemory extends IResettable {
	readonly stack: IStack;

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

export const isHardwareBusAware = (value: any): value is IHardwareBusAware => {
	return typeof value === 'object' && 'setHardwareBus' in value;
};
