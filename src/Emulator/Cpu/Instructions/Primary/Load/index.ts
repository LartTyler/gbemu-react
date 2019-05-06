import {Register16LoadFromRegister8} from './Register16LoadFromRegister8';
import {Register16LoadFromValue16} from './Register16LoadFromValue16';

export const loadInstructions = [
	new Register16LoadFromValue16(0x01, 'b', 'c'),
	new Register16LoadFromValue16(0x11, 'd', 'e'),
	new Register16LoadFromValue16(0x21, 'h', 'l'),
	new Register16LoadFromValue16(0x31, 'stackPointer'),

	new Register16LoadFromRegister8(0x02, 'b', 'c', 'a'),
	new Register16LoadFromRegister8(0x12, 'd', 'e', 'a'),
];
