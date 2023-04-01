export function renderPagination(elementId, pagination) {
    const ulPagination = document.getElementById(elementId);
    const { _page, _limit, _totalRows } = pagination;

    if (!pagination || !ulPagination) return;

    // calc totalPages
    const totalPages = Math.ceil(_totalRows / _limit);
    // console.log(totalPages);

    // save page and totalPages to ulPagination
    ulPagination.dataset.page = _page;
    ulPagination.dataset.totalPages = totalPages;

    // check if enable/disable prev links
    if (_page <= 1) ulPagination.firstElementChild.classList.add('disabled');
    else ulPagination.firstElementChild.classList.remove('disabled');

    // check if enable/disable next links
    if (_page >= totalPages) ulPagination.lastElementChild.classList.add('disabled');
    else ulPagination.lastElementChild.classList.remove('disabled');
}

export function handlePrevClick(e) {
    e.preventDefault();
    console.log('prev click');

    const ulPagination = getUlPagination();
    if (!ulPagination) return;

    const page = Number.parseInt(ulPagination.dataset.page) || 1;

    if (page <= 1) return;

    handleFilterChange('_page', page - 1);
}

export function handleNextClick(e) {
    e.preventDefault();
    console.log('next click');

    const ulPagination = getUlPagination();
    if (!ulPagination) return;

    const page = Number.parseInt(ulPagination.dataset.page) || 1;
    const totalPages = ulPagination.dataset.totalPages;

    if (page >= totalPages) return;

    handleFilterChange('_page', page + 1);
}

export function initPagination({ elementId, defaultParams, onChange }) {
    const ulPagination = document.getElementById(elementId);
    if (!ulPagination) return;

    const prevClick = ulPagination.firstElementChild?.firstElementChild;
    if (prevClick) {
        prevClick.addEventListener('click', (e) => {
            e.preventDefault();

            const ulPagination = document.getElementById(elementId);
            if (!ulPagination) return;

            const page = Number.parseInt(ulPagination.dataset.page) || 1;

            if (page > 1) onChange?.(page - 1);
        });
    }

    const nextClick = ulPagination.lastElementChild?.lastElementChild;
    if (nextClick) {
        nextClick.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('next click');

            const ulPagination = document.getElementById(elementId);
            if (!ulPagination) return;

            const page = Number.parseInt(ulPagination.dataset.page) || 1;
            const totalPages = ulPagination.dataset.totalPages;

            if (page < totalPages) onChange?.(page + 1);
        });
    }
}
