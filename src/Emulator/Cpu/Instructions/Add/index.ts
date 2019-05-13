import {Register16AddressToRegister8} from './Register16AddressToRegister8';
import {Register16AddressToRegister8Carry} from './Register16AddressToRegister8Carry';
import {Register16ToRegister16} from './Register16ToRegister16';
import {Register8ToRegister8} from './Register8ToRegister8';
import {Register8ToRegister8Carry} from './Register8ToRegister8Carry';
import {Value8ToRegister8} from './Value8ToRegister8';

export const addInstructions = [
	// ADD r8, r8
	new Register8ToRegister8(0x80, 'a', 'b'),
	new Register8ToRegister8(0x81, 'a', 'c'),
	new Register8ToRegister8(0x82, 'a', 'd'),
	new Register8ToRegister8(0x83, 'a', 'e'),
	new Register8ToRegister8(0x84, 'a', 'h'),
	new Register8ToRegister8(0x85, 'a', 'l'),
	new Register8ToRegister8(0x87, 'a', 'a'),

	// ADD r16, r16
	new Register16ToRegister16(0x09, 'hl', 'bc'),
	new Register16ToRegister16(0x19, 'hl', 'de'),
	new Register16ToRegister16(0x29, 'hl', 'hl'),
	new Register16ToRegister16(0x39, 'hl', 'stackPointer'),

	// ADD r8, (r16)
	new Register16AddressToRegister8(0x86, 'a', 'hl'),

	// ADD r8, n8
	new Value8ToRegister8(0xC6, 'a'),

	// ADC r8, r8
	new Register8ToRegister8Carry(0x88, 'a', 'b'),
	new Register8ToRegister8Carry(0x89, 'a', 'c'),
	new Register8ToRegister8Carry(0x8A, 'a', 'd'),
	new Register8ToRegister8Carry(0x8B, 'a', 'e'),
	new Register8ToRegister8Carry(0x8C, 'a', 'h'),
	new Register8ToRegister8Carry(0x8D, 'a', 'l'),
	new Register8ToRegister8Carry(0x8F, 'a', 'a'),

	// ADC r8, (r16)
	new Register16AddressToRegister8Carry(0x8E, 'a', 'hl'),
];
