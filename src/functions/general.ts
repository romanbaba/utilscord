import emojiRegex from "emoji-regex";
import { error } from "../helpers/logger";

const regex = emojiRegex();

/** @param {string} text  */
export function captalize(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/** @param {string} text  */
export function turkishCharacterConversion(text: string) {
	const conversion = {
		'ğ': 'g',
		'ü': 'u',
		'ş': 's',
		'ı': 'i',
		'ö': 'o',
		'ç': 'c',
		'Ğ': 'G',
		'Ü': 'U',
		'Ş': 'S',
		'İ': 'I',
		'Ö': 'O',
		'Ç': 'C',
	};

	// @ts-ignore
	return text.replace(/[ğüşııöçĞÜŞİÖÇ]/g, letter => conversion[letter] || letter);
}

/**
 *
 * @param {string} str
 * @param {number} max
 * @returns
 */
export const trim = (str: string, max: number) =>
	str.length > max ? `${str.slice(0, max - 3)}...` : str;

/**
 *  @param {string} text
 *  @returns {string[]}
 */
export const findAndGetEmojis = (text: string): string[] => {
	const emojis: string[] = [];

	const defaultEmojis = text.match(regex) as string[];
	defaultEmojis && defaultEmojis.length && emojis.push(...defaultEmojis);

	const discordEmojis = text.match(/<a?:[a-z0-9_]+:[0-9]+>/gi) as string[];
	discordEmojis && discordEmojis.length && emojis.push(...discordEmojis);

	return emojis;
}

/**
 *  @param {string} emoji
 *  @returns
 */
export function getEmoji(emoji: string) {
	if(!(/<a?:[a-z0-9_]+:[0-9]+>/gi.test(emoji))) {
		error("This is not a Discord emoji");
	}

	const [ animated, name, id ] = emoji.slice(1).slice(0, -1).split(":");
	return {
		animated: animated === "a" ? true : false,
		name,
		id
	}
}