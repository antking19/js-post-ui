import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { setTextContent, truncate } from './common';
dayjs.extend(relativeTime);

export function createPostElement(post) {
    if (!post) return;

    try {
        // console.log(post);
        const postTemplate = document.getElementById('postTemplate');
        const liElement = postTemplate.content.firstElementChild.cloneNode(true);
        if (!liElement) return;

        setTextContent(liElement, '[data-id="title"]', post.title);
        setTextContent(liElement, '[data-id="description"]', truncate(post.description, 100));
        setTextContent(liElement, '[data-id="author"]', post.author);
        setTextContent(
            liElement,
            '[data-id="timeSpan"]',
            ` - ${dayjs(post.updatedAt).fromNow()}`

            // dayjs(post.updatedAt).format('DD/MM/YYYY')
        );

        // const titleElement = liElement.querySelector('[data-id="title"]');
        // if (titleElement) titleElement.textContent = post.title;

        // const descriptionElement = liElement.querySelector('[data-id="description"]');
        // if (descriptionElement) descriptionElement.textContent = post.description;

        // const authorElement = liElement.querySelector('[data-id="author"]');
        // if (authorElement) authorElement.textContent = post.author;

        const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]');
        if (thumbnailElement) {
            thumbnailElement.src = post.imageUrl;

            thumbnailElement.addEventListener('error', () => {
                thumbnailElement.src = 'https://placehold.co/1368x400';
            });
        }

        const divElement = liElement.firstElementChild;
        if (divElement) {
            divElement.addEventListener('click', () => {
                window.location.assign(`/post-detail.html?id=${post.id}`);
            });
        }

        return liElement;
    } catch (error) {
        console.log('Failed to create post element');
    }
}

export function renderPostList(postList) {
    if (!Array.isArray(postList) || postList.length === 0) return;

    const ulElement = document.getElementById('postList');
    if (!ulElement) return;

    ulElement.textContent = '';

    postList.forEach((post) => {
        // console.log(post);
        const liElement = createPostElement(post);
        ulElement.appendChild(liElement);
    });
}
