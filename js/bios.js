var biosTextFields = []

document.addEventListener('DOMContentLoaded', function () {
    /*
        Load this page's content in the default language when the page loads.

        Tutorial I used for running JS on page load:
        https://stackoverflow.com/a/25984032
    */
    biosTextFields.push(new DualLangeTextField('carmen', `/luna/text/bios/carmen`, document.getElementById('carmen-bio')));
    biosTextFields.push(new DualLangeTextField('marco', `/luna/text/bios/marco`, document.getElementById('marco-bio')));
    biosTextFields.push(new DualLangeTextField('nicolas', `/luna/text/bios/nicolas`, document.getElementById('nicolas-bio')));
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
    for (let i = 0; i < biosTextFields.length; i++) {
        biosTextFields[i].getText(language);
    }
}
