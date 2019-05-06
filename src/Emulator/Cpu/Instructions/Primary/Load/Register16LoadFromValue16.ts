import {IHardwareBus} from '../../../../hardware';
import {from16Bit} from '../../../../Utility/number';
import {CpuRegister} from '../../../Cpu';
import {Instruction} from '../../../Instruction';

export class Register16LoadFromValue16 extends Instruction {
	protected high: CpuRegister;
	protected low: CpuRegister;

	public constructor(code: number, high: CpuRegister, low?: CpuRegister) {
		if (high !== 'stackPointer' && !low)
			throw new Error('Only the stackPointer register can be used as a standalone 16-bit register');

		super(code, `LD ${high === 'stackPointer' ? 'SP' : high}${low}, n16`, 3, 3);

		this.high = high;
		this.low = low;
	}

	public invoke(hardware: IHardwareBus): void {
		if (this.high === 'stackPointer')
			hardware.cpu.registers.stackPointer = hardware.memory.readWord(hardware.cpu.registers.programCounter);
		else {
			const values = from16Bit(hardware.memory.readWord(hardware.cpu.registers.programCounter));

			hardware.cpu.registers[this.high] = values.high;
			hardware.cpu.registers[this.low] = values.low;
		}
	}
}
