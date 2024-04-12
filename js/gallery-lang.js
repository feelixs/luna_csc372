var galTextFields = []
var galDualImages = []

$(document).ready(function () {
    /*
        Load this page's content in the default language when the page loads.
    */
    galTextFields.push(new HTMLDualLangTextField(`data/html/footer`, $('#footer-text')));
    galTextFields.push(new HTMLDualLangTextField( `data/html/copyright`, $('#copyright')));
    /* when we fetch the text from the server, we need a fullpath that included 'luna'.
     when we set the image div in a duallangimage, we don't need 'luna' */
    galDualImages.push(new DualLangImage('images/buttons/globe-white-en.webp',
        'images/buttons/globe-white-es.webp', $('#change-language-img')))

    // load the current langague from the document's 'lang' attribute, which was set by the php server
    var currentLang = $('html').attr('lang');
    console.log(`Loading the user's current language as ${currentLang}`);
    loadContentInLang(currentLang);
});

function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */
    var $mediaTitle = $('#page-title');
    var $galleryTitle = $('#gallery-title');
    document.title = newlang === 'es' ? 'Luna | Medios' : 'Luna | Media';
    $mediaTitle.html(newlang === 'es' ? 'Medios' : 'Media');
    $galleryTitle.html(newlang === 'es' ? 'Galería' : 'Gallery');
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    applyMainLanguageChange(language);
    applyNavLanguageChange(language);

    for (let i = 0; i < galTextFields.length; i++) {
        galTextFields[i].getText(language);
    }
    for (let i = 0; i < galDualImages.length; i++) {
        galDualImages[i].getImg(language);
    }
}
