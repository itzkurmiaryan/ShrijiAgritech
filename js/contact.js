document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const overlay = document.getElementById("thankyouOverlay");
  const submitBtn = document.getElementById("contactSubmitBtn");

  form.addEventListener("submit", function(e) {

    e.preventDefault(); // 🚨 STOP redirect

    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {

      if (response.ok) {

        overlay.classList.add("active");
        form.reset();

        submitBtn.innerText = "Send Message";
        submitBtn.disabled = false;

        setTimeout(() => {
          overlay.classList.remove("active");
        }, 4000);

      } else {
        alert("Something went wrong.");
        submitBtn.innerText = "Send Message";
        submitBtn.disabled = false;
      }

    })
    .catch(() => {
      alert("Submission failed.");
      submitBtn.innerText = "Send Message";
      submitBtn.disabled = false;
    });

  });

});