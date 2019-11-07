/**
 * Gets the pitch classes from chord elements.
 *
 * Note that the pitch classes here extend until 23, while the conventional pitch classes are only up to 11.
 * This is in relation to the reference pitch so that extended chords can be accommodated.
 *
 * @param third - The third degree. Valid values are from [-2, 1].
 * @param fifth - The fifth degree. Valid values are from [-1, 1].
 * @param seventh - The seventh degree. Valid values are from [-1, 1] or `null`, where 0 means a dominant seventh.
 * @param ninth - The ninth degree. Valid values are from [-1, 1] or `null`.
 * @param eleventh - The eleventh degree. Valid values are from [0, 1] or `null`.
 * @param thirteenth - The thirteenth degree. If set to `true`, chord has thirteenth element, else chord will have no
 * thirteenth element.
 * @returns Number[] - The pitch classes.
 */
export default (third, fifth, { seventh = null, ninth = null, eleventh = null } = {}, thirteenth = false) => {
	const pitchClasses = [0, 4 + third, 7 + fifth]

	if (typeof seventh === 'number' && -1 <= seventh && seventh <= 1) {
		pitchClasses.push(10 + seventh)
	}

	if (typeof ninth === 'number' && -1 <= ninth && ninth <= 1) {
		pitchClasses.push(14 + ninth)
	}

	if (typeof eleventh === 'number' && 0 <= eleventh && eleventh <= 1) {
		pitchClasses.push(17 + eleventh)
	}

	if (thirteenth === true) {
		pitchClasses.push(21)
	}

	return pitchClasses
}
