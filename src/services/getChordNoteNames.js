export default ({ accidentalBias, }) => notes => {
	const pitchNoteNames = notes.split(';')
	return keysOn => {
		keysOn.map(chordKey => {
			const baseKey = chordKey % 12
			const names = pitchNoteNames[baseKey].split(',')
			const accidentalBiasNumber = Number(accidentalBias)
			let nameIndex = 4 - (accidentalBiasNumber + 2)

			if (accidentalBiasNumber === -2) {
				if (names[3].length > 0) {
					nameIndex = 3
				} else if (names[4].length > 0) {
					nameIndex = 4
				}
			} else if (accidentalBiasNumber === -1) {
				if (names[3].length > 0) {
					nameIndex = 3
				} else {
					nameIndex = 2
				}
			} else if (accidentalBiasNumber === 1) {
				if (names[1].length > 0) {
					nameIndex = 1
				} else {
					nameIndex = 2
				}
			} else if (accidentalBiasNumber === 2) {
				if (names[1].length > 0) {
					nameIndex = 1
				} else if (names[0].length > 0) {
					nameIndex = 0
				}
			}
			return names[nameIndex]
		})
	}
}
