var galTextFields = []
var galDualImages = []

document.addEventListener('DOMContentLoaded', function () {
    /*
        Load this page's content in the default language when the page loads.
    */
    galTextFields.push(new DualLangTextField(`/luna/text/footer`, document.getElementById('footer-text')));
    galTextFields.push(new DualLangTextField( `/luna/text/copyright`, document.getElementById('copyright')));
    galDualImages.push(new DualLangImage('images/buttons/globe-white-en.webp', 'images/buttons/globe-white-es.webp', document.getElementById('change-language-img')))
    loadContentInLang(currentLang);
})

function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */

    document.title = newlang === 'es' ? 'Luna | Medios' : 'Luna | Media';
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
