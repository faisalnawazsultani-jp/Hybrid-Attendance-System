document.getElementById("curDate").textContent =
  new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

// Mobile menu
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

// Show active session alert if teacher started one
function checkActiveSession() {
  const session = JSON.parse(localStorage.getItem('activeSession') || 'null');
  const alert = document.getElementById('activeSessionAlert');
  if (session && session.active) {
    alert.style.display = 'flex';
    document.getElementById('activeSessionText').textContent =
      session.subject + ' — ' + session.className;
  } else {
    alert.style.display = 'none';
  }
}
checkActiveSession();
setInterval(checkActiveSession, 3000);

// Update attendance stats from localStorage
function updateStats() {
  const myRecords = JSON.parse(localStorage.getItem('myAttendanceHistory') || '[]');
  const present = myRecords.filter(r => r.status === 'Present').length;
  const absent  = myRecords.filter(r => r.status === 'Absent').length;
  if (present + absent > 0) {
    document.getElementById('pDays').textContent = present;
    document.getElementById('aDays').textContent = absent;
    const rate = Math.round((present/(present+absent))*100);
    document.getElementById('rateVal').textContent = rate + '%';
    // Update ring
    const offset = 314 - (314 * rate / 100);
    document.getElementById('ringCircle').setAttribute('stroke-dashoffset', offset);
  }
}
updateStats();

// Chart
const canvas = document.getElementById("attendanceChart");
new Chart(canvas, {
  type: "line",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [{
      label: "Attendance %",
      data: [80,82,78,85,88,92,63,55,73,95,66,88],
      backgroundColor: "rgba(249,115,22,0.15)",
      borderColor: "#f97316",
      pointBackgroundColor: "#f97316",
      pointRadius: 4,
      pointHoverRadius: 7,
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#94a3b8', font: { family:'Inter' } } }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { family:'Inter' } } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { family:'Inter' } }, beginAtZero: true, max: 100 }
    }
  }
});
