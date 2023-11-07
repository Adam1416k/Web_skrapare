<?php
    function findOccurrences($url, $searchText) {
        $content = file_get_contents($url);
        $dom = new DOMDocument();
        @$dom->loadHTML($content);
        $text = $dom->textContent;

        // Dela upp texten i meningar.
        $sentences = preg_split('/(?<=[.!?])\s+/', $text, -1, PREG_SPLIT_NO_EMPTY);
        $matches = [];

        // Gå igenom varje mening för att hitta söktexten och spara meningen om den innehåller söktexten.
        foreach ($sentences as $sentence) {
            if (stripos($sentence, $searchText) !== false) {
                $matches[] = trim($sentence);
            }
        }

        return $matches;
    }

    // Hanterar GET-anrop med parametrarna 'url' och 'searchText'.
    if (isset($_GET['url']) && isset($_GET['searchText'])) {
        $url = $_GET['url'];
        $searchText = $_GET['searchText'];

        // Hitta alla förekomster av texten.
        $matches = findOccurrences($url, $searchText);

        // Skicka tillbaka resultatet som JSON.
        header('Content-Type: application/json');
        echo json_encode([
            "url" => $url,
            "searchText" => $searchText,
            "occurrences" => $matches
        ]);
    }
?>