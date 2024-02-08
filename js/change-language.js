var currentLang = 'en';

function toggleLanguage() {
    /*
       Swaps between Spanish and English, and update the page's text to the new lang
    */
    let templang = 'en';
    if (currentLang === 'en') {
        templang = 'es';
    }
    currentLang = templang;

    document.documentElement.lang = currentLang; // update the page's lang attribute
    applyNavLanguageChange(currentLang);
    applyMainLanguageChange(currentLang)
}


function applyNavLanguageChange(newLang) {
    /*
        Applies language change between english and spanish for the navigation bar's text
    */
    const changeLangImg = document.getElementById('change-language');

    if (newLang === 'es') {  // toggle the image between saying 'eng' and 'esp'
        changeLangImg.src = `images/buttons/globe-white-en.webp`;
        changeLangImg.alt = `Button that changes language to English`;
    } else {
        changeLangImg.src = `images/buttons/globe-white-es.webp`;
        changeLangImg.alt = `Button that changes language to Spanish`;
    }

    // manually update the nav's text fields
    document.getElementById('home-nav').innerHTML = newLang === 'es' ? 'Inicio' : 'Home';
    document.getElementById('bios-nav').innerHTML = newLang === 'es' ? 'Sobre' : 'About';
    document.getElementById('media-nav').innerHTML = newLang === 'es' ? 'Medios' : 'Media';
}

function DualLangeTextField(filename, element) {
    this.filename = filename; // the name of the file - used as /text/{language}/{filename}
    this.element = element; // the element whose inner html should be set to this.getText()
    this.getText = function(lang) {
        // method of retrieving file contents from server found at:
        // https://stackoverflow.com/a/25796149
        let req = new XMLHttpRequest();
        req.open("GET", `/text/${lang}/${this.filename}`, true);
        req.send();
        console.log();
        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status === 200) {
                this.element.innerHTML = req.responseText;
                return req.responseText;
            }
        }
    }
    return this
}