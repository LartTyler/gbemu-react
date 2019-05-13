import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

export abstract class AbstractCall extends Instruction {
	protected process(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers.stackPointer -= 2;
		hardware.memory.writeWord(registers.stackPointer, registers.programCounter + 2);

		registers.programCounter = hardware.memory.readWord(registers.programCounter);
	}
}
