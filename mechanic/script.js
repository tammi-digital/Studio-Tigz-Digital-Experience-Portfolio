const soundToggle = document.querySelector('.sound-toggle');
let audioContext;
function playEngineTone() {
    if (!soundToggle?.classList.contains('is-on')) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioContext ??= new AudioContext();
    const oscillator = audioContext.createOscillator();
    const secondOscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sawtooth';
    secondOscillator.type = 'square';
    oscillator.frequency.setValueAtTime(78, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(140, audioContext.currentTime + .18);
    secondOscillator.frequency.setValueAtTime(156, audioContext.currentTime);
    gain.gain.setValueAtTime(.018, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + .22);
    oscillator.connect(gain);
    secondOscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    secondOscillator.start();
    oscillator.stop(audioContext.currentTime + .22);
    secondOscillator.stop(audioContext.currentTime + .22);
}
soundToggle?.addEventListener('click', () => { soundToggle.classList.toggle('is-on'); soundToggle.textContent = soundToggle.classList.contains('is-on') ? 'Sound on' : 'Sound off'; playEngineTone(); });
document.querySelectorAll('a, .concept-card').forEach((element) => element.addEventListener('mouseenter', playEngineTone));