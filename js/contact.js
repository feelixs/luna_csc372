var cntTextFields = []
var cntDualImages = []

$(document).ready(function () {
    /*
        Load this page's content in the default language when the page loads.
    */
    cntTextFields.push(new XMLDualLangTextField(`data/xml/contact.xml`, 0, $('#contact-desc')));
    cntTextFields.push(new HTMLDualLangTextField(`data/html/footer`, $('#footer-text')));
    cntTextFields.push(new HTMLDualLangTextField( `data/html/copyright`, $('#copyright')));
    cntDualImages.push(new DualLangImage('images/buttons/globe-white-en.webp',
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
    var $contactTitle = $('#page-title');
    var $msgTitle = $('#contact-msg-header');
    var $sendingMsg = $('#sending-info');
    var $notYou = $('#not-you');

    // update page title, nav text, and various titles across the page
    document.title = newlang === 'es' ? 'Luna | Contacto' : 'Luna | Contact';
    $contactTitle.html(newlang === 'es' ? 'Contacto' : 'Contact Us');
    $msgTitle.html(newlang === 'es' ? 'Tu Mensaje:' : 'Your Message:');
    $sendingMsg.html(newlang === 'es' ? 'Enviar mensaje como:' : 'Sending message as:');
    $notYou.html(newlang === 'es' ? 'No eres tú?' : 'Not you?');
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    applyMainLanguageChange(language);
    applyNavLanguageChange(language);
    for (let i = 0; i < cntTextFields.length; i++) {
        cntTextFields[i].getText(language);
    }
    for (let i = 0; i < cntDualImages.length; i++) {
        cntDualImages[i].getImg(language);
    }
}

$('#contact-form').on('submit',  function(e) {
    var message = $('#submit-txtarea').val();
    if (message.length >= 1000) {
        alert("Your message should be less than 1000 characters.");
        e.preventDefault() // prevent form submission
    }
});
