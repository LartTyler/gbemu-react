import {Register16ToRegister16} from './Register16ToRegister16';

export const addInstructions = [
	// ADD r16, r16
	new Register16ToRegister16(0x09, 'hl', 'bc'),
	new Register16ToRegister16(0x19, 'hl', 'de'),
	new Register16ToRegister16(0x29, 'hl', 'hl'),
	new Register16ToRegister16(0x39, 'hl', 'stackPointer'),
];
