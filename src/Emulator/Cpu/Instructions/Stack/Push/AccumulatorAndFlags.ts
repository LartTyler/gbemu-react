import {IHardwareBus} from '../../../../Hardware';
import {to16Bit} from '../../../../Utility/number';
import {Instruction} from '../../../Instruction';

/**
 * PUSH AF
 */
export class AccumulatorAndFlags extends Instruction {
	public constructor() {
		super(0xF5, 'PUSH AF', 1, 4);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		hardware.memory.stack.push(to16Bit(registers.a, registers.flags));
	}
}
