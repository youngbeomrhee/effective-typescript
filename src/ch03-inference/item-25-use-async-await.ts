function fetchURL(url: string, cb: (response: string) => void) {
    cb(url);
}
{
    const _cache: { [url: string]: string } = {};
    function fetchWithCache(url: string, callback: (text: string) => void) {
        if (url in _cache) {
            callback(_cache[url]);
        } else {
            fetchURL(url, (text) => {
                _cache[url] = text;
                callback(text);
            });
        }
    }
    let requestStatus: 'loading' | 'success' | 'error';
    function getUser(userId: string) {
        fetchWithCache(`/user/${userId}`, (profile) => {
            requestStatus = 'success';
        });
        // TODO: 잘못된 예제. 아래 line은 fetchWithCache 위에 기술해야 함
        requestStatus = 'loading';
    }
}
{
    const _cache: { [url: string]: string } = {};
    async function fetchWithCache(url: string) {
        if (url in _cache) {
            return _cache[url];
        }
        const response = await fetch(url);
        const text = await response.text();
        _cache[url] = text;
        return text;
    }

    let requestStatus: 'loading' | 'success' | 'error';
    async function getUser(userId: string) {
        requestStatus = 'loading';
        const profile = await fetchWithCache(`/user/${userId}`);
        requestStatus = 'success';
    }
}
