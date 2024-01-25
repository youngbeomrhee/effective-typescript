{
    // 타입 체커 동작하지 않음
    let age: number;
    age = '12';
    age = '12' as any;
    // 타입 안정성이 없어져서 의도한 것과 다른 결과가 나옴 (13이 아니라 121)
    age += 1;
}
() => {
    // 함수 시그니처 무시
    function calculateAge(birthDate: Date): number {
        return birthDate.getTime();
    }
    let birthDate: any = '1990-01-19';
    calculateAge(birthDate); // 정상
};
{
    // 에디터를 활용한 이름변경 동작하지 않음
    interface Person {
        firstName: string;
        last: string;
    }
    const formatName = (p: Person) => `${p.firstName} ${p.last}`;
    const formatNameAny = (p: any) => `${p.first} ${p.last}`;
}

(() => {
    // 코드 리팩터링 때 버그를 감춤
    // interface ComponentProps {
    //     onSelectItem: (item: any) => void;
    // }
    function renderSelector(props: ComponentProps) {}

    let selectedId: number = 0;

    function handleSelectItem(item: any) {
        selectedId = item.id;
    }
    renderSelector({ onSelectItem: handleSelectItem });

    // id가 필요해서 아래와 같이 리펙토링하면 타입체크는 모두 통과하지만 런타임에는 오류 발생
    interface ComponentProps {
        onSelectItem: (id: number) => void;
    }
})();
