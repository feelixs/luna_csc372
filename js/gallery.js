var galTextFields = []
var galDualImages = []

$(document).ready(function () {
    /*
        Load this page's content in the default language when the page loads.
    */
    galTextFields.push(new DualLangTextField(`/luna/text/footer`, $('#footer-text')));
    galTextFields.push(new DualLangTextField( `/luna/text/copyright`, $('#copyright')));
    /* when we fetch the text from the server, we need a fullpath that included 'luna'.
     when we set the image div in a duallangimage, we don't need 'luna' */
    galDualImages.push(new DualLangImage('images/buttons/globe-white-en.webp',
        'images/buttons/globe-white-es.webp', $('#change-language-img')))
    loadContentInLang(currentLang);
    loadGallery();
})

function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */
    var $galleryTitle = $('#page-title');
    document.title = newlang === 'es' ? 'Luna | Medios' : 'Luna | Media';
    $galleryTitle.html(newlang === 'es' ? 'Galería' : 'Gallery');
    loadContentInLang(newlang)
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    for (let i = 0; i < galTextFields.length; i++) {
        galTextFields[i].getText(language);
    }
    for (let i = 0; i < galDualImages.length; i++) {
        galDualImages[i].getImg(language);
    }
}

function loadGallery() {
    $('#gallery-placeholder').remove(); // remove the placeholder "loading gallery" text

    var pictures = [ '068A62F9.webp', 'P1001442.webp',  '468D91AF.webp', 'P1001211.webp',
                             'P1001437.jpg', 'P1001384.jpg', 'P1001197.jpg', 'P1001430.jpg',
                             'P1001262.webp', 'P1001396.jpg', 'P1001427.jpg', 'P1001195.jpg',
                             'P1000427.jpg', 'P1000708.jpg', 'P1001406.webp', 'P1001446.webp' ]

    var $galleryDiv = $('#main-gallery-container');
    pictures.forEach(function (picFilename) {
        let $tempDiv = $('<div>').attr('class', 'gallery-container');
        let $tempImg = $('<img>').attr('class', 'gallery-img rounded').attr('src', `images/gallery/imgs/${picFilename}`);
        $tempDiv.append($tempImg);
        $galleryDiv.append($tempDiv);
        setAltToFile($tempImg, `${trimFilename(picFilename)}.txt`);
    })
}

function trimFilename(filename) {
    // https://stackoverflow.com/a/2187293
    return filename.substring(0, filename.lastIndexOf('.'));
}

function setAltToFile(img, filename) {
    fetch(`/luna/images/gallery/alts/${filename}`) // fetch file from the server
        .then((res) => {
            if (!res.ok) { // if response was not successful
                img.alt = "undefined";
                throw new Error(`/luna/images/gallery/alts/${filename} - error fetching file`);
            }
            return res.text();
        })
        .then((text) => { // set it from the respone's return
            img.alt = text;
        });
}
