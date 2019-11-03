import * as React from 'react'
import ReactDOM from 'react-dom'
import 'cssremedy/css/remedy.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	React.createElement(App, {
		chordDictionary: {
			major: {
				name: 'Major',
				symbol: '',
				notes: [0, 4, 7],
			},
			minor: {
				name: 'Minor',
				symbol: 'm',
				notes: [0, 3, 7],
			},
			suspended2nd: {
				name: 'Suspended 2nd',
				symbol: 'sus2',
				notes: [0, 2, 7],
			},
			suspended4th: {
				name: 'Suspended 4th',
				symbol: 'sus4',
				notes: [0, 5, 7],
			},
			diminished: {
				name: 'Diminished',
				symbol: 'dim',
				notes: [0, 3, 6],
			},
			augmented: {
				name: 'Augmented',
				symbol: 'aug',
				notes: [0, 4, 8],
			},
			diminished7th: {
				name: 'Diminished Seventh',
				symbol: 'dim<sup>7</sup>',
				notes: [0, 3, 6, 9],
			},
			dominant7th: {
				name: 'Dominant Seventh',
				symbol: '<sup>7</sup>',
				notes: [0, 4, 7, 10],
			},
			major7th: {
				name: 'Major Seventh',
				symbol: '<sup>maj7</sup>',
				notes: [0, 4, 7, 11],
			},
			minor7th: {
				name: 'Minor Seventh',
				symbol: 'm<sup>7</sup>',
				notes: [0, 3, 7, 10],
			},
			minorMajor7th: {
				name: 'Minor Major Seventh',
				symbol: 'm<sup>maj7</sup>',
				notes: [0, 3, 7, 11],
			},
			dominant7thsuspended2nd: {
				name: 'Dominant 7th Suspended 2nd',
				symbol: '<sup>7</sup>sus2',
				notes: [0, 2, 7, 10],
			},
			dominant7thsuspended4th: {
				name: 'Dominant 7th Suspended 4th',
				symbol: '<sup>7</sup>sus4',
				notes: [0, 5, 7, 10],
			},
		},
		noteNameSystems: {
			standard: {
				name: 'Standard',
				notes:
					',B♯,C,,D𝄫;,C♯,,D♭,;C𝄪,,D,,E𝄫;,D♯,,E♭,;D𝄪,,E,F♭,;,E♯,F,,G𝄫;,F♯,,G♭,;F𝄪,,G,,A𝄫;,G♯,,A♭,;G𝄪,,A,,B𝄫;,A♯,,B♭,;A𝄪,,B,C♭,',
			},
			european: {
				name: 'European',
				notes:
					',H♯,C,,D𝄫;,C♯,,D♭,;C𝄪,,D,,E𝄫;,D♯,,E♭,;D𝄪,,E,F♭,;,E♯,F,,G𝄫;,F♯,,G♭,;F𝄪,,G,,A𝄫;,G♯,,A♭,;G𝄪,,A,,H𝄫;,A♯,,H♭,;A𝄪,,H,C♭,',
			},
		},
	}),
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
