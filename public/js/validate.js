function validateForm() {
  var isValid = true;
  var inputs = document.querySelectorAll('#sitter-form input, #sitter-form select, #sitter-form textarea');
  
  inputs.forEach(function(input) {
      if (!input.value.trim()) {
          input.classList.add('invalid');
          isValid = false;
      } else {
          input.classList.remove('invalid');
      }
  });

  if (!isValid) {
      alert('Please fill in all required fields.');
  }

  return isValid;
}
