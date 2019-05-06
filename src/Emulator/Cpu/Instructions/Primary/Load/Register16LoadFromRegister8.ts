import {IHardwareBus} from '../../../../hardware';
import {from16Bit} from '../../../../Utility/number';
import {CpuRegister} from '../../../Cpu';
import {Instruction} from '../../../Instruction';

export class Register16LoadFromRegister8 extends Instruction {
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
		const values = from16Bit(hardware.cpu.registers[this.source]);

		hardware.cpu.registers[this.high] = values.high;
		hardware.cpu.registers[this.low] = values.low;
	}
}
