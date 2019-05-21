import {IHardwareBus} from '../../../../../Hardware';
import {toRegisterDisplayName} from '../../../../../Utility/string';
import {Instruction} from '../../../../Instruction';
import {BitPosition, CpuRegister16} from '../../../../Registers';

/**
 * RES b, (r16)
 */
export class Register16Address extends Instruction {
	public constructor(code: number, protected pointer: CpuRegister16, protected position: BitPosition) {
		super(code, `RES ${position}, (${toRegisterDisplayName(pointer)})`, 1, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		const value = hardware.memory.read(registers[this.pointer]);

		hardware.memory.write(registers[this.pointer], value & ~(1 << this.position));
	}
}
