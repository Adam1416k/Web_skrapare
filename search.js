document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchButton').addEventListener('click', search);
});

function search() {
    var url = document.getElementById('url').value;
    var searchText = document.getElementById('searchText').value;

    // Anropa PHP-scriptet via AJAX.
    fetch('scraper.php?url=' + encodeURIComponent(url) + '&searchText=' + encodeURIComponent(searchText))
    .then(response => response.json())
    .then(data => {
        displayResults(data.occurrences);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = 'Ett fel inträffade när sökningen gjordes.';
    });
}

function displayResults(sentences) {
    const resultsContainer = document.getElementById('result');
    resultsContainer.innerHTML = ''; // Rensa tidigare resultat
    if (sentences.length === 0) {
        resultsContainer.innerHTML = 'Inga förekomster hittades.';
        return;
    }
    // Skapa en lista för att visa meningarna/styckena
    const list = document.createElement('ul');
    sentences.forEach(sentence => {
        const listItem = document.createElement('li');
        listItem.textContent = sentence;
        list.appendChild(listItem);
    });
    resultsContainer.appendChild(list);
}