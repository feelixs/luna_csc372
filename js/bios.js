var textFields = []

document.addEventListener('DOMContentLoaded', function () {
    /*
        Load this page's content in the default language when the page loads.

        Tutorial I used for running JS on page load:
        https://stackoverflow.com/a/25984032
    */
    textFields.push(new DualLangeTextField(`/luna/text/bios/carmen`, document.getElementById('carmen-bio')));
    textFields.push(new DualLangeTextField(`/luna/text/bios/marco`, document.getElementById('marco-bio')));
    textFields.push(new DualLangeTextField(`/luna/text/bios/nicolas`, document.getElementById('nicolas-bio')));
    loadContentInLang(currentLang);
})

function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */
    document.title = newlang === 'es' ? 'Luna | Sobre' : 'Luna | About';
    loadContentInLang(newlang);
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    for (let i = 0; i < textFields.length; i++) {
        textFields[i].getText(language);
    }
}
