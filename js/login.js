var loginTextFields = []
var loginDualImages = []

$(document).ready(function () {
    /*
        Load this page's content in the default language when the page loads.
    */
    loginTextFields.push(new XMLDualLangTextField(`data/xml/contact-login.xml`, 0, $('#contact-desc')));
    loginTextFields.push(new HTMLDualLangTextField(`data/html/footer`, $('#footer-text')));
    loginTextFields.push(new HTMLDualLangTextField( `data/html/copyright`, $('#copyright')));
    loginDualImages.push(new DualLangImage('images/buttons/globe-white-en.webp',
        'images/buttons/globe-white-es.webp', $('#change-language-img')))

    // load the current langague from the document's 'lang' attribute, which was set by the php server
    var currentLang = $('html').attr('lang');
    console.log(`Loading the user's current language as ${currentLang}`);
    loadContentInLang(currentLang);
})


function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */
    var $contactsTitle = $('#page-title');

    // update page title, nav text, and various titles across the page
    document.title = newlang === 'es' ? 'Luna | Inicio Sesión' : 'Luna | Login';
    $contactsTitle.html(newlang === 'es' ? 'Inicio Sesión' : 'Login');
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    applyMainLanguageChange(language);
    applyNavLanguageChange(language);
    for (let i = 0; i < loginTextFields.length; i++) {
        loginTextFields[i].getText(language);
    }
    for (let i = 0; i < loginDualImages.length; i++) {
        loginDualImages[i].getImg(language);
    }
}
