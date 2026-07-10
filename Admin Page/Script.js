window.onload = function() {
const ctx = document.getElementById('adminChart');

new Chart(ctx, {
  type: 'bar',

  data: {
    labels: ["Jan", "Feb", "Mar", "Apr"],

    datasets: [{
      label: "Attendance %",
      data: [75, 80, 78, 85],

      backgroundColor: 'rgba(249,115,22,0.5)'
    }]
  },

  options: {
    responsive: true
  }
});

document.getElementById('manageUsersBtn').addEventListener('click', () => {
  window.location.href = './Usermanagement.html';
});

document.getElementById('attendanceControlBtn').addEventListener('click', () => {
  window.location.href = './Attendance_control.html';
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = '/Login-form/Login.html';
});

document.getElementById('NotifyBtn').addEventListener('click', () => {
  window.location.href = './Parent-notify.html';
});
};