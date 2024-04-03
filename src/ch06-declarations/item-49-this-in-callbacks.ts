{
    class C {
        vals = [1, 2, 3];
        logSquares() {
            for (const val of this.vals) {
                console.log(val * val);
            }
        }
    }

    // 일반적인 호출상황
    const c = new C();
    c.logSquares();

    // 메서드를 다른 변수에 할당
    const method = c.logSquares;
    method();
}
{
    // 해결책 1:
    class C {
        vals = [1, 2, 3];
        logSquares = () => {
            for (const val of this.vals) {
                console.log(val * val);
            }
        };
    }

    // 일반적인 호출상황
    const c = new C();
    c.logSquares();

    // 메서드를 다른 변수에 할당하면 this가 undefined가 된다
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes#%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85_%EB%B0%8F_%EC%A0%95%EC%A0%81_%EB%A9%94%EC%84%9C%EB%93%9C%EB%A5%BC_%EC%82%AC%EC%9A%A9%ED%95%9C_this_%EB%B0%94%EC%9D%B8%EB%94%A9
    const method = c.logSquares;
    method();
}
{
    // dom에 바인딩 된 this
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#this_in_dom_event_handlers
    document.querySelector('input')!.addEventListener('change', function (e) {
        console.log(this); // Logs the input element on which the event fired.
    });
}
declare function makeButton(props: { text: string; onClick: () => void }): void;
declare let el: HTMLElement;

{
    {
        // this가 의도한대로 binding 되지 않는 예제
        class ResetButton {
            render() {
                return makeButton({ text: 'Reset', onClick: this.onClick });
            }
            onClick() {
                console.log;
                alert(`Reset ${this}`);
            }
        }
    }
    {
        class ResetButton {
            constructor() {
                // 생성자에서 해당 메서드에 this를 binding
                this.onClick = this.onClick.bind(this);
            }
            render() {
                return makeButton({ text: 'Reset', onClick: this.onClick });
            }
            onClick() {
                console.log(this);
                alert(`Reset ${this}`);
            }
        }
    }
    {
        class ResetButton {
            render() {
                return makeButton({ text: 'Reset', onClick: this.onClick });
            }
            // 화살표 함수를 사용해서 this가 Lexical context의 값으로 고정
            // 실제 트랜스파일 된 js를 보면 _this라는 변수에 this를 할당하는 패턴으로 변환된다
            onClick = () => {
                console.log(this);
                alert(`Reset ${this}`);
            };
        }
    }
    {
        // callback 함수의 매개변수로 this를 받도록 하고 타입을 명시한다. 호출시에는 call을 통해 this를 지정한다
        // https://www.typescriptlang.org/docs/handbook/2/functions.html#this-parameters
        // -> 함수의 파라미터에 일반적으로 this 허용되지 않고 타입을 명시하기 위한 용도로만 사용 가능하다
        function addKeyListener(
            el: HTMLElement,
            fn: (this: HTMLElement, e: KeyboardEvent) => void
        ) {
            el.addEventListener('keydown', (e) => {
                fn.call(el, e);
            });
        }
        // declare let el: HTMLElement;
        addKeyListener(el, function (e) {
            this.innerHTML; // OK, "this" has type of HTMLElement
        });

        // 화살표 함수로 작성하고 this를 참조하려고 하면 타입스크립트가 문제를 체크해줌
        addKeyListener(el, (e) => {
            this.innerHTML; // Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)
        });
    }
}
