import {IHardwareBus} from '../../../../Hardware';
import {from16Bit} from '../../../../Utility/number';
import {Instruction} from '../../../Instruction';

/**
 * POP AF
 */
export class AccumulatorAndFlags extends Instruction {
	public constructor() {
		super(0xF1, 'POP AF', 1, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		const {high: a, low: flags} = from16Bit(hardware.memory.readWord(registers.stackPointer));
		registers.stackPointer += 2;

		registers.a = a;
		registers.flags = flags;
	}
}
