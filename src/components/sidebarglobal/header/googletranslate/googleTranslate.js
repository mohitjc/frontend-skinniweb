import { useEffect } from "react";

const GoogleTranslate = () => {

    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en", // Set to the default language of your page
                autoDisplay: false,
                includedLanguages: "en,es,ht", // List the languages you want to support
            },
            "google_translate_element"
        );
    };

    useEffect(() => {
        const addScript = document.createElement("script");
        addScript.setAttribute(
            "src",
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);

        // Ensure the callback function is defined before script loading
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    return (
        <>
            <div id="google_translate_element"></div>
        </>
    );
};

export default GoogleTranslate;
