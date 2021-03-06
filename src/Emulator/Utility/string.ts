import {RegisterFlag} from '../Cpu/RegisterFlag';
import {CpuRegister} from '../Cpu/Registers';

export const lpad = (value: string, length: number, padChar: string = ' ') => {
	while (value.length < length)
		value = `${padChar}${value}`;

	return value;
};

export const fromBinary = (data: Uint8Array): string => String.fromCharCode(...data).replace(/\0/g, '');

export const toRegisterDisplayName = (register: CpuRegister) => {
	return register === 'stackPointer' ? register : register.toUpperCase();
};

export const toRegisterFlagDisplayName = (flag: RegisterFlag): string => {
	switch (flag) {
		case RegisterFlag.CARRY:
			return 'C';

		case RegisterFlag.HALF_CARRY:
			return 'H';

		case RegisterFlag.SUBTRACT:
			return 'N';

		case RegisterFlag.ZERO:
			return 'Z';
	}

	return 'X';
};
