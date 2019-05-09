import {IHardwareBus} from '../../../Hardware';
import {fromTwosComplement} from '../../../Utility/number';
import {Instruction} from '../../Instruction';

/**
 * JR s8
 */
export class RelativeSigned8 extends Instruction {
	public constructor() {
		super(0x18, 'JR s8', 2, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers.programCounter += fromTwosComplement(hardware.memory.read(registers.programCounter));
	}
}
