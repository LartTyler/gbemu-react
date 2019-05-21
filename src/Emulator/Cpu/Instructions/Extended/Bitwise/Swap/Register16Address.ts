import {IHardwareBus} from '../../../../../Hardware';
import {toRegisterDisplayName} from '../../../../../Utility/string';
import {CpuRegister16} from '../../../../Registers';
import {Abstract8BitSwap} from './Abstract8BitSwap';

/**
 * SWAP (r16)
 */
export class Register16Address extends Abstract8BitSwap {
	public constructor(code: number, protected pointer: CpuRegister16) {
		super(code, `SWAP (${toRegisterDisplayName(pointer)})`, 1, 3);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;
		const value = this.process(registers, hardware.memory.read(registers[this.pointer]));

		hardware.memory.write(registers[this.pointer], value);
	}
}
