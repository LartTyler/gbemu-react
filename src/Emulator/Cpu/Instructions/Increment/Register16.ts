import {IHardwareBus} from '../../../Hardware';
import {from16Bit, to16Bit} from '../../../Utility/number';
import {CpuRegister} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * INC r16
 */
export class Register16 extends Instruction {
	public constructor(code: number, protected high: CpuRegister, protected low: CpuRegister) {
		super(code, `INC ${high === 'stackPointer' ? 'SP' : high.toUpperCase()}${(low || '').toUpperCase()}`, 1, 2);

		if (high !== 'stackPointer' && !low)
			throw new Error('Only the stackPointer can be used as a standalone 16-bit register');
	}

	protected invoke(hardware: IHardwareBus): void {
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
