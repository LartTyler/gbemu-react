import {IHardwareBus} from '../../../hardware';
import {to16Bit} from '../../../Utility/number';
import {CpuRegister} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * LD (r16), r8
 */
export class Register16AddressFromRegister8 extends Instruction {
	public constructor(
		code: number,
		protected high: CpuRegister,
		protected low: CpuRegister,
		protected source: CpuRegister = 'a',
	) {
		super(code, `LD (${high.toUpperCase()}${low.toUpperCase()}), ${source.toUpperCase()}`, 1, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		hardware.memory.write(to16Bit(registers[this.high], registers[this.low]), registers[this.source]);
	}
}
