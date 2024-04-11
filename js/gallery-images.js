$(document).ready(function () {
    loadGallery("data/json/gallery.json");
});


function loadGallery(jsonFile) {
    /*
        Loads pictures with paths provided by `jsonFile` into the page's main gallery
     */
    $('#gallery-placeholder').remove(); // remove the placeholder "loading gallery" text

    var galleryXHR = new XMLHttpRequest();
    galleryXHR.onload = function () {
        var $galleryDiv = $('#main-gallery-container');
        if (galleryXHR.status === 200) {
            let jsonContents = JSON.parse(galleryXHR.responseText);
            jsonContents.pictures.forEach( function(thisPic) {
                // thisPic is the current index of jsonContents (the current picture from the list in the json)
                let $tempDiv = $('<div>').attr('class', 'gallery-container');
                let $tempImg = $('<img>').attr('class', 'gallery-img rounded').attr('src', thisPic.url);
                $tempImg.attr('alt', thisPic.alt);
                $tempDiv.append($tempImg);
                $galleryDiv.append($tempDiv);
            });
        }
    }
    galleryXHR.open('GET', jsonFile, true);
    galleryXHR.send(null);
}
