import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showSpinner();
  const data = new FormData(form);
  clearTextArea();

  try {
    const response = await fetch('http://localhost:8080/dream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        prompt: data.get('prompt'),
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const { image } = await response.json();

    const result = document.querySelector('#result');

    if (result) {
      result.innerHTML = `<img src=${image} width="512">`;
    }
  } catch (error) {
    console.error(error);
    alert(
      'An error occurred while generating the image. Please try again later.'
    );
  } finally {
    hideSpinner();
  }
});

function clearTextArea() {
  const textArea = document.querySelector('textarea');
  textArea.value = '';
}

function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.classList.add('disabled');
  button.innerHTML =
    'Dreaming something unique. This may take a while... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.classList.remove('disabled');
  button.innerHTML = 'Make something unique';
}
