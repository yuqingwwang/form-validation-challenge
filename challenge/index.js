const fields = document.querySelectorAll("input, textarea"); // you probably want to include <select>, <textarea> etc too

fields.forEach((field) => {
  // Mark all fields as valid at first
  field.setAttribute("aria-invalid", "false");

  // Create a new element to hold each message
  const feedback = document.createElement("p");
  const id = field.id + "Error";
  feedback.setAttribute("id", id);

  // don't overwrite any existing aria-describedby
  const prevIds = field.getAttribute("aria-describedBy");
  const describedBy = prevIds ? prevIds + " " + id : id;
  field.setAttribute("aria-describedBy", describedBy);

  // Associate this element with its field
  field.after(feedback);

  //When a field fails validation mark it as invalid
  field.addEventListener("invalid", () => {
    field.setAttribute("aria-invalid", "true");

    // When a field fails validation add the browser's default message to the element
    feedback.textContent = field.validationMessage;
  });

  //When a field is edited mark it valid again
  field.addEventListener("input", () => {
    field.setAttribute("aria-invalid", "false");

    // When a field is edited remove the message
    feedback.textContent = "";
  });
});

const form = document.querySelector("form");

// Stop the <form> element validating fields
form.setAttribute("novalidate", "");

// Manually check whether all the fields are valid
form.addEventListener("submit", (event) => {
  const allValid = event.target.checkValidity();
  if (!allValid) {
    // If not prevent the form submission from taking place
    event.preventDefault();
  }
});
