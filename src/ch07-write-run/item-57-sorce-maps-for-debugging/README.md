# source map이 있는 경우와 없는 경우를 비교하기 위한 예제

해당 폴더의 root에서 tsc 명령어 실행

## source map이 없는 경우 -> 변환된 js 소스 그대로

-   tsc 명령어를 실행해서 js 파일을 생성
-   item-57-source-maps-for-debugging.html 파일을 브라우저에서 열고 개발자 모드를 켠다
-   click me 버튼을 하나씩 클릭해서 변환된 js 파일이 실제 코드와 어떤 차이가 있는지 비교해본다

## source map이 있는 경우

-   tsconfig.json 파일의 // "sourceMap": true 부분의 주석을 푼다
-   이하 절차는 위의 없는 경우와 동일
