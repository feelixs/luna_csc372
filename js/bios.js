var textFields = []
textFields.push(dualLangeTextField("carmen"), document.getElementById('carmen-bio'))

function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */
    document.title = newlang === 'es' ? 'Luna | Sobre' : 'Luna | About';

    for (let i = 0; i < textFields.length; i++) {
        textFields[i].getText()
    }
}