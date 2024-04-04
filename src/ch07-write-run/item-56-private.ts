{
    class Diary {
        private secret = 'cheated on my English test';
    }

    const diary = new Diary();

    diary.secret;

    (diary as any).secret; // OK
}

declare function hash(text: string): number;
{
    class PasswordChecker {
        checkPassword: (password: string) => boolean;
        constructor(passwordHash: number) {
            this.checkPassword = (password: string) => {
                return hash(password) === passwordHash;
            };
        }
    }

    const checker = new PasswordChecker(hash('s3cret'));
    checker.checkPassword('s3cret'); // Returns true
}
{
    class PasswordChecker {
        #passwordHash: number;

        constructor(passwordHash: number) {
            this.#passwordHash = passwordHash;
        }

        checkPassword(password: string) {
            return hash(password) === this.#passwordHash;
        }
    }

    const checker = new PasswordChecker(hash('s3cret'));
    checker.checkPassword('secret');
    checker.checkPassword('s3cret');
    console.log(checker.#passwordHash);
}
