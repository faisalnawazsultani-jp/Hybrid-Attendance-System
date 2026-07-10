 document.getElementById("viewBtn").addEventListener("click", function () {

  const subject = document.getElementById("subjectFilter").value;
  const date = document.getElementById("dateFilter").value;

  if (!date) {
    alert("Please select a date");
    return;
  }

  alert("Showing attendance for " + subject + " on " + date);
});