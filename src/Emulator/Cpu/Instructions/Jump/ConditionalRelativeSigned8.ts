import {IHardwareBus} from '../../../Hardware';
import {fromTwosComplement} from '../../../Utility/number';
import {toFlagDisplayName} from '../../../Utility/string';
import {Instruction} from '../../Instruction';
import {RegisterFlag} from '../../Registers';

/**
 * JR cc, s8
 */
export class ConditionalRelativeSigned8 extends Instruction {
	public constructor(code: number, protected flag: RegisterFlag, protected requireSet: boolean) {
		super(code, `JR ${requireSet ? '' : 'N'}${toFlagDisplayName(flag)}`, 2);
	}

	protected invoke(hardware: IHardwareBus): void {
		hardware.cpu.clock += 2;

		const registers = hardware.cpu.registers;
		const flagSet = registers.flags & this.flag;

		const jump = fromTwosComplement(hardware.memory.read(registers.programCounter));

		// Only jump if:
		//     - The flag is set and this instruction requires the flag to be set
		//     - The flag is NOT set, and this instructions requires the flag NOT to be set
		if (this.requireSet && flagSet || !this.requireSet && flagSet === 0) {
			registers.programCounter += jump;

			hardware.cpu.clock += 1;
		}
	}
}
