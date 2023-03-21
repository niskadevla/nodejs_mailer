const mailForm = document.getElementById('mailForm');
const submitBtn = document.getElementById('submitBtn');

mailForm.addEventListener('submit', sendEmail);

const fetchData = async (url, form) => {
  const formData = new FormData(form);

  let response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  return await response.json();
}

async function sendEmail(e) {
  e.preventDefault();
  submitBtn.setAttribute('disabled', '');

  let result = await fetchData('http://localhost:3000/api/sent', this);

  alert(result.message);
  this.reset();
  submitBtn.removeAttribute('disabled');
}
