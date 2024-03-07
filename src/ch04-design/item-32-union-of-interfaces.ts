{
    interface Person {
        name: string;
        // These will either both be present or not be present
        placeOfBirth?: string;
        dateOfBirth?: Date;
    }
}
{
    interface Person {
        name: string;
        birth?: {
            place: string;
            date: Date;
        };
    }
    const alanT: Person = {
        name: 'Alan Turing',
        birth: {
            // ~~~~ Property 'date' is missing in type
            //      '{ place: string; }' but required in type
            //      '{ place: string; date: Date; }'
            place: 'London',
        },
    };

    function eulogize(p: Person) {
        console.log(p.name);
        const { birth } = p;
        if (birth) {
            console.log(`was born on ${birth.date} in ${birth.place}.`);
        }
    }
}
{
    interface Name {
        name: string;
    }

    interface PersonWithBirth extends Name {
        placeOfBirth: string;
        dateOfBirth: Date;
    }

    type Person = Name | PersonWithBirth;

    function eulogize(p: Person) {
        if ('placeOfBirth' in p) {
            p; // Type is PersonWithBirth
            const { dateOfBirth } = p; // OK, type is Date
        }
    }
}
