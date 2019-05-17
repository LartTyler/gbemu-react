
import {RegisterFlag} from '../Cpu/RegisterFlag';
import {CpuRegister} from '../Cpu/Registers';

export const fromBinary = (data: Uint8Array): string => String.fromCharCode(...data).replace(/\0/g, '');

export const toRegisterDisplayName = (register: CpuRegister) => {
	return register === 'stackPointer' ? register : register.toUpperCase();
};
