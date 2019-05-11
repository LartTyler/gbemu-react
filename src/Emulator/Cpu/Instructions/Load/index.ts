import {Address16FromStackPointer} from './Address16FromStackPointer';
import {Register16AddressFromRegister8} from './Register16AddressFromRegister8';
import {Register16AddressFromRegister8PostDecrement} from './Register16AddressFromRegister8PostDecrement';
import {Register16AddressFromRegister8PostIncrement} from './Register16AddressFromRegister8PostIncrement';
import {Register16AddressFromValue8} from './Register16AddressFromValue8';
import {Register16FromValue16} from './Register16FromValue16';
import {Register8FromRegister16Address} from './Register8FromRegister16Address';
import {Register8FromRegister16AddressPostDecrement} from './Register8FromRegister16AddressPostDecrement';
import {Register8FromRegister16AddressPostIncrement} from './Register8FromRegister16AddressPostIncrement';
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

	// LD r8, (r16)
	new Register8FromRegister16Address(0x0A, 'a', 'bc'),
	new Register8FromRegister16Address(0x1A, 'a', 'de'),

	// LD r16, n16
	new Register16FromValue16(0x01, 'bc'),
	new Register16FromValue16(0x11, 'de'),
	new Register16FromValue16(0x21, 'hl'),
	new Register16FromValue16(0x31, 'stackPointer'),

	// LD (r16), r8
	new Register16AddressFromRegister8(0x02, 'bc', 'a'),
	new Register16AddressFromRegister8(0x12, 'de', 'a'),

	// LD (r16), n8
	new Register16AddressFromValue8(0x36, 'hl'),

	// LD (PC), SP
	new Address16FromStackPointer(0x08),

	// LDI (r16), r8
	new Register16AddressFromRegister8PostIncrement(0x22, 'hl', 'a'),

	// LDI r8, (r16)
	new Register8FromRegister16AddressPostIncrement(0x2A, 'a', 'hl'),

	// LDD (r16), r8
	new Register16AddressFromRegister8PostDecrement(0x32, 'hl', 'a'),

	// LDD r8, (r16)
	new Register8FromRegister16AddressPostDecrement(0x3A, 'a', 'hl'),
];
