import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

/**
 * JP n16
 */
export class Value16 extends Instruction {
	public constructor() {
		super(0xC3, 'JP n16', 3, 4);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers.programCounter = hardware.memory.readWord(registers.programCounter);
	}
}
