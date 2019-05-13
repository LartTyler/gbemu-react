import {CompareRegister8AndRegister16Address} from './CompareRegister8AndRegister16Address';
import {CompareRegister8AndRegister8} from './CompareRegister8AndRegister8';
import {Register16AddressFromRegister8} from './Register16AddressFromRegister8';
import {Register16AddressFromRegister8Carry} from './Register16AddressFromRegister8Carry';
import {Register8FromRegister8} from './Register8FromRegister8';
import {Register8FromRegister8Carry} from './Register8FromRegister8Carry';
import {Value8FromRegister8} from './Value8FromRegister8';

export const subtractInstructions = [
	// SUB r8, r8
	new Register8FromRegister8(0x90, 'a', 'b'),
	new Register8FromRegister8(0x91, 'a', 'c'),
	new Register8FromRegister8(0x92, 'a', 'd'),
	new Register8FromRegister8(0x93, 'a', 'e'),
	new Register8FromRegister8(0x94, 'a', 'h'),
	new Register8FromRegister8(0x95, 'a', 'l'),
	new Register8FromRegister8(0x97, 'a', 'a'),

	// SUB r8, n8
	new Value8FromRegister8(0xD6, 'a'),

	// SUB r8, (r16)
	new Register16AddressFromRegister8(0x96, 'a', 'hl'),

	// SBC r8, r8
	new Register8FromRegister8Carry(0x98, 'a', 'b'),
	new Register8FromRegister8Carry(0x99, 'a', 'c'),
	new Register8FromRegister8Carry(0x9A, 'a', 'd'),
	new Register8FromRegister8Carry(0x9B, 'a', 'e'),
	new Register8FromRegister8Carry(0x9C, 'a', 'h'),
	new Register8FromRegister8Carry(0x9D, 'a', 'l'),
	new Register8FromRegister8Carry(0x9F, 'a', 'a'),

	// SBC r8, (r16)
	new Register16AddressFromRegister8Carry(0x9E, 'a', 'hl'),

	// CP r8, r8
	new CompareRegister8AndRegister8(0xB8, 'a', 'b'), // nice b8 m8
	new CompareRegister8AndRegister8(0xB9, 'a', 'c'),
	new CompareRegister8AndRegister8(0xBA, 'a', 'd'),
	new CompareRegister8AndRegister8(0xBB, 'a', 'e'),
	new CompareRegister8AndRegister8(0xBC, 'a', 'h'),
	new CompareRegister8AndRegister8(0xBD, 'a', 'l'),
	new CompareRegister8AndRegister8(0xBF, 'a', 'a'),

	// CP r8, (r16)
	new CompareRegister8AndRegister16Address(0xBE, 'a', 'hl'),
];
