import {CpuRegister} from '../Cpu/Cpu';

export const fromBinary = (data: Uint8Array): string => String.fromCharCode(...data).replace(/\0/g, '');

export const toRegisterDisplayName = (register: CpuRegister) => {
	return register === 'stackPointer' ? register : register.toUpperCase();
};
