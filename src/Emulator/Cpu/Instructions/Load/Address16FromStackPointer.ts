import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

/**
 * LD (PC), SP
 */
export class Address16FromStackPointer extends Instruction {
	public constructor(code: number) {
		super(code, 'LD (PC), SP', 3, 5);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.memory.writeWord(hardware.cpu.registers.programCounter, hardware.cpu.registers.stackPointer);
	}
}
