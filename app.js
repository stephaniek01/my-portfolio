import FORM_URL from './constants';

var form = document.getElementById("my-form");
var formStatus = document.getElementById("contact-form-status");

function displayMessage(message, messageClass = "") {
  formStatus.style.visibility = "visible";
  formStatus.innerHTML = message;
  formStatus.classList.toggle(messageClass);
}

function makeMessageDisappear() {
  formStatus.style.visibility = "hidden";
  formStatus.innerHTML = "";
  formStatus.classList.remove("form-message--success");
  formStatus.classList.remove("form-message--error");
}

async function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const requestOptions = {
    method: form.method,
    body: data,
    headers: { Accept: "application/json" },
  };

  try {
    const response = await fetch(FORM_URL, requestOptions);
    const responseMessage = await response.json();

    if (response.ok) {
      displayMessage(
        "Your form was submitted successfully",
        "form-message--success"
      );
      setTimeout(makeMessageDisappear, 3000);
      form.reset();
    } else {
      displayMessage(
        "Oops! There was a problem submitting your form",
        "form-message--error"
      );
      setTimeout(makeMessageDisappear, 3000);
    }

    console.log(responseMessage);
  } catch (error) {
    displayMessage(
      "Oops! There was a problem submitting your form",
      "form-message--error"
    );
    setTimeout(makeMessageDisappear, 3000);
  }
}

form.addEventListener("submit", handleSubmit);
