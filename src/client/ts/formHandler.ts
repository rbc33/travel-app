// Replace checkForName with a function that checks the URL
// import {checkForDate} from './dateChecker';
import {displayResults} from './displayResults';

export type FormData = {
  dest: string;
  date: string;
};

export type PostData = {
  weather: {
    temp: number;
    description: string;
  };
  image: string;
  locations?: string[];
  wiki?: string;
};
// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'http://localhost:8000';

const postData = async (formData: FormData) => {
  fetch(serverURL + '/getData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({formData}),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // formResults.innerHTML = JSON.stringify(data);
      displayResults(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  const formDataDest = (
    document.getElementById('destination') as HTMLInputElement
  )?.value;
  const formDataDate = (document.getElementById('date') as HTMLInputElement)
    ?.value;
  const formData = {
    dest: formDataDest,
    date: formDataDate,
  };

  // if (checkForDate(formData.date)) {
  if (formData.dest && formData.date) {
    console.log('::: Form Submitted :::');
    await postData(formData)
      .then(() => {
        console.log('Data sent to the server');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const form = document.getElementById('urlForm');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
};

// Function to send data to the server

// Export the handleSubmit function
export {handleSubmit};
