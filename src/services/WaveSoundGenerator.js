export default function WaveSoundGenerator() {
	const oscillators = {}
	const AudioContext = window.AudioContext || window.webkitAudioContext
	const audioCtx = new AudioContext()
	const sounds = 'sine triangle sawtooth square'.split(' ')

	let sound = 0

	this.changeSound = soundId => {
		sound = soundId
	}

	this.soundOn = (id, frequency) => {
		if (oscillators[id]) {
			oscillators[id].stop()
			delete oscillators[id]
		}

		oscillators[id] = audioCtx.createOscillator()
		const gainNode = audioCtx.createGain()

		oscillators[id].type = sounds[sound]
		oscillators[id].connect(gainNode)
		gainNode.connect(audioCtx.destination)
		gainNode.gain.value = 0.05

		oscillators[id].frequency.value = frequency
		oscillators[id].start()
	}

	this.soundOff = id => {
		if (oscillators[id]) {
			oscillators[id].stop()
			delete oscillators[id]
		}
	}

	this.getSounds = () => 'sine triangle sawtooth square'.split(' ')
}
