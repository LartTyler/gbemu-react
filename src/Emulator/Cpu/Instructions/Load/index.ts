import {Register16AddressFromRegister8} from './Register16AddressFromRegister8';
import {Register16FromValue16} from './Register16FromValue16';
import {Register8FromValue8} from './Register8FromValue8';

export const loadInstructions = [
	// LD r8, n8
	new Register8FromValue8(0x06, 'b'),
	new Register8FromValue8(0x0E, 'c'),
	new Register8FromValue8(0x16, 'd'),
	new Register8FromValue8(0x1E, 'e'),
	new Register8FromValue8(0x26, 'h'),
	new Register8FromValue8(0x2E, 'l'),
	new Register8FromValue8(0x3E, 'a'),

	// LD r16, n16
	new Register16FromValue16(0x01, 'b', 'c'),
	new Register16FromValue16(0x11, 'd', 'e'),
	new Register16FromValue16(0x21, 'h', 'l'),
	new Register16FromValue16(0x31, 'stackPointer'),

	// LD (r16), r8
	new Register16AddressFromRegister8(0x02, 'b', 'c', 'a'),
	new Register16AddressFromRegister8(0x12, 'd', 'e', 'a'),
];
