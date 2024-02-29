{
    type Language = 'JavaScript' | 'TypeScript' | 'Python';
    interface GovernedLanguage {
        language: Language;
        organization: string;
    }

    function complain(language: GovernedLanguage) {
        /* ... */
    }

    complain({ language: 'TypeScript', organization: 'Microsoft' }); // OK

    const ts = {
        language: 'TypeScript',
        organization: 'Microsoft',
    };

    // TODO: 1
    /*
    const ts: GovernedLanguage = {
        language: 'TypeScript',
        organization: 'Microsoft',
    }
    */

    // TODO: 2
    /*
    const ts = {
        language: 'TypeScript',
        organization: 'Microsoft',
    } as const;
    */

    complain(ts);
}
