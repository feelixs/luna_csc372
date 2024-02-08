var homeTextFields = []

document.addEventListener('DOMContentLoaded', function () {
    /*
        Load this page's content in the default language when the page loads.

        Tutorial I used for running JS on page load:
        https://stackoverflow.com/a/25984032
    */
    homeTextFields.push(new DualLangTextField('div1', `/luna/text/home/div1`, document.getElementById('div1-text')));
    homeTextFields.push(new DualLangTextField('div2', `/luna/text/home/div2`, document.getElementById('div2-text')));
    homeTextFields.push(new DualLangTextField('footer', `/luna/text/home/footer`, document.getElementById('footer-text')));
    homeTextFields.push(new DualLangTextField( 'copyright',`/luna/text/home/copyright`, document.getElementById('copyright')));
    loadContentInLang(currentLang);
})

function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */

    document.title = newlang === 'es' ? 'Luna | Inicio' : 'Luna | Home';
    loadContentInLang(newlang)
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    for (let i = 0; i < homeTextFields.length; i++) {
        homeTextFields[i].getText(language);
    }
}
