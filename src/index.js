import * as React from 'react'
import ReactDOM from 'react-dom'
import 'cssremedy/css/remedy.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	React.createElement(App, {
		chordDictionary: [
			{ name: 'Augmented', symbol: 'aug', notes: [0, 4, 8] },
			{
				name: 'Augmented eleventh',
				symbol: '<sup>(♯11)</sup>',
				notes: [0, 4, 7, 10, 14, 18],
			},
			{ name: 'Augmented major seventh', symbol: 'aug<sup>maj7</sup>', notes: [0, 4, 8, 11] },
			{
				name: 'Augmented seventh',
				symbol: 'aug<sup>7</sup>',
				notes: [0, 4, 8, 10],
			},
			{
				name: 'Diminished',
				symbol: 'dim',
				notes: [0, 3, 6],
			},
			{
				name: 'Diminished major seventh',
				symbol: 'dim<sup>maj7</sup>',
				notes: [0, 3, 6, 11],
			},
			{
				name: 'Diminished seventh',
				symbol: 'dim<sup>7</sup>',
				notes: [0, 3, 6, 9],
			},
			{
				name: 'Dominant eleventh',
				symbol: '<sup>11</sup>',
				notes: [0, 4, 7, 10, 14, 17],
			},
			{ name: 'Dominant minor ninth', symbol: '<sup>7♭9</sup>', notes: [0, 4, 7, 10, 13] },
			{
				name: 'Dominant ninth',
				symbol: '<sup>9</sup>',
				notes: [0, 4, 7, 10, 14],
			},
			{
				name: 'Dominant seventh',
				symbol: '<sup>7</sup>',
				notes: [0, 4, 7, 10],
			},
			{
				name: 'Dominant seventh flat five',
				symbol: '<sup>7♭5</sup>',
				notes: [0, 4, 6, 10],
			},
			{
				name: 'Dominant seventh sharp nine',
				symbol: '<sup>7♯5</sup>',
				notes: [0, 4, 7, 10, 15],
			},
			{ name: 'Dominant thirteenth', symbol: '<sup>13</sup>', notes: [0, 4, 7, 10, 14, 17, 21] },
			{ name: 'Half-diminished seventh', symbol: 'm<sup>7(♭5)</sup>', notes: [0, 3, 6, 10] },
			{
				name: 'Major',
				symbol: '',
				notes: [0, 4, 7],
			},
			{ name: 'Major eleventh', symbol: '<sup>maj11</sup>', notes: [0, 4, 7, 11, 14, 17] },
			{
				name: 'Major seventh',
				notes: [0, 4, 7, 11],
			},
			{ name: 'Major seventh sharp eleventh', symbol: '<sup>maj7♯11</sup>', notes: [0, 4, 8, 11, 18] },
			{
				name: 'Major sixth',
				symbol: '<sup>6</sup>',
				notes: [0, 4, 7, 9],
			},
			{
				name: 'Major sixth ninth',
				symbol: '<sup>6(9)</sup>',
				notes: [0, 4, 7, 9, 14],
			},
			{ name: 'Major ninth', symbol: '<sup>maj9</sup>', notes: [0, 4, 7, 11, 14] },
			{
				name: 'Major thirteenth',
				symbol: '<sup>maj13</sup>',
				notes: [0, 4, 7, 11, 14, 18, 21],
			},
			{
				name: 'Minor',
				symbol: 'm',
				notes: [0, 3, 7],
			},
			{ name: 'Minor eleventh', symbol: 'm<sup>11</sup>', notes: [0, 3, 7, 10, 14, 17] },
			{
				name: 'Minor major seventh',
				symbol: 'm<sup>maj7</sup>',
				notes: [0, 3, 7, 11],
			},
			{ name: 'Minor ninth', symbol: 'm<sup>9</sup>', notes: [0, 3, 7, 10, 14] },
			{
				name: 'Minor seventh',
				symbol: 'm<sup>7</sup>',
				notes: [0, 3, 7, 10],
			},
			{ name: 'Minor sixth', symbol: 'm<sup>6</sup>', notes: [0, 3, 7, 9] },
			{
				name: 'Minor sixth ninth (6/9)',
				symbol: 'm<sup>6(9)</sup>',
				notes: [0, 3, 7, 9, 14],
			},
			{ name: 'Minor thirteenth', symbol: 'm<sup>13</sup>', notes: [0, 3, 7, 10, 14, 17, 21] },
			{
				name: 'Ninth augmented fifth',
				symbol: '<sup>9♯5</sup>',
				notes: [0, 4, 8, 10, 14],
			},
			{ name: 'Ninth flat fifth', notes: [0, 4, 6, 10, 14], symbol: '<sup>9♭5</sup>' },
			{
				name: 'Seven six',
				symbol: '<sup>7(6)</sup>',
				notes: [0, 4, 7, 9, 10],
			},
			{ name: 'Seventh suspension four', symbol: '<sup>7sus4</sup>', notes: [0, 5, 7, 10] },
			{
				name: 'Suspended fourth',
				symbol: '<sup>sus4</sup>',
				notes: [0, 5, 7],
			},
			{
				name: 'Suspended second',
				symbol: '<sup>sus2</sup>',
				notes: [0, 2, 7],
			},
			{
				name: 'Thirteenth flat ninth',
				symbol: '<sup>13♭9</sup>',
				notes: [0, 4, 7, 10, 13, 21],
			},
			{
				name: 'Thirteenth flat ninth flat fifth',
				symbol: '<sup>13♭9(♭5)</sup>',
				notes: [0, 4, 6, 10, 13, 21],
			},
		],
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
