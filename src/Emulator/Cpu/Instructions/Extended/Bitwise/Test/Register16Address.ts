import {IHardwareBus} from '../../../../../Hardware';
import {toRegisterDisplayName} from '../../../../../Utility/string';
import {BitPosition, CpuRegister16} from '../../../../Registers';
import {AbstractBitTest} from './AbstractBitTest';

/**
 * BIT b, (r16)
 */
export class Register16Address extends AbstractBitTest {
	public constructor(code: number, protected pointer: CpuRegister16, protected position: BitPosition) {
		super(code, `BIT ${position}, ${toRegisterDisplayName(pointer)}`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		this.process(registers, hardware.memory.read(registers[this.pointer]), this.position);
	}
}
