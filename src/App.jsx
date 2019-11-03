import * as React from 'react'
import styled from 'styled-components'
import MusicalKeyboard from 'react-musical-keyboard'

const Container = styled('div')({
	width: '100%',
	maxWidth: 720,
	margin: '0 auto',
	padding: '0 1rem',
	'@media (min-width: 1080px)': {
		maxWidth: 1080,
	},
})

const Layout = styled('div')({
	display: 'grid',
	gridGap: '1rem',
	gridTemplateAreas: `
		'note-name     chord           inversion'
		'naming-system accidental-bias hard-accidental-bias'
		'keyboard      keyboard        keyboard'
	`,
	gridTemplateColumns: '2fr 1fr 1fr',
})

const NoteName = styled('div')({
	gridArea: 'note-name',
	display: 'grid',
	placeContent: 'center',
	fontSize: '4rem',
	height: '8rem',
})

const Chord = styled('div')({
	gridArea: 'chord',
})

const Inversion = styled('div')({
	gridArea: 'inversion',
})

const NamingSystem = styled('div')({
	gridArea: 'naming-system',
})

const AccidentalBias = styled('div')({
	gridArea: 'accidental-bias',
})

const HardAccidentalBias = styled('div')({
	gridArea: 'hard-accidental-bias',
})

const KeyboardContainer = styled('div')({
	height: '20vw',
	gridArea: 'keyboard',
})

const Hidden = styled('span')({
	position: 'absolute',
	left: -999999,
	width: 1,
	height: 1,
})

const ToggleButton = styled('span')({
	display: 'inline-grid',
	placeContent: 'center',
	padding: '0.5rem 1rem',
	border: '1px solid',
	'input:checked + &': {
		color: 'var(--color-primary)',
	},
})

const DropdownSelect = styled('select')({
	appearance: 'none',
	borderRadius: 0,
	font: 'inherit',
	padding: '0.5rem 1rem',
	backgroundColor: 'transparent',
	borderColor: 'currentColor',
	color: 'inherit',
})

const Label = styled('span')({
	'::after': {
		content: '""',
		display: 'block',
	},
})

const Fieldset = styled('fieldset')({
	display: 'contents',
})

const pr = new Intl.PluralRules('en-PH', { type: 'ordinal' })
const ORDINAL_SUFFIXES = {
	other: 'th',
	one: 'st',
	two: 'nd',
	few: 'rd',
}

const App = ({ chordDictionary, noteNameSystems }) => {
	const [chord, setChord] = React.useState(null)
	const [chordName, setChordName] = React.useState(null)
	const [inversions, setInversions] = React.useState([])
	const [inversion, setInversion] = React.useState(0)
	const [selectedKey, setSelectedKey] = React.useState(48)
	const [keysOn, setKeysOn] = React.useState([])
	const [keysOnNames, setKeysOnNames] = React.useState([])
	const [noteNames, setNoteNames] = React.useState(null)
	const [noteName, setNoteName] = React.useState(null)
	const [accidentalBias, setAccidentalBias] = React.useState(1)
	const [hardAccidentalBias, setHardAccidentalBias] = React.useState(false)

	const handleInversionChange = e => {
		setInversion(Number(e.target.value))
	}

	const handleChordChange = e => {
		setChord(e.target.value)
	}

	const handleNoteNameSystemChange = e => {
		setNoteNames(e.target.value)
	}

	const handleAccidentalBiasChange = e => {
		setAccidentalBias(Number(e.target.value))
	}

	const handleHardAccidentalBiasChange = e => {
		setHardAccidentalBias(e.target.checked)
	}

	const handleKeyOn = e => {
		const { note } = e.target.value
		setInversion(0)
		setSelectedKey(note)
	}

	React.useEffect(() => {
		const { [noteNames]: theNoteNames = null } = noteNameSystems
		if (theNoteNames !== null) {
			const { notes } = theNoteNames
			const pitchNoteNames = notes.split(';')
			const baseKey = selectedKey % 12
			const names = pitchNoteNames[baseKey].split(',')
			let nameIndex = 4 - (accidentalBias + 2)
			if (names[nameIndex].length < 1) {
				if (names[2].length < 1) {
					nameIndex += Math.sign(accidentalBias)
				} else {
					nameIndex = 2
				}
			}

			if (!hardAccidentalBias && (accidentalBias === -1 || accidentalBias === 1) && names[2].length > 0) {
				nameIndex = 2
			}

			setNoteName(names[nameIndex])
		}
	}, [selectedKey, accidentalBias, hardAccidentalBias, noteNameSystems, noteNames])

	React.useEffect(() => {
		const { [chord]: theChord = null } = chordDictionary
		if (theChord !== null) {
			const { symbol } = theChord
			setChordName(`${noteName}${symbol}`)
		}
	}, [chord, chordDictionary, noteName])

	React.useEffect(() => {
		const { [chord]: theChord = null } = chordDictionary
		if (theChord !== null) {
			const { notes } = theChord
			setInversions(
				notes.map((n, i) => {
					if (i === 0) {
						return 'Root'
					}
					return `${i}${ORDINAL_SUFFIXES[pr.select(i)]} Inversion`
				}),
			)
			setKeysOn(notes.map((n, i) => (i < inversion ? selectedKey + n + 12 : selectedKey + n)))
		}
	}, [selectedKey, chord, inversion, chordDictionary])

	React.useEffect(() => {
		const { [noteNames]: theNoteNames = null } = noteNameSystems
		if (theNoteNames !== null) {
			const { notes } = theNoteNames
			const pitchNoteNames = notes.split(';')

			setKeysOnNames(
				keysOn.map(selectedKey => {
					const baseKey = selectedKey % 12
					const names = pitchNoteNames[baseKey].split(',')
					let nameIndex = 4 - (accidentalBias + 2)
					if (names[nameIndex].length < 1) {
						if (names[2].length < 1) {
							nameIndex += Math.sign(accidentalBias)
						} else {
							nameIndex = 2
						}
					}
					return names[nameIndex]
				}),
			)
		}
	}, [keysOn, accidentalBias, noteNameSystems, noteNames])

	React.useEffect(() => {
		const [firstChord] = Object.keys(chordDictionary)
		setChord(firstChord)

		const [firstNoteNameSystem] = Object.keys(noteNameSystems)
		setNoteNames(firstNoteNameSystem)
	}, [chordDictionary, noteNameSystems])

	console.log(keysOnNames)

	return (
		<Container>
			<h1>Chords</h1>
			<Layout>
				<Chord>
					<label>
						<Label>Chord</Label>
						<DropdownSelect value={chord} onChange={handleChordChange}>
							{Object.entries(chordDictionary).map(([value, chord]) => (
								<option key={value} value={value}>
									{chord.name}
								</option>
							))}
						</DropdownSelect>
					</label>
				</Chord>
				<Inversion>
					<label>
						<Label>Inversion</Label>
						<DropdownSelect onChange={handleInversionChange} value={inversion}>
							{inversions.map((name, i) => (
								<option key={name} value={i}>
									{name}
								</option>
							))}
						</DropdownSelect>
					</label>
				</Inversion>
				<AccidentalBias>
					<Fieldset>
						<legend>Accidental bias</legend>
						<label>
							<Hidden
								as="input"
								name="accidentalBias"
								type="radio"
								value={-2}
								checked={accidentalBias === -2}
								onChange={handleAccidentalBiasChange}
							/>
							<ToggleButton>
								<Hidden>Double Flat</Hidden>
								<span aria-hidden="true">𝄫</span>
							</ToggleButton>
						</label>
						<label>
							<Hidden
								as="input"
								name="accidentalBias"
								type="radio"
								value={-1}
								checked={accidentalBias === -1}
								onChange={handleAccidentalBiasChange}
							/>
							<ToggleButton>
								<Hidden>Flat</Hidden>
								<span aria-hidden="true">♭</span>
							</ToggleButton>
						</label>
						<label>
							<Hidden
								as="input"
								name="accidentalBias"
								type="radio"
								value={1}
								checked={accidentalBias === 1}
								onChange={handleAccidentalBiasChange}
							/>
							<ToggleButton>
								<Hidden>Sharp</Hidden>
								<span aria-hidden="true">♯</span>
							</ToggleButton>
						</label>
						<label>
							<Hidden
								as="input"
								name="accidentalBias"
								type="radio"
								value={2}
								checked={accidentalBias === 2}
								onChange={handleAccidentalBiasChange}
							/>
							<ToggleButton>
								<Hidden>Double Sharp</Hidden>
								<span aria-hidden="true">𝄪</span>
							</ToggleButton>
						</label>
					</Fieldset>
				</AccidentalBias>
				<HardAccidentalBias>
					<label>
						<Hidden
							as="input"
							name="hardAccidentalBias"
							type="checkbox"
							checked={hardAccidentalBias}
							onChange={handleHardAccidentalBiasChange}
						/>
						<ToggleButton>Display accidentals on natural notes</ToggleButton>
					</label>
				</HardAccidentalBias>
				<NamingSystem>
					<label>
						<Label>Pitch Naming</Label>
						<DropdownSelect onChange={handleNoteNameSystemChange} value={noteNames}>
							{Object.entries(noteNameSystems).map(([value, noteNameSystem]) => (
								<option key={value} value={value}>
									{noteNameSystem.name}
								</option>
							))}
						</DropdownSelect>
					</label>
				</NamingSystem>
				<NoteName>
					<span
						dangerouslySetInnerHTML={{
							__html: chordName,
						}}
					/>
				</NoteName>
				<KeyboardContainer>
					<MusicalKeyboard
						startKey={48}
						endKey={83}
						style={{
							height: '100%',
							outline: 'none',
						}}
						naturalKeyStyle={pressed => ({
							backgroundColor: pressed ? 'var(--color-primary)' : 'white',
						})}
						accidentalKeyStyle={pressed => ({
							backgroundColor: pressed ? 'var(--color-primary)' : 'currentColor',
						})}
						onKeyOn={handleKeyOn}
						keysOn={keysOn}
					/>
				</KeyboardContainer>
			</Layout>
		</Container>
	)
}

export default App
