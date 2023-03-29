import axiosClient from './api/axiosClient';
import postApi from './api/postApi';

async function main() {
    // const response = await axiosClient.get('/posts');
    // console.log(response);

    const queryParams = {
        _page: 1,
        _limit: 5,
    };

    const respones = await postApi.getAll(queryParams);
    console.log(respones);
}

main();
