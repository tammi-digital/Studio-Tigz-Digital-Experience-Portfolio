const soundToggle = document.querySelector('.sound-toggle');
let audioContext;
function playAdvocacyTone() {
    if (!soundToggle?.classList.contains('is-on')) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioContext ??= new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(420, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(560, audioContext.currentTime + .16);
    gain.gain.setValueAtTime(.03, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + .2);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + .2);
}
soundToggle?.addEventListener('click', () => { soundToggle.classList.toggle('is-on'); soundToggle.textContent = soundToggle.classList.contains('is-on') ? 'Sound on' : 'Sound off'; playAdvocacyTone(); });
document.querySelectorAll('a, .concept-card').forEach((element) => element.addEventListener('mouseenter', playAdvocacyTone));