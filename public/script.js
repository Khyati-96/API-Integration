// Function to submit the region form
const submitForm = () => {
  const form = document.getElementById("region-form");
  form.submit();
};

// Event listener to disable submit for empty area selection
const areaSelect = document.getElementById("area-select");
areaSelect.addEventListener("change", () => {
  const submitBtn = document.querySelector('#area-form input[type="submit"]');
  submitBtn.disabled = areaSelect.value === "";
});

// Initialize elements for checking area options
const form = document.getElementById("area-form");
const select = form.querySelector("select");
const options = select.querySelectorAll("option");

// Count null options
const nullOptions = Array.from(options).filter(
  (option) => !option.value.trim()
).length;

// Calculate non-null options count
const nonNullOptions = options.length - nullOptions;

// Auto-submit form if non-null options are <= 2 and there are null options
if (nonNullOptions <= 2 && nullOptions > 0) {
  const submitBtn = document.querySelector('#area-form input[type="submit"]');
  submitBtn.disabled = false;
  form.submit();
}
