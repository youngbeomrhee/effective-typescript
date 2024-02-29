import _ from 'lodash';

{
    const csvData = '...';
    const rawRows = csvData.split('\n');
    const headers = rawRows[0].split(',');
    // 직접 구현
    const rowsA = rawRows.slice(1).map((rowStr) => {
        const row = {};
        rowStr.split(',').forEach((val, j) => {
            row[headers[j]] = val;
            // ~~~~~~~~~~~~~~~ No index signature with a parameter of
            //                 type 'string' was found on type '{}'
        });
        return row;
    });
    const rowsB = rawRows.slice(1).map((rowStr) =>
        rowStr.split(',').reduce(
            (row, val, i) => ((row[headers[i]] = val), row),
            // ~~~~~~~~~~~~~~~ No index signature with a parameter of
            //                 type 'string' was found on type '{}'
            {}
        )
    );

    // 라이브러리 사용
    const rows = rawRows
        .slice(1)
        .map((rowStr) => _.zipObject(headers, rowStr.split(',')));
}
interface BasketballPlayer {
    name: string;
    team: string;
    salary: number;
}
declare const rosters: { [team: string]: BasketballPlayer[] };
{
    let allPlayers = [];
    // ~~~~~~~~~~ Variable 'allPlayers' implicitly has type 'any[]'
    //            in some locations where its type cannot be determined
    for (const players of Object.values(rosters)) {
        allPlayers = allPlayers.concat(players);
        // ~~~~~~~~~~ Variable 'allPlayers' implicitly has an 'any[]' type
    }
}
{
    let allPlayers: BasketballPlayer[] = [];
    for (const players of Object.values(rosters)) {
        allPlayers = allPlayers.concat(players); // OK
    }
}
{
    const allPlayers = Object.values(rosters).flat();
}
