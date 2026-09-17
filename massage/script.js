const soundToggle = document.querySelector('.sound-toggle');
let audioContext;
function playMassageTone() {
    if (!soundToggle?.classList.contains('is-on')) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioContext ??= new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(360, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(520, audioContext.currentTime + .3);
    gain.gain.setValueAtTime(.025, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + .34);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + .34);
}
soundToggle?.addEventListener('click', () => { soundToggle.classList.toggle('is-on'); soundToggle.textContent = soundToggle.classList.contains('is-on') ? 'Sound on' : 'Sound off'; playMassageTone(); });
document.querySelectorAll('a, .concept-card').forEach((element) => element.addEventListener('mouseenter', playMassageTone));