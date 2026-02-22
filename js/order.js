document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("orderForm");
  const overlay = document.getElementById("thankyouOverlay");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", function(e) {
    e.preventDefault();   // 🚨 STOP DEFAULT REDIRECT

    submitBtn.innerText = "Processing...";
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

        submitBtn.innerText = "Place Order";
        submitBtn.disabled = false;

        setTimeout(() => {
          overlay.classList.remove("active");
        }, 4000);

      } else {
        alert("Something went wrong.");
        submitBtn.innerText = "Place Order";
        submitBtn.disabled = false;
      }
    })
    .catch(() => {
      alert("Submission failed.");
      submitBtn.innerText = "Place Order";
      submitBtn.disabled = false;
    });

  });

});