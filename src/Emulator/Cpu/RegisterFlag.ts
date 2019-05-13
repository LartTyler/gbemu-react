export enum RegisterFlag {
	CARRY = 0x10,
	HALF_CARRY = 0x20,
	SUBTRACT = 0x40,
	ZERO = 0x80,
}

export type RegisterFlagSetTest = 'Z' | 'C';
export type RegisterFlagUnsetTest = 'NZ' | 'NC';
export type RegisterFlagTest = RegisterFlagSetTest | RegisterFlagUnsetTest;

export const isRegisterFlagUnsetTest = (value: RegisterFlagTest): value is RegisterFlagUnsetTest => {
	return value.charAt(0) === 'N';
};

export const getTestedRegisterValue = (test: RegisterFlagTest): number => {
	const char = test.charAt(test.length - 1);

	if (char === 'Z')
		return RegisterFlag.ZERO;
	else
		return RegisterFlag.CARRY;
};

export const isRegisterFlagTestSatisfied = (flags: number, test: RegisterFlagTest): boolean => {
	const result = flags & getTestedRegisterValue(test);

	if (isRegisterFlagUnsetTest(test))
		return result === 0;
	else
		return result > 0;
};
