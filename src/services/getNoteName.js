export default ({ accidentalBias, hardAccidentalBias, }) => notes => selectedKey => {
	const pitchNoteNames = notes.split(';')
	const baseKey = selectedKey % 12
	const names = pitchNoteNames[baseKey].split(',')
	const accidentalBiasNumber = Number(accidentalBias)
	let nameIndex = 4 - (accidentalBiasNumber + 2)
	if (names[nameIndex].length < 1) {
		if (accidentalBiasNumber === -2) {
			nameIndex = 3
		} else if (accidentalBiasNumber === 2) {
			nameIndex = 1
		} else if (names[2].length < 1) {
			nameIndex += accidentalBias.startsWith('-') ? 1 : -1
		} else {
			nameIndex = 2
		}
	}

	if (
		hardAccidentalBias &&
		(((accidentalBiasNumber === 1 || accidentalBiasNumber === -1) && names[2].length > 0) ||
			((accidentalBiasNumber === 2 && nameIndex === 1) || (accidentalBiasNumber === -2 && nameIndex === 3)))
	) {
		nameIndex = 2
	}

	if (names[nameIndex].length < 1) {
		if (accidentalBiasNumber === -2) {
			nameIndex = 3
		} else if (accidentalBiasNumber === 2) {
			nameIndex = 1
		}
	}

	return names[nameIndex]
}
