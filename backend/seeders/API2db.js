// fetch data from an API

const apiURL = 'https://menus-api.vercel.app/'

fetch(apiURL)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Data received:', data)
        console.log(data.bbqs[0].name)

    })
    .catch((error) => {
        console.log('Error:', error)
    })