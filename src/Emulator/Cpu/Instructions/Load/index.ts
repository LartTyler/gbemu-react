import {Address16FromStackPointer} from './Address16FromStackPointer';
import {Register16AddressFromRegister8} from './Register16AddressFromRegister8';
import {Register16AddressFromRegister8PostDecrement} from './Register16AddressFromRegister8PostDecrement';
import {Register16AddressFromRegister8PostIncrement} from './Register16AddressFromRegister8PostIncrement';
import {Register16AddressFromValue8} from './Register16AddressFromValue8';
import {Register16FromValue16} from './Register16FromValue16';
import {Register8AddressHighOffsetFromRegister8} from './Register8AddressHighOffsetFromRegister8';
import {Register8FromRegister16Address} from './Register8FromRegister16Address';
import {Register8FromRegister16AddressPostDecrement} from './Register8FromRegister16AddressPostDecrement';
import {Register8FromRegister16AddressPostIncrement} from './Register8FromRegister16AddressPostIncrement';
import {Register8FromRegister8} from './Register8FromRegister8';
import {Register8FromValue8} from './Register8FromValue8';
import {Value8HighOffsetFromRegister8} from './Value8HighOffsetFromRegister8';

export const loadInstructions = [
	// LD r8, n8
	new Register8FromValue8(0x06, 'b'),
	new Register8FromValue8(0x0E, 'c'),
	new Register8FromValue8(0x16, 'd'),
	new Register8FromValue8(0x1E, 'e'),
	new Register8FromValue8(0x26, 'h'),
	new Register8FromValue8(0x2E, 'l'),
	new Register8FromValue8(0x3E, 'a'),

	// LD r8, r8
	new Register8FromRegister8(0x40, 'b', 'b'),
	new Register8FromRegister8(0x41, 'b', 'c'),
	new Register8FromRegister8(0x42, 'b', 'd'),
	new Register8FromRegister8(0x43, 'b', 'e'),
	new Register8FromRegister8(0x44, 'b', 'h'),
	new Register8FromRegister8(0x45, 'b', 'l'),
	new Register8FromRegister8(0x47, 'b', 'a'),
	new Register8FromRegister8(0x48, 'c', 'b'),
	new Register8FromRegister8(0x49, 'c', 'c'),
	new Register8FromRegister8(0x4A, 'c', 'd'),
	new Register8FromRegister8(0x4B, 'c', 'e'),
	new Register8FromRegister8(0x4C, 'c', 'h'),
	new Register8FromRegister8(0x4D, 'c', 'l'),
	new Register8FromRegister8(0x4F, 'c', 'a'),
	new Register8FromRegister8(0x50, 'd', 'b'),
	new Register8FromRegister8(0x51, 'd', 'c'),
	new Register8FromRegister8(0x52, 'd', 'd'),
	new Register8FromRegister8(0x53, 'd', 'e'),
	new Register8FromRegister8(0x54, 'd', 'h'),
	new Register8FromRegister8(0x55, 'd', 'l'),
	new Register8FromRegister8(0x57, 'd', 'a'),
	new Register8FromRegister8(0x58, 'e', 'b'),
	new Register8FromRegister8(0x59, 'e', 'c'),
	new Register8FromRegister8(0x5A, 'e', 'd'),
	new Register8FromRegister8(0x5B, 'e', 'e'),
	new Register8FromRegister8(0x5C, 'e', 'h'),
	new Register8FromRegister8(0x5D, 'e', 'l'),
	new Register8FromRegister8(0x5F, 'e', 'a'),
	new Register8FromRegister8(0x60, 'h', 'b'),
	new Register8FromRegister8(0x61, 'h', 'c'),
	new Register8FromRegister8(0x62, 'h', 'd'),
	new Register8FromRegister8(0x63, 'h', 'e'),
	new Register8FromRegister8(0x64, 'h', 'h'),
	new Register8FromRegister8(0x65, 'h', 'l'),
	new Register8FromRegister8(0x67, 'h', 'a'),
	new Register8FromRegister8(0x68, 'l', 'b'),
	new Register8FromRegister8(0x69, 'l', 'c'),
	new Register8FromRegister8(0x6A, 'l', 'd'),
	new Register8FromRegister8(0x6B, 'l', 'e'),
	new Register8FromRegister8(0x6C, 'l', 'h'),
	new Register8FromRegister8(0x6D, 'l', 'l'),
	new Register8FromRegister8(0x6F, 'l', 'a'),
	new Register8FromRegister8(0x78, 'a', 'b'),
	new Register8FromRegister8(0x79, 'a', 'c'),
	new Register8FromRegister8(0x7A, 'a', 'd'),
	new Register8FromRegister8(0x7B, 'a', 'e'),
	new Register8FromRegister8(0x7C, 'a', 'h'),
	new Register8FromRegister8(0x7D, 'a', 'l'),
	new Register8FromRegister8(0x7F, 'a', 'a'),

	// LD r8, (r16)
	new Register8FromRegister16Address(0x0A, 'a', 'bc'),
	new Register8FromRegister16Address(0x1A, 'a', 'de'),
	new Register8FromRegister16Address(0x46, 'b', 'hl'),
	new Register8FromRegister16Address(0x4E, 'c', 'hl'),
	new Register8FromRegister16Address(0x56, 'd', 'hl'),
	new Register8FromRegister16Address(0x5E, 'e', 'hl'),
	new Register8FromRegister16Address(0x66, 'h', 'hl'),
	new Register8FromRegister16Address(0x6E, 'l', 'hl'),
	new Register8FromRegister16Address(0x7E, 'a', 'hl'),

	// LD r16, n16
	new Register16FromValue16(0x01, 'bc'),
	new Register16FromValue16(0x11, 'de'),
	new Register16FromValue16(0x21, 'hl'),
	new Register16FromValue16(0x31, 'stackPointer'),

	// LD (r16), r8
	new Register16AddressFromRegister8(0x02, 'bc', 'a'),
	new Register16AddressFromRegister8(0x12, 'de', 'a'),
	new Register16AddressFromRegister8(0x70, 'hl', 'b'),
	new Register16AddressFromRegister8(0x71, 'hl', 'c'),
	new Register16AddressFromRegister8(0x72, 'hl', 'd'),
	new Register16AddressFromRegister8(0x73, 'hl', 'e'),
	new Register16AddressFromRegister8(0x74, 'hl', 'h'),
	new Register16AddressFromRegister8(0x75, 'hl', 'l'),
	new Register16AddressFromRegister8(0x77, 'hl', 'a'),

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

	// LDH (n8), r8
	new Value8HighOffsetFromRegister8(0xE0, 'a'),

	// LDH (r8), r8
	new Register8AddressHighOffsetFromRegister8(0xE2, 'c', 'a'),
];
