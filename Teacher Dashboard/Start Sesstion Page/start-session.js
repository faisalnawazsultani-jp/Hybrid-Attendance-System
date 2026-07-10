let timerInterval = null;
let startTime = null;

function pad(n) { return String(n).padStart(2, '0'); }

function updateDuration() {
  if (!startTime) return;
  const diff = Math.floor((Date.now() - startTime) / 1000);
  const m = Math.floor(diff / 60), s = diff % 60;
  document.getElementById('infoDuration').textContent = pad(m) + ':' + pad(s);
}

function loadExistingSession() {
  const session = JSON.parse(localStorage.getItem('activeSession') || 'null');
  if (session && session.active) {
    showActiveUI(session);
    startTime = session.startTimestamp;
    timerInterval = setInterval(updateDuration, 1000);
    document.getElementById('startBtn').disabled = true;
    document.getElementById('endBtn').disabled = false;
  }
}

function showActiveUI(session) {
  document.getElementById('sessionIndicator').style.display = 'flex';
  document.getElementById('sessionLabel').textContent = session.subject + ' — Active';
  document.getElementById('noSession').style.display = 'none';
  document.getElementById('activeInfo').style.display = 'flex';
  document.getElementById('activeInfo').style.flexDirection = 'column';
  document.getElementById('infoSubject').textContent = session.subject;
  document.getElementById('infoClass').textContent = session.className;
  document.getElementById('infoMethod').textContent = session.method;
  document.getElementById('infoTime').textContent = session.startTime;
  document.getElementById('statusBox').style.display = 'flex';
  document.getElementById('statusBox').className = 'status-box success';
  document.getElementById('statusIcon').textContent = '✅';
  document.getElementById('statusText').textContent = 'Session is live! Students can now join.';
}

function startSessionNow() {
  const subject = document.getElementById('subjectSelect').value;
  const className = document.getElementById('classSelect').value;
  const method = document.querySelector('input[name="method"]:checked').value;

  if (!subject || !className) {
    document.getElementById('statusBox').style.display = 'flex';
    document.getElementById('statusBox').className = 'status-box error';
    document.getElementById('statusIcon').textContent = '⚠️';
    document.getElementById('statusText').textContent = 'Please select both Subject and Class.';
    return;
  }

  startTime = Date.now();
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const session = {
    active: true,
    subject,
    className,
    method,
    startTime: timeStr,
    startTimestamp: startTime,
    date: now.toDateString()
  };

  localStorage.setItem('activeSession', JSON.stringify(session));
  // Reset attendance records for new session
  localStorage.setItem('attendanceRecords', JSON.stringify([]));

  document.getElementById('startBtn').disabled = true;
  document.getElementById('endBtn').disabled = false;
  showActiveUI(session);

  timerInterval = setInterval(updateDuration, 1000);
}

function endSessionNow() {
  clearInterval(timerInterval);
  localStorage.removeItem('activeSession');

  document.getElementById('startBtn').disabled = false;
  document.getElementById('endBtn').disabled = true;
  document.getElementById('sessionIndicator').style.display = 'none';
  document.getElementById('noSession').style.display = 'flex';
  document.getElementById('activeInfo').style.display = 'none';
  document.getElementById('statusBox').style.display = 'flex';
  document.getElementById('statusBox').className = 'status-box error';
  document.getElementById('statusIcon').textContent = '🛑';
  document.getElementById('statusText').textContent = 'Session ended successfully.';

  // Reset selects
  document.getElementById('subjectSelect').value = '';
  document.getElementById('classSelect').value = '';
}

loadExistingSession();