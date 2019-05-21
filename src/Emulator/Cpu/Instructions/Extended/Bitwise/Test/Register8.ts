import {IHardwareBus} from '../../../../../Hardware';
import {BitPosition, CpuRegister8} from '../../../../Registers';
import {AbstractBitTest} from './AbstractBitTest';

export class Register8 extends AbstractBitTest {
	public constructor(code: number, protected target: CpuRegister8, protected position: BitPosition) {
		super(code, `BIT ${position}, ${target.toUpperCase()}`, 1, 1);
	}

	protected invoke(hardware: IHardwareBus): void {
		this.process(hardware.cpu.registers, hardware.cpu.registers[this.target], this.position);
	}
}
