{
    // document와 같은 전역객체에 임의의 속성 추가
    document.monkey = 'Tamarin'; // Property 'monkey' does not exist on type 'Document'.

    // 단언문 사용시 타입체커가 전혀 동작하지 않음
    (document as any).monky = 'Tamrin'; // Also OK, misspelled
    (document as any).monkey = /Tamarin/; // Also OK, wrong type
}

// interface의 보강 (augmentation) 사용
interface Document {
    /** Genus or species of monkey patch */
    monkey: string;
}
{
    document.monkey = 'Tamarin';
}

// 모듈화 할 경우 global 선언 추가
export {};
declare global {
    interface Document {
        /** Genus or species of monkey patch */
        monkey: string;
    }
}
// -> 보강이 전역적으로 적용되기 때문에 코드의 다른 부분이나 라이브러리로부터 분리할 수 없다
// "애플리케이션이 실행되는 동안 속성을 할당하면 실행 시점에서 보강을 적용할 방법이 없습니다"라는 문구는 토의 필요

// 더 구체적인 타입 단언문을 사용하는 방법
interface MonkeyDocument extends Document {
    /** Genus or species of monkey patch */
    monkey: string;
}

(document as MonkeyDocument).monkey = 'Macaque';
