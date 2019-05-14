import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

export class InterruptReturn extends Instruction {
	public constructor() {
		super(0xD9, 'RETI', 1, 4);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.memory.interrupts.enabled = true;
		hardware.cpu.registers.programCounter = hardware.memory.stack.pop();
	}
}
