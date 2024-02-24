var cntTextFields = []
var cntDualImages = []

document.addEventListener('DOMContentLoaded', function () {
    /*
        Load this page's content in the default language when the page loads.

        Tutorial I used for running JS on page load:
        https://stackoverflow.com/a/25984032
    */
    cntTextFields.push(new DualLangTextField(`/luna/text/home/div1`, document.getElementById('div1-text')));
    cntTextFields.push(new DualLangTextField(`/luna/text/home/div2`, document.getElementById('div2-text')));
    cntTextFields.push(new DualLangTextField(`/luna/text/footer`, document.getElementById('footer-text')));
    cntTextFields.push(new DualLangTextField( `/luna/text/copyright`, document.getElementById('copyright')));
    cntDualImages.push(new DualLangImage('images/buttons/globe-white-en.webp', 'images/buttons/globe-white-es.webp', document.getElementById('change-language-img')))
    loadContentInLang(currentLang);
})

function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */

    document.title = newlang === 'es' ? 'Luna | Contacto' : 'Luna | Contact';
    loadContentInLang(newlang)
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    for (let i = 0; i < cntTextFields.length; i++) {
        cntTextFields[i].getText(language);
    }
    for (let i = 0; i < cntDualImages.length; i++) {
        cntDualImages[i].getImg(language);
    }
}
