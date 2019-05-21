import {CpuTickEvent} from '../../../Events/Cpu/CpuTickEvent';
import {IHardwareBus} from '../../../Hardware';
import {toHex} from '../../../Utility/number';
import {Instruction} from '../../Instruction';
import {extendedInstructions} from '../index';

/**
 * PREFIX CB
 */
export class Prefix extends Instruction {
	public constructor() {
		super(0xCB, 'PREFIX CB', 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		const opcode = hardware.memory.read(registers.programCounter++);

		const instruction = extendedInstructions.get(opcode);

		hardware.eventDispatcher.dispatch(
			new CpuTickEvent(hardware.cpu, registers.programCounter - 1, instruction, true),
		);

		if (!instruction) {
			hardware.cpu.stop();

			throw new Error(
				`Instruction 0xCB ${toHex(opcode)} is not implemented (at ${registers.programCounter - 2})`,
			);
		}

		instruction.execute(hardware);
	}
}
