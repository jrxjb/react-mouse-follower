import './soundButton.css'

const SoundButton = ({ isMuted, onToggle }) => {
  return (
    <button
      type="button"
      className="sound-button"
      onClick={onToggle}
      aria-label={isMuted ? 'Unmute' : 'Mute'}
      aria-pressed={isMuted}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  )
}

export default SoundButton