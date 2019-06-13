import {ICartridge} from '../Cartridge/Cartridge';
import {Clock} from '../Cpu/Clock';
import {EventDispatcher} from '../Events/EventDispatcher';
import {LcdMode} from '../Gpu/LcdStatus';
import {Interrupts} from '../Memory/Interrupts';
import {IStack} from '../Memory/Stack';

export interface IResettable {
	reset(): void;
}

export const isResettable = (value: any): value is IResettable => {
	return typeof value === 'object' && 'reset' in value;
};

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
	readonly clock: Clock;
	readonly registers: ICpuRegisters;

	start(): void;
	stop(): void;
	step(): void;

	setTickRate(delay: number): void;
	isRunning(): boolean;
}

export interface IMemory extends IResettable {
	readonly stack: IStack;
	readonly interrupts: Interrupts;

	loadCartridge(file: File): Promise<FileReader>;
	getCartridge(): ICartridge;
	setCartridge(cartridge: ICartridge): void;
	read(address: number): number;
	readWord(address: number): number;
	write(address: number, value: number): void;
	writeWord(address: number, value: number): void;
}

export interface IGpu extends IResettable {
	control: number;
	status: number;
	scrollY: number;
	scrollX: number;
	currentLine: number;
	currentLineCompare: number;
	windowY: number;
	windowX: number;

	tick(): void;
}

export interface IHardwareBus extends IResettable {
	readonly cpu: ICpu;
	readonly memory: IMemory;
	readonly gpu: IGpu;
	readonly eventDispatcher: EventDispatcher;
}

export interface IHardwareBusAware {
	setHardwareBus(hardware: IHardwareBus): void;
}

export const isHardwareBusAware = (value: any): value is IHardwareBusAware => {
	return typeof value === 'object' && 'setHardwareBus' in value;
};
