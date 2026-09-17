const soundToggle = document.querySelector(".sound-toggle");
let audioContext;

function playTone() {
    if (!soundToggle?.classList.contains("is-on")) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioContext ??= new AudioContext();
    const theme = document.body.className;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const isMechanic = theme.includes("theme-mechanic");
    const isMassage = theme.includes("theme-massage");
    const isAccounting = theme.includes("theme-accounting");
    oscillator.type = isMechanic ? "sawtooth" : isAccounting ? "square" : "sine";
    oscillator.frequency.setValueAtTime(isMechanic ? 92 : isAccounting ? 880 : isMassage ? 420 : 520, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(isMechanic ? 150 : isAccounting ? 660 : isMassage ? 520 : 760, audioContext.currentTime + (isMechanic ? .18 : .08));
    gain.gain.setValueAtTime(isMechanic ? .025 : .035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + (isMechanic ? .2 : .1));
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + (isMechanic ? .2 : .1));
}

soundToggle?.addEventListener("click", () => {
    soundToggle.classList.toggle("is-on");
    soundToggle.textContent = soundToggle.classList.contains("is-on") ? "Sound on" : "Sound off";
    playTone();
});
document.querySelectorAll("a, .concept-card").forEach((element) => element.addEventListener("mouseenter", playTone));