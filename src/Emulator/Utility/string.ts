import {CpuRegister, RegisterFlag} from '../Cpu/Cpu';

export const fromBinary = (data: Uint8Array): string => String.fromCharCode(...data).replace(/\0/g, '');

export const toRegisterDisplayName = (register: CpuRegister) => {
	return register === 'stackPointer' ? register : register.toUpperCase();
};

export const toFlagDisplayName = (flag: RegisterFlag): string => {
	switch (flag) {
		case RegisterFlag.CARRY:
			return 'C';

		case RegisterFlag.ZERO:
			return 'Z';

		case RegisterFlag.HALF_CARRY:
			return 'H';

		case RegisterFlag.SUBTRACT:
			return 'N';
	}
};
