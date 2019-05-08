import {IHardwareBus} from '../../../Hardware';
import {RegisterFlag} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * RLA
 */
export class RegisterALeftCarry extends Instruction {
	public constructor(code: number) {
		super(code, 'RLA', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		const highBit = registers.a & 0x80; // Mask off every bit except the MSB
		registers.a = (registers.a << 1) & 0xFF;

		if (registers.flags & RegisterFlag.CARRY)
			registers.a += 1;

		if (highBit)
			registers.flags = RegisterFlag.CARRY;
		else
			registers.flags = 0;
	}
}
