// Replace checkForName with a function that checks the URL
import { checkForUrl } from './urlChecker'
import { displayResults } from './displayResults';

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'http://localhost:8000'

const form = document.getElementById('urlForm');
if (form) {
    form.addEventListener('submit', handleSubmit);
}
const formResults = document.getElementById('results');
function handleSubmit(event) {
    event.preventDefault();

    const formText = document.getElementById('name').value;

    if (checkForUrl(formText)) {
        console.log('::: Form Submitted :::');
        postData(formText);
    }
}

// Function to send data to the server
const postData = async (formText) => {
    const formResults = document.getElementById('results');

    fetch(serverURL + "/analyze-url", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formText }),
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
    })
};
// Export the handleSubmit function
export { handleSubmit };

