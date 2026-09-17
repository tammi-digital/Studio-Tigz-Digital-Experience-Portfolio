const soundToggle = document.querySelector('.sound-toggle');
let audioContext;
function playLedgerTone() {
    if (!soundToggle?.classList.contains('is-on')) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioContext ??= new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + .07);
    gain.gain.setValueAtTime(.02, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + .09);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + .09);
}
soundToggle?.addEventListener('click', () => { soundToggle.classList.toggle('is-on'); soundToggle.textContent = soundToggle.classList.contains('is-on') ? 'Sound on' : 'Sound off'; playLedgerTone(); });
document.querySelectorAll('a, .concept-card').forEach((element) => element.addEventListener('mouseenter', playLedgerTone));