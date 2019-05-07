import {IHardwareBus} from '../../../hardware';
import {from16Bit} from '../../../Utility/number';
import {CpuRegister} from '../../Cpu';
import {Instruction} from '../../Instruction';

/**
 * LD r16, n16
 */
export class Register16FromValue16 extends Instruction {
	public constructor(code: number, protected high: CpuRegister, protected low?: CpuRegister) {
		super(code, `LD ${high === 'stackPointer' ? 'SP' : high.toUpperCase()}${(low || '').toUpperCase()}, n16`, 3, 3);

		if (high !== 'stackPointer' && !low)
			throw new Error('Only the stackPointer register can be used as a standalone 16-bit register');
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
