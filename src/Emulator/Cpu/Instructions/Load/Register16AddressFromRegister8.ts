import {IHardwareBus} from '../../../hardware';
import {to16Bit} from '../../../Utility/number';
import {CpuRegister} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * LD (r16), r8
 */
export class Register16AddressFromRegister8 extends Instruction {
	protected high: CpuRegister;
	protected low: CpuRegister;
	protected source: CpuRegister;

	public constructor(code: number, high: CpuRegister, low: CpuRegister, source: CpuRegister = 'a') {
		super(code, `LD (${high}${low}), ${source}`, 1, 2);

		this.high = high;
		this.low = low;
		this.source = source;
	}

	public invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		hardware.memory.write(to16Bit(registers[this.high], registers[this.low]), registers[this.source]);
	}
}
