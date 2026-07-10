document.getElementById("curDate").textContent = new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

// Check active session
const session = JSON.parse(localStorage.getItem('activeSession') || 'null');
if (session && session.active) {
  document.getElementById("sessionBadge").style.display = "flex";
}

// Mobile sidebar toggle
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

// Live stat update from attendance records
function updateStats() {
  const records = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
  const present = records.filter(r => r.status === 'Present').length;
  const absent = records.filter(r => r.status === 'Absent').length;
  const total = present + absent;
  if (total > 0) {
    document.getElementById('presentCount').textContent = present;
    document.getElementById('absentCount').textContent = absent;
    document.getElementById('totalStudents').textContent = total;
  }
}
updateStats();

function startSession()   { window.location.href = "./Start Sesstion Page/start-session.html"; }
function viewLive()       { window.location.href = "./Live Attendance Page/live-attendance.html"; }
function viewRecords()    { window.location.href = "./Attendance Record Page/attendance-history.html"; }
function logout()         { localStorage.removeItem('activeSession'); window.location.href = "/Login-form/Login.html"; }

// Chart
const ctx = document.getElementById('attendanceChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat'],
    datasets: [
      { label: 'Present', data: [28,30,26,24,29,20], backgroundColor: 'rgba(249,115,22,0.75)', borderRadius: 8, borderSkipped: false },
      { label: 'Absent',  data: [4,2,6,8,3,12],   backgroundColor: 'rgba(239,68,68,0.45)',  borderRadius: 8, borderSkipped: false }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'Inter' } } } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b' } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b' }, beginAtZero: true }
    }
  }
});