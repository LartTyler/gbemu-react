// Values and algorithm adapted from https://github.com/LIJI32/SameBoy/blob/master/Core/display.c#L169

import {Color} from './Color';

export const channelCurve = [
	0,
	2,
	4,
	7,
	12,
	18,
	25,
	34,
	42,
	52,
	62,
	73,
	85,
	97,
	109,
	121,
	134,
	146,
	158,
	170,
	182,
	193,
	203,
	213,
	221,
	230,
	237,
	243,
	248,
	251,
	253,
	255,
];

export const from16BitColor = (value: number): Color => {
	const r = channelCurve[value & 0x1F];
	const g = channelCurve[(value >> 5) & 0x1F];
	const b = channelCurve[(value >> 10) & 0x1F];

	return new Color(r, (g * 3 + b) / 4, b);
};
