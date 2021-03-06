import {IHardwareBus} from '../../../../../Hardware';
import {Instruction} from '../../../../Instruction';
import {BitPosition, CpuRegister8} from '../../../../Registers';

/**
 * RES b, r8
 */
export class Register8 extends Instruction {
	public constructor(code: number, protected target: CpuRegister8, protected position: BitPosition) {
		super(code, `RES ${position}, r8`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		registers[this.target] = registers[this.target] & ~(1 << this.position);
	}
}
