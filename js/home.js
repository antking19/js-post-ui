import postApi from './api/postApi';
import { initPagination, initSearch, renderPostList, renderPagination } from './utils';

// set URL sau dấu chấm hỏi ?_page=1&_limit=6
// filterName = "_page" , "_limit"
// filterValue = "1" , "6"
async function handleFilterChange(filterName, filterValue) {
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);
    if (filterName === 'title_like') url.searchParams.set('_page', 1);

    history.pushState({}, '', url);

    // console.log(url.searchParams);
    // console.log(postApi.getAll(url.searchParams));
    const { data, pagination } = await postApi.getAll(url.searchParams);
    // console.log(data);
    renderPostList(data);
    renderPagination('pagination', pagination);
}

// function initURL() {
//     const url = new URL(location);
//     // url.searchParams.set(filterName, filterValue);
//     if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
//     if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

//     history.pushState({}, '', url);

//     return url.searchParams
// }

(async () => {
    try {
        const url = new URL(location);
        // url.searchParams.set(filterName, filterValue);
        if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
        if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

        history.pushState({}, '', url);

        const queryParams = url.searchParams;

        initPagination({
            elementId: 'pagination',
            defaultParams: queryParams,
            onChange: (page) => handleFilterChange('_page', page),
        });
        initSearch({
            elementId: 'searchInput',
            defaultParams: queryParams,
            onChange: (value) => handleFilterChange('title_like', value),
        });

        // initURL();
        // const queryParams = {
        //     _page: 1,
        //     _limit: 6,
        // };

        // Lấy url sau dấu chấm hỏi ?_page=1&_limit=6
        // const queryParams = new URLSearchParams(window.location.search);
        // console.log(queryParams.toString());

        const { data, pagination } = await postApi.getAll(queryParams);
        // console.log(data);
        renderPostList(data);
        renderPagination('pagination', pagination);
    } catch (error) {
        console.log('Failed Error: ', error);
    }

    await postApi.update({
        id: 'lea11nlelf3n3umv',
        title: 'Numquam adipisci 1111',
    });
})();
