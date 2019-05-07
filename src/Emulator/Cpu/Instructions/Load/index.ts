import {Register16AddressFromRegister8} from './Register16AddressFromRegister8';
import {Register16FromValue16} from './Register16FromValue16';

export const loadInstructions = [
	// LD r16, n16
	new Register16FromValue16(0x01, 'b', 'c'),
	new Register16FromValue16(0x11, 'd', 'e'),
	new Register16FromValue16(0x21, 'h', 'l'),
	new Register16FromValue16(0x31, 'stackPointer'),

	// LD (r16), r8
	new Register16AddressFromRegister8(0x02, 'b', 'c', 'a'),
	new Register16AddressFromRegister8(0x12, 'd', 'e', 'a'),
];
