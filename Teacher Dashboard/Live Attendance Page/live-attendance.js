function loadAttendance() {
  const records = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
  const session = JSON.parse(localStorage.getItem('activeSession') || 'null');
  const body = document.getElementById('attendanceBody');
  const empty = document.getElementById('emptyState');

  // Update session info
  if (session && session.active) {
    document.getElementById('sessionInfo').textContent =
      session.subject + ' | ' + session.className + ' | Started ' + session.startTime;
    document.getElementById('liveIndicator').style.display = 'flex';
  }

  // Update stats
  const present = records.filter(r => r.status === 'Present').length;
  const absent  = records.filter(r => r.status === 'Absent').length;
  const total   = records.length;
  const rate    = total > 0 ? Math.round((present / total) * 100) + '%' : '—';

  document.getElementById('presentNum').textContent = present;
  document.getElementById('absentNum').textContent  = absent;
  document.getElementById('totalNum').textContent   = total;
  document.getElementById('rateNum').textContent    = rate;

  if (records.length === 0) {
    body.innerHTML = '';
    empty.style.display = 'flex';
    return;
  }

  empty.style.display = 'none';
  body.innerHTML = records.map((r, i) => `
    <div class="att-row">
      <span class="row-num">${i + 1}</span>
      <span class="student-name">${r.name}</span>
      <span class="roll-no">${r.rollNo}</span>
      <span class="method-tag">${r.method === 'Face' ? '👤' : r.method === 'GPS' ? '📍' : '🔀'} ${r.method}</span>
      <span class="att-time">${r.time}</span>
      <span class="status-tag ${r.status === 'Present' ? 'present' : 'absent'}">${r.status}</span>
    </div>
  `).join('');
}

// Refresh button
document.getElementById('refreshBtn').addEventListener('click', function () {
  this.classList.add('spinning');
  setTimeout(() => {
    loadAttendance();
    this.classList.remove('spinning');
  }, 600);
});

// Auto refresh every 5 seconds
loadAttendance();
setInterval(loadAttendance, 5000);