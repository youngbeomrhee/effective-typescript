/* eslint-disable no-inner-declarations */
{
    // 사용자 정의 타입 가드가 적용된 함수
    function isInputElement(el: HTMLElement): el is HTMLInputElement {
        return 'value' in el;
    }

    function getElementContent(el: HTMLElement) {
        if (isInputElement(el)) {
            el; // Type is HTMLInputElement
            return el.value;
        }
        el; // Type is HTMLElement
        return el.textContent;
    }
}
