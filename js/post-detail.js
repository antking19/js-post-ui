import dayjs from 'dayjs';
import postApi from './api/postApi';
import { registerLightBox, setTextContent } from './utils';

function renderPostDetail(post) {
    setTextContent(document, '#postDetailTitle', post.title);
    setTextContent(document, '#postDetailAuthor', post.author);
    setTextContent(
        document,
        '#postDetailTimeSpan',
        dayjs(post.updatedAt).format('DD/MM/YYYY HH:mm')
    );
    setTextContent(document, '#postDetailDescription', post.description);
    const heroImage = document.getElementById('postHeroImage');
    if (heroImage) {
        heroImage.style.backgroundImage = `url('${post.imageUrl}')`;

        heroImage.addEventListener('error', () => {
            heroImage.src = 'https://placehold.co/1368x400';
        });
    }

    const editPageLink = document.getElementById('goToEditPageLink');
    if (editPageLink) {
        editPageLink.href = `/add-edit-post.html?id=${post.id}`;

        editPageLink.innerHTML = `<i class='fas fa-edit'></i> Edit Post`;
    }
}

(async () => {
    registerLightBox({
        modalId: 'lightbox',
        imgSelector: 'img[data-id="lightboxImg"]',
        prevSelector: 'button[data-id="lightboxPrev"]',
        nextSelector: 'button[data-id="lightboxNext"]',
    });

    registerLightBox({
        modalId: 'lightbox',
        imgSelector: 'img[data-id="lightboxImg"]',
        prevSelector: 'button[data-id="lightboxPrev"]',
        nextSelector: 'button[data-id="lightboxNext"]',
    });

    registerLightBox({
        modalId: 'lightbox',
        imgSelector: 'img[data-id="lightboxImg"]',
        prevSelector: 'button[data-id="lightboxPrev"]',
        nextSelector: 'button[data-id="lightboxNext"]',
    });

    try {
        // get URL
        // fetch api
        // render post detail

        const searchParams = new URLSearchParams(window.location.search);
        const postId = searchParams.get('id');
        if (!postId) {
            console.log('PostID not found');
            return;
        }

        // fetch API
        const post = await postApi.getById(postId);
        renderPostDetail(post);
    } catch (error) {
        console.log('Not Found ', error);
    }
})();
