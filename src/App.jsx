import * as React from 'react'
import styled from 'styled-components'
import MusicalKeyboard from 'react-musical-keyboard'
import WaveSoundGenerator from './services/WaveSoundGenerator'

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
		'naming-system   naming-system'
		'chord           inversion'
		'accidental-bias accidental-bias'
		'note-name       note-name'
		'controls        controls'
		'keyboard        keyboard'
	`,
	marginBottom: '10rem',
	gridTemplateColumns: '4fr 3fr',
	'@media (min-width: 720px)': {
		gridTemplateAreas: `
			'naming-system chord     inversion'
			'note-name     note-name accidental-bias'
			'note-name     note-name controls'
			'keyboard      keyboard  keyboard'
		`,
		gridTemplateColumns: '2fr 4fr 3fr',
		marginBottom: 0,
	},
})

const NoteName = styled('div')({
	gridArea: 'note-name',
	display: 'flex',
	alignItems: 'flex-end',
	lineHeight: 1.5,
	fontSize: '3rem',
	height: '4rem',
	'@media (min-width: 1080px)': {
		fontSize: '4rem',
		height: 'auto',
	},
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

const KeyboardContainer = styled('div')({
	position: 'fixed',
	bottom: 0,
	left: 0,
	overflow: 'scroll',
	gridArea: 'keyboard',
	height: '10rem',
	width: '100%',
	'@media (min-width: 720px)': {
		height: '20vw',
		width: 'auto',
		position: 'relative',
	},
})

const KeyboardScrollContent = styled('div')({
	height: '100%',
	width: '100rem',
	'@media (min-width: 720px)': {
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
	},
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
	whiteSpace: 'nowrap',
	padding: '0.5rem 1rem',
	border: '1px solid',
	font: 'inherit',
	color: 'inherit',
	outline: 0,
	width: '100%',
	textTransform: 'uppercase',
	fontSize: '0.75rem',
	fontWeight: 'bold',
	backgroundColor: 'transparent',
	'button&:active': {
		color: 'var(--color-primary)',
	},
	'input:checked + &': {
		color: 'var(--color-primary)',
	},
})

const AccidentalToggleButton = styled(ToggleButton)({
	border: 0,
	padding: 0,
	width: `${100 / 5}%`,
	height: '2rem',
	fontSize: '2rem',
	fontWeight: 'normal',
})

const DropdownSelect = styled('select')({
	appearance: 'none',
	borderRadius: 0,
	font: 'inherit',
	padding: '0.5rem 1rem',
	backgroundColor: 'transparent',
	borderColor: 'currentColor',
	color: 'inherit',
	width: '100%',
})

const Label = styled('span')({
	textTransform: 'uppercase',
	fontSize: '0.75rem',
	'::after': {
		content: '""',
		display: 'block',
		borderBottom: '2px solid',
		margin: '4px 0',
	},
})

const Controls = styled('div')({
	gridArea: 'controls',
	textAlign: 'right',
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

const App = ({ chordDictionary = [], noteNameSystems = {} }) => {
	const [chord, setChord] = React.useState(null)
	const [chordName, setChordName] = React.useState(null)
	const [inversions, setInversions] = React.useState([])
	const [inversion, setInversion] = React.useState(0)
	const [selectedKey, setSelectedKey] = React.useState(48)
	const [keysOn, setKeysOn] = React.useState([])
	const [playing, setPlaying] = React.useState(false)
	const [keysOnNames, setKeysOnNames] = React.useState([])
	const [noteNames, setNoteNames] = React.useState(null)
	const [noteName, setNoteName] = React.useState(null)
	const [accidentalBias, setAccidentalBias] = React.useState('1')
	const [hardAccidentalBias, setHardAccidentalBias] = React.useState(true)
	const generator = React.useRef(new WaveSoundGenerator())

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
		setAccidentalBias(e.target.value)
	}

	const handleHardAccidentalBiasChange = e => {
		setHardAccidentalBias(e.target.checked)
	}

	const handleKeyOn = e => {
		const { note } = e.target.value
		setInversion(0)
		setSelectedKey(note)
	}

	const play = () => {
		setPlaying(true)
	}

	React.useEffect(() => {
		const { [noteNames]: theNoteNames = null } = noteNameSystems
		if (theNoteNames !== null) {
			const { notes } = theNoteNames
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

			setNoteName(names[nameIndex])
		}
	}, [selectedKey, accidentalBias, hardAccidentalBias, noteNameSystems, noteNames])

	React.useEffect(() => {
		const [theChord = null] = chordDictionary.filter(d => d.name === chord)
		if (theChord !== null) {
			const { symbol } = theChord
			setChordName(`${noteName}${symbol}`)
		}
	}, [chord, chordDictionary, noteName])

	React.useEffect(() => {
		const { current } = generator
		keysOn.forEach(k => {
			if (playing) {
				current.soundOn(k, 4, 440 * (2 ** (1 / 12)) ** (k - 69))
			} else {
				current.soundOff(k)
			}
		})
		if (playing) {
			setTimeout(() => {
				setPlaying(false)
			}, 500)
		}
	}, [keysOn, generator, playing])

	React.useEffect(() => {
		const [theChord = null] = chordDictionary.filter(d => d.name === chord)
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
			setPlaying(true)
		}
	}, [selectedKey, chord, inversion, chordDictionary])

	React.useEffect(() => {
		const { [noteNames]: theNoteNames = null } = noteNameSystems
		if (theNoteNames !== null) {
			const { notes } = theNoteNames
			const pitchNoteNames = notes.split(';')

			setKeysOnNames(
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
				}),
			)
		}
	}, [keysOn, accidentalBias, noteNameSystems, noteNames, noteName, selectedKey])

	React.useEffect(() => {
		const [firstChord] = chordDictionary
		setChord(firstChord.name)

		const [firstNoteNameSystem] = Object.keys(noteNameSystems)
		setNoteNames(firstNoteNameSystem)
	}, [chordDictionary, noteNameSystems])

	React.useEffect(() => {
		const { current } = generator
		current.changeSound(3)
	}, [generator])

	return (
		<Container>
			<h1>Chords</h1>
			<Layout>
				<Chord>
					<label>
						<Label>Chord</Label>
						<DropdownSelect value={chord} onChange={handleChordChange}>
							{chordDictionary.map(({ name, notes }) => (
								<option
									key={notes
										.sort((a, b) => a - b)
										.map(n => n.toString())
										.join(',')}
									value={name}
								>
									{name}
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
						<Label as="legend">Accidental bias</Label>
						<label>
							<Hidden
								as="input"
								name="accidentalBias"
								type="radio"
								value="-2"
								checked={accidentalBias === '-2'}
								onChange={handleAccidentalBiasChange}
							/>
							<AccidentalToggleButton>
								<Hidden>Double Flat</Hidden>
								<span aria-hidden="true">𝄫</span>
							</AccidentalToggleButton>
						</label>
						<label>
							<Hidden
								as="input"
								name="accidentalBias"
								type="radio"
								value="-1"
								checked={accidentalBias === '-1'}
								onChange={handleAccidentalBiasChange}
							/>
							<AccidentalToggleButton>
								<Hidden>Flat</Hidden>
								<span aria-hidden="true">♭</span>
							</AccidentalToggleButton>
						</label>
						<label>
							<Hidden
								as="input"
								name="hardAccidentalBias"
								type="checkbox"
								checked={hardAccidentalBias}
								onChange={handleHardAccidentalBiasChange}
							/>
							<AccidentalToggleButton>
								<Hidden>Force Natural Names</Hidden>
								<span aria-hidden="true">♮</span>
							</AccidentalToggleButton>
						</label>
						<label>
							<Hidden
								as="input"
								name="accidentalBias"
								type="radio"
								value="1"
								checked={accidentalBias === '1'}
								onChange={handleAccidentalBiasChange}
							/>
							<AccidentalToggleButton>
								<Hidden>Sharp</Hidden>
								<span aria-hidden="true">♯</span>
							</AccidentalToggleButton>
						</label>
						<label>
							<Hidden
								as="input"
								name="accidentalBias"
								type="radio"
								value="2"
								checked={accidentalBias === '2'}
								onChange={handleAccidentalBiasChange}
							/>
							<AccidentalToggleButton>
								<Hidden>Double Sharp</Hidden>
								<span aria-hidden="true">𝄪</span>
							</AccidentalToggleButton>
						</label>
					</Fieldset>
				</AccidentalBias>
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
				<Controls>
					<ToggleButton as="button" type="button" onClick={play}>
						Play Chord
					</ToggleButton>
				</Controls>
				<KeyboardContainer>
					<KeyboardScrollContent>
						<MusicalKeyboard
							startKey={48}
							endKey={83}
							style={{
								height: '100%',
								outline: 'none',
							}}
							naturalKeyStyle={pressed => ({
								backgroundColor: pressed ? 'var(--color-primary, red)' : 'var(--color-negative, white)',
							})}
							accidentalKeyStyle={pressed => ({
								backgroundColor: pressed ? 'var(--color-primary, red)' : 'currentColor',
							})}
							onKeyOn={handleKeyOn}
							keysOn={keysOn}
						/>
					</KeyboardScrollContent>
				</KeyboardContainer>
			</Layout>
		</Container>
	)
}

export default App
