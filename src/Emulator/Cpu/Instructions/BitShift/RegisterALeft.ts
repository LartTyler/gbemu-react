import {IHardwareBus} from '../../../Hardware';
import {RegisterFlag} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * RLCA
 */
export class RegisterALeft extends Instruction {
	public constructor(code: number) {
		super(code, 'RLCA', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		const highBit = registers.a & 0x80; // Mask off every bit except the MSB
		registers.a = registers.a << 1;

		if (highBit) {
			registers.a += 1;
			registers.flags = RegisterFlag.CARRY;
		} else
			registers.flags = 0;
	}
}
