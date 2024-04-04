interface State {
    name: string;
    capital: string;
}
const state: State = {};
state.name = 'New York'; // OK
state.capital = 'Albany'; // OK
