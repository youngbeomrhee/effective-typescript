const utils = {
    buildColumnInfo(s: any, name: string): any {},
};
declare let appState: { dataSchema: unknown };
function getColumnInfo(name: string): any {
    return utils.buildColumnInfo(appState.dataSchema, name); // Returns any
}

// 아래와 같이 선언하면 전체 모듈에 any 타입이 부여
// declare module 'my-module';
import { someMethod, someSymbol } from 'my-module';

const pt1 = {
    x: 1,
    y: 2,
};

const pt2 = someMethod(pt1, someSymbol);
