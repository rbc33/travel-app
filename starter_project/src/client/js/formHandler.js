// Replace checkForName with a function that checks the URL
import { checkForDate } from './dateChecker'
import { displayResults } from './displayResults';

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'http://localhost:8000'

const handleSubmit = (event) => {
    event.preventDefault();
    const formData =  {
        "dest" : document.getElementById('destination').value,
        "date" : document.getElementById('date').value
    }


    // if (checkForDate(formData.date)) {
    if (formData.dest && formData.date) {
        console.log('::: Form Submitted :::');
        postData(formData);
    }
}

const form = document.getElementById('urlForm');
if (form) {
    form.addEventListener('submit', handleSubmit);
}
const formResults = document.getElementById('results');


// Function to send data to the server
const postData = async (formData) => {
    const formResults = document.getElementById('results');

    fetch(serverURL + "/getData", {
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
    })
};
// Export the handleSubmit function
export { handleSubmit };

