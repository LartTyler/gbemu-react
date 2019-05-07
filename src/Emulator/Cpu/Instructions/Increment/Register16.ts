import {IHardwareBus} from '../../../hardware';
import {from16Bit, to16Bit} from '../../../Utility/number';
import {CpuRegister} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * INC r16
 */
export class Register16 extends Instruction {
	protected high: CpuRegister;
	protected low: CpuRegister;

	public constructor(code: number, high: CpuRegister, low?: CpuRegister) {
		if (high !== 'stackPointer' && !low)
			throw new Error('Only the stackPointer can be used as a standalone 16-bit register');

		super(code, `INC ${high === 'stackPointer' ? 'SP' : high}${low}`, 1, 2);

		this.high = high;
		this.low = low;
	}

	public invoke(hardware: IHardwareBus): void {
		const registers = hardware.cpu.registers;

		if (this.high === 'stackPointer')
			registers.stackPointer = (registers.stackPointer + 1) & 0xFFFF;
		else {
			const values = from16Bit((to16Bit(registers[this.high], registers[this.low]) + 1) & 0xFFFF);

			registers[this.high] = values.high;
			registers[this.low] = values.low;
		}
	}
}
