let faceVerified = false;
let gpsVerified = false;
let currentSession = null;

function checkSession() {
  const session = JSON.parse(localStorage.getItem('activeSession') || 'null');
  if (session && session.active) {
    currentSession = session;
    document.getElementById('noSessionState').style.display = 'none';
    document.getElementById('sessionState').style.display = 'block';
    document.getElementById('sessSubject').textContent = session.subject;
    document.getElementById('sessClass').textContent   = session.className;
    document.getElementById('sessTime').textContent    = session.startTime;
    document.getElementById('sessDate').textContent    = session.date;
    document.getElementById('sessMethod').textContent  = session.method;
  } else {
    document.getElementById('noSessionState').style.display = 'flex';
    document.getElementById('sessionState').style.display = 'none';
  }
}

function simulateFaceScan() {
  const btn = document.getElementById('scanFaceBtn');
  const box = document.getElementById('cameraBox');
  btn.disabled = true;
  btn.textContent = '🔄 Scanning...';
  box.classList.add('scanning');

  setTimeout(() => {
    faceVerified = true;
    box.classList.remove('scanning');
    box.classList.add('verified');
    box.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg><p style="color:#22c55e">Face Verified!</p>';
    btn.textContent = '✅ Face Verified';
    btn.style.background = 'rgba(34,197,94,0.2)';
    btn.style.color = '#86efac';
    btn.style.border = '1px solid rgba(34,197,94,0.3)';
    btn.style.boxShadow = 'none';

    // Mark step 1 done
    setStepDone(1);
    setStepActive(2);

    // Show GPS panel
    document.getElementById('facePanel').style.display = 'none';
    document.getElementById('gpsPanel').style.display = 'block';
  }, 2500);
}

function simulateGPS() {
  const btn = document.getElementById('getGpsBtn');
  const status = document.getElementById('gpsStatus');
  btn.disabled = true;
  btn.textContent = '🔄 Getting Location...';
  status.textContent = 'Requesting GPS...';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => { handleGPSSuccess(pos.coords.latitude, pos.coords.longitude); },
      ()    => { handleGPSSuccess(31.5497, 74.3436); } // fallback
    );
  } else {
    setTimeout(() => handleGPSSuccess(31.5497, 74.3436), 1800);
  }
}

function handleGPSSuccess(lat, lng) {
  const btn = document.getElementById('getGpsBtn');
  const statusEl = document.getElementById('gpsStatus');
  gpsVerified = true;
  statusEl.innerHTML = `📍 Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}<br><span style="color:#86efac">✓ Within Campus Range</span>`;
  statusEl.style.color = '#86efac';
  btn.textContent = '✅ GPS Verified';
  btn.style.background = 'rgba(34,197,94,0.2)';
  btn.style.color = '#86efac';
  btn.style.border = '1px solid rgba(34,197,94,0.3)';
  btn.style.boxShadow = 'none';

  setStepDone(2);
  setStepActive(3);

  setTimeout(() => {
    document.getElementById('gpsPanel').style.display = 'none';
    document.getElementById('confirmPanel').style.display = 'block';
  }, 800);
}

function setStepDone(n) {
  const step = document.getElementById('step' + n);
  step.classList.add('complete');
  const num = step.querySelector('.step-num');
  num.classList.remove('active');
  num.classList.add('done');
  num.textContent = '✓';
  step.querySelector('.step-status').textContent = '✓ Done';
  step.querySelector('.step-status').className = 'step-status done';
}

function setStepActive(n) {
  const step = document.getElementById('step' + n);
  step.classList.add('current');
  const num = document.getElementById('step' + n + 'Num') || step.querySelector('.step-num');
  num.classList.add('active');
}

function confirmAttendance() {
  if (!faceVerified || !gpsVerified) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const record = {
    name: 'Talha Khan',
    rollNo: 'BSCS-2021-1245',
    method: currentSession.method === 'Both' ? 'Face+GPS' : currentSession.method,
    time: timeStr,
    status: 'Present',
    subject: currentSession.subject,
    class: currentSession.className
  };

  // Add to teacher's live attendance
  const records = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
  const already = records.find(r => r.name === 'Talha Khan');
  if (!already) { records.push(record); localStorage.setItem('attendanceRecords', JSON.stringify(records)); }

  // Add to student's personal history
  const history = JSON.parse(localStorage.getItem('myAttendanceHistory') || '[]');
  history.unshift(record);
  localStorage.setItem('myAttendanceHistory', JSON.stringify(history));

  setStepDone(3);

  // Show success
  setTimeout(() => {
    document.getElementById('sessionState').style.display = 'none';
    document.getElementById('successState').style.display = 'flex';
    document.getElementById('sucSubject').textContent = currentSession.subject;
    document.getElementById('sucTime').textContent = timeStr;
  }, 600);
}

// Init
checkSession();
