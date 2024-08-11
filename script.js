let timerInterval;
let secondsPassed = 0;
let isRunning = false;
let rhythmInterval;
let compressionCount = 0;
const totalCompressions = 30; // 30 компресии преди вдишване
const compressionRhythm = 600; // 600ms = 1 компресия на секунда = 100 компресии в минута

document.getElementById('toggle-timer').addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timerInterval);
        clearInterval(rhythmInterval);
        this.textContent = 'Започнете Таймер';
        document.getElementById('reset-timer').disabled = false;
        document.getElementById('rhythm-indicator').classList.remove('active');
        document.getElementById('rhythm-indicator').style.opacity = "0";
    } else {
        secondsPassed = 0;
        compressionCount = 0;
        document.getElementById('timer').textContent = '0:00';
        timerInterval = setInterval(updateTimer, 1000);
        rhythmInterval = setInterval(activateRhythm, compressionRhythm);
        this.textContent = 'Спри Таймера';
        document.getElementById('reset-timer').disabled = false;
    }
    isRunning = !isRunning;
});

document.getElementById('reset-timer').addEventListener('click', function() {
    clearInterval(timerInterval);
    clearInterval(rhythmInterval);
    secondsPassed = 0;
    compressionCount = 0;
    document.getElementById('timer').textContent = '0:00';
    document.getElementById('toggle-timer').textContent = 'Започнете Таймер';
    document.getElementById('reset-timer').disabled = true;
    document.getElementById('rhythm-indicator').classList.remove('active');
    document.getElementById('rhythm-indicator').style.opacity = "0";
    isRunning = false;
});

function updateTimer() {
    secondsPassed++;
    let minutes = Math.floor(secondsPassed / 60);
    let seconds = secondsPassed % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function activateRhythm() {
    const rhythmIndicator = document.getElementById('rhythm-indicator');

    // Увеличаване на брояча за компресиите
    compressionCount++;

    if (compressionCount <= totalCompressions) {
        rhythmIndicator.textContent = 'Натисни сега!';
        rhythmIndicator.classList.toggle('active');
        rhythmIndicator.style.opacity = "1";
    } else {
        // След 30 компресии сигнализира за вдишване
        rhythmIndicator.textContent = 'Вдишай!';
        rhythmIndicator.classList.add('active');
        rhythmIndicator.style.opacity = "1";
        clearInterval(rhythmInterval);

        // След 2 секунди продължава ритъмът за компресиите
        setTimeout(() => {
            compressionCount = 0;
            rhythmInterval = setInterval(activateRhythm, compressionRhythm);
        }, 2000); // Пауза от 2 секунди за вдишване
    }
}