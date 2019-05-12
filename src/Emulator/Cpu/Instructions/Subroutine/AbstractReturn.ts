import {IHardwareBus} from '../../../Hardware';
import {Instruction} from '../../Instruction';

export type ReturnConditionTest = (flags: number) => boolean;

export abstract class AbstractReturn extends Instruction {
	protected process(hardware: IHardwareBus, condition?: ReturnConditionTest): void {
		const registers = hardware.cpu.registers;

		if (condition) {
			hardware.cpu.clock += 2;

			if (!condition(registers.flags))
				return;

			hardware.cpu.clock += 3;
		} else
			hardware.cpu.clock += 4;

		registers.programCounter = hardware.memory.readWord(registers.stackPointer);
		registers.stackPointer += 2;
	}
}
