import {Cartridge, ICartridge} from '../Cartridge/Cartridge';
import {IMemory} from '../Hardware';
import {from16Bit, to16Bit, toHex} from '../Utility/number';
import {bios} from './bios';

export const createNotAddressableError = (address: number): Error => new Error(`${toHex(address)} is not addressable`);
export const createNotWriteableError = (address: number): Error => new Error(`${toHex(address)} is not writeable`);

export enum MemoryRegion {
	BIOS,
	INTERRUPT_CONTROL,
	INTERRUPTS,
	CART_ROM,
	CART_RAM,
	VIDEO,
	GENERAL,
	ECHO,
	OAM,
	ZERO_PAGE,
	UNUSED,
}

export interface IRegionBoundry {
	region: MemoryRegion;
	start: number;
	stop: number;
}

export const regionBoundries: IRegionBoundry[] = [
	{
		region: MemoryRegion.INTERRUPTS,
		start: 0,
		stop: 0x00FF,
	},
	{
		region: MemoryRegion.CART_ROM,
		start: 0x0100,
		stop: 0x7FFF,
	},
	{
		region: MemoryRegion.VIDEO,
		start: 0x8000,
		stop: 0x9FFF,
	},
	{
		region: MemoryRegion.CART_RAM,
		start: 0xA000,
		stop: 0xBFFF,
	},
	{
		region: MemoryRegion.GENERAL,
		start: 0xC000,
		stop: 0xDFFF,
	},
	{
		region: MemoryRegion.ECHO,
		start: 0xE000,
		stop: 0xFDFF,
	},
	{
		region: MemoryRegion.OAM,
		start: 0xFE00,
		stop: 0xFE9F,
	},
	{
		region: MemoryRegion.ZERO_PAGE,
		start: 0xFF80,
		stop: 0xFFFE,
	},
	{
		region: MemoryRegion.INTERRUPT_CONTROL,
		start: 0xFFFF,
		stop: 0xFFFF,
	},
];

export class Memory implements IMemory {
	/**
	 * If `false`, reads below $0100 will read from the cart instead of from BIOS.
	 *
	 * This flag is switched the first time a read occurs at $0100.
	 */
	protected inBios: boolean = true;

	/**
	 * $FFFF
	 */
	protected interruptControl: number = 0;

	/**
	 * $0000 - $00FF (256b)
	 */
	protected interrupts: Uint8Array;

	/**
	 * $8000 - $9FFF (8k)
	 */
	protected video: Uint8Array;

	/**
	 * $C000 - $DFFF (8k)
	 * $E000 - $FDFF (Echo)
	 */
	protected general: Uint8Array;

	/**
	 * $FE00 - $FE9F (160b)
	 */
	protected oam: Uint8Array;

	/**
	 * $FF80 - $FFFE (127b)
	 */
	protected zeroPage: Uint8Array;

	protected cartridge: ICartridge = null;

	public constructor() {
		this.reset();
	}

	public getCartridge(): ICartridge {
		return this.cartridge;
	}

	public loadCartridge(file: File): Promise<FileReader> {
		const reader = new FileReader();

		return new Promise<FileReader>((resolve, reject) => {
			reader.addEventListener('load', () => {
				const rom = (reader.result as string).split('').map(char => char.charCodeAt(0));

				this.cartridge = new Cartridge(new Uint8Array(rom));

				resolve(reader);
			});

			reader.addEventListener('error', () => reject(reader.error));
			reader.addEventListener('abort', () => reject(null));

			reader.readAsBinaryString(file);
		});
	}

	public read(address: number): number {
		if (address === 0x100)
			this.inBios = false;

		const [region, mappedAddress] = this.getRegion(address);

		switch (region) {
			case MemoryRegion.BIOS:
				return bios[mappedAddress];

			case MemoryRegion.INTERRUPTS:
				return this.interrupts[mappedAddress];

			case MemoryRegion.CART_ROM:
			case MemoryRegion.CART_RAM:
				if (!this.cartridge)
					throw new Error('No cartridge inserted');

				return this.cartridge.read(mappedAddress);

			case MemoryRegion.VIDEO:
				return this.video[mappedAddress];

			case MemoryRegion.GENERAL:
			case MemoryRegion.ECHO:
				return this.general[mappedAddress];

			case MemoryRegion.OAM:
				return this.oam[mappedAddress];

			case MemoryRegion.ZERO_PAGE:
				return this.zeroPage[mappedAddress];
		}

		throw createNotAddressableError(address);
	}

	public write(address: number, value: number): void {
		if (address === 0x100)
			this.inBios = false;

		const [region, mappedAddress] = this.getRegion(address);

		switch (region) {
			case MemoryRegion.BIOS:
				throw createNotWriteableError(address);

			case MemoryRegion.INTERRUPTS:
				this.interrupts[mappedAddress] = value;

				break;

			case MemoryRegion.CART_ROM:
				throw createNotWriteableError(address);

			case MemoryRegion.CART_RAM:
				throw new Error('Game cart writing not implemented yet');

			case MemoryRegion.VIDEO:
				this.video[mappedAddress] = value;

				break;

			case MemoryRegion.GENERAL:
			case MemoryRegion.ECHO:
				this.general[mappedAddress] = value;

				break;

			case MemoryRegion.OAM:
				this.oam[mappedAddress] = value;

				break;

			case MemoryRegion.ZERO_PAGE:
				this.zeroPage[mappedAddress] = value;

				break;

			default:
				throw createNotAddressableError(address);
		}
	}

	public readWord(address: number): number {
		return to16Bit(this.read(address + 1), this.read(address));
	}

	public writeWord(address: number, value: number): void {
		const values = from16Bit(value);

		this.write(address, values.low);
		this.write(address + 1, values.high);
	}

	public reset(): void {
		this.inBios = true;
		this.interruptControl = 0;

		this.interrupts = new Uint8Array(256);
		this.video = new Uint8Array(8192);
		this.general = new Uint8Array(8192);
		this.oam = new Uint8Array(160);
		this.zeroPage = new Uint8Array(127);
	}

	/**
	 * Returns the region and mapped address that a given address belongs to.
	 *
	 * @param {number} address
	 * @returns {[MemoryRegion, number]}
	 */
	protected getRegion(address: number): [MemoryRegion, number] {
		if (this.inBios && address <= 0x00FF)
			return [MemoryRegion.BIOS, address];

		for (const item of regionBoundries) {
			if (address <= item.stop)
				return [item.region, address - item.start];
		}

		return [MemoryRegion.UNUSED, address];
	}
}
