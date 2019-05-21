import {IHardwareBus} from '../../../../../Hardware';
import {CpuRegister8} from '../../../../Registers';
import {Abstract8BitSwap} from './Abstract8BitSwap';

/**
 * SWAP r8
 */
export class Register8 extends Abstract8BitSwap {
	public constructor(code: number, protected target: CpuRegister8) {
		super(code, `SWAP ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = this.process(registers, registers[this.target]);
	}
}
