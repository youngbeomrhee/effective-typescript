{
    interface State {
        pageText: string;
        isLoading: boolean;
        error?: string;
    }

    let currentPage: string;

    function renderPage(state: State) {
        if (state.error) {
            // TODO: currentPage가 외부변수를 참조하고 있음
            return `Error! Unable to load ${currentPage}: ${state.error}`;
        } else if (state.isLoading) {
            return `Loading ${currentPage}...`;
        }
        return `<h1>${currentPage}</h1>\n${state.pageText}`;
    }

    function getUrlForPage(p: string) {
        return '';
    }

    async function changePage(state: State, newPage: string) {
        state.isLoading = true;
        try {
            const response = await fetch(getUrlForPage(newPage));
            if (!response.ok) {
                throw new Error(
                    `Unable to load ${newPage}: ${response.statusText}`
                );
            }
            const text = await response.text();
            // TODO: finally로 이동
            state.isLoading = false;
            state.pageText = text;
        } catch (e) {
            state.error = '' + e;
        }
    }
}
{
    // 개선
    interface RequestPending {
        state: 'pending';
    }
    interface RequestError {
        state: 'error';
        error: string;
    }
    interface RequestSuccess {
        state: 'ok';
        pageText: string;
    }
    type RequestState = RequestPending | RequestError | RequestSuccess;

    interface State {
        currentPage: string;
        requests: { [page: string]: RequestState };
    }

    function getUrlForPage(p: string) {
        return '';
    }
    function renderPage(state: State) {
        const { currentPage } = state;
        const requestState = state.requests[currentPage];
        switch (requestState.state) {
            case 'pending':
                return `Loading ${currentPage}...`;
            case 'error':
                return `Error! Unable to load ${currentPage}: ${requestState.error}`;
            case 'ok':
                return `<h1>${currentPage}</h1>\n${requestState.pageText}`;
        }
    }

    async function changePage(state: State, newPage: string) {
        state.requests[newPage] = { state: 'pending' };
        state.currentPage = newPage;
        try {
            const response = await fetch(getUrlForPage(newPage));
            if (!response.ok) {
                throw new Error(
                    `Unable to load ${newPage}: ${response.statusText}`
                );
            }
            const pageText = await response.text();
            state.requests[newPage] = { state: 'ok', pageText };
        } catch (e) {
            state.requests[newPage] = { state: 'error', error: '' + e };
        }
    }
}
{
    // CockpitControls 예제처럼 논리적인 계산이나 설계의 문제가 아니라 꼭 필요한 경우라면 2개의 비행기의 스틱을 기계적으로 연결하여 한쪽이 올리면 다른 한쪽도 올라가도록 강제하는 것처럼 애초에 기계적으로 불가능하게 만드는게 나은 경우도 있다.
}
