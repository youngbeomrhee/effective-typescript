"use strict";
{
    // 타입 체커 동작하지 않음
    let age;
    age = '12';
    age = '12';
    // 타입 안정성이 없어져서 의도한 것과 다른 결과가 나옴 (13이 아니라 121)
    age += 1;
}
() => {
    // 함수 시그니처 무시
    function calculateAge(birthDate) {
        return birthDate.getTime();
    }
    let birthDate = '1990-01-19';
    calculateAge(birthDate); // 정상
};
{
    const formatName = (p) => `${p.firstName} ${p.last}`;
    const formatNameAny = (p) => `${p.first} ${p.last}`;
}
(() => {
    // 코드 리팩터링 때 버그를 감춤
    // interface ComponentProps {
    //     onSelectItem: (item: any) => void;
    // }
    function renderSelector(props) { }
    let selectedId = 0;
    function handleSelectItem(item) {
        selectedId = item.id;
    }
    renderSelector({ onSelectItem: handleSelectItem });
})();
