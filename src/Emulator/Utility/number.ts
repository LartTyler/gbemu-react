export const toHex = (value: number, prefix: boolean = true): string => {
	let output = value.toString(16);

	if (output.length % 2 !== 0)
		output = `0${output}`;

	output = output.toUpperCase();

	if (prefix)
		output = `0x${output}`;

	return output;
};

export const toBinary = (value: number, prefix: boolean = true): string => {
	let output = value.toString(2);
	const mod = output.length % 4;

	if (mod !== 0)
		output = '0'.repeat(4 - mod) + output;

	if (prefix)
		output = `0b${output}`;

	return output;
};

export const from16Bit = (value: number): {high: number, low: number} => {
	return {
		high: value >> 8 & 255,
		low: value & 0xFF,
	};
};

export const to16Bit = (high: number, low: number): number => {
	return (high << 8) + low;
};
