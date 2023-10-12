// Вкладки у секції Our services повинні перемикатися при натисканні мишею. Текст та картинки для інших вкладок додати будь-які.

let activeTab = document.querySelector('.services-nav-wrapper li:first-child');

function showContent(tab, tabElement) {
    const contentBlocks = document.querySelectorAll('.services-content-card');
    contentBlocks.forEach(block => {
        block.style.display = 'none';
    });

    const selectedContent = document.getElementById(`${tab}Content`);
    selectedContent.style.display = 'flex';

    const navItems = document.querySelectorAll('.services-nav-wrapper li');
    navItems.forEach(item => {
        item.classList.remove('active-services');
    });
    tabElement.classList.add('active-services');

    activeTab = tabElement;

    event.preventDefault();
}

// Кнопка Load more у секції Our amazing work імітує завантаження з сервера нових картинок. При її натисканні в секції знизу мають з'явитись ще 12 картинок (зображення можна взяти будь-які). Після цього кнопка зникає.

function loadMoreImages() {
    const additionalImagesContainer = document.getElementById('additional-images');

    const imagePaths = [
        './images/ourwork1.png',
        './images/ourwork2.png',
        './images/ourwork3.png',
        './images/ourwork4.png',
        './images/ourwork5.png',
        './images/ourwork6.png',
        './images/ourwork7.png',
        './images/ourwork8.png',
        './images/ourwork9.png',
        './images/ourwork10.png',
        './images/ourwork11.png',
        './images/ourwork2.png'
    ];

    for (let i = 0; i < 12; i++) {
        const newImage = document.createElement('img');
        newImage.src = imagePaths[i % imagePaths.length];
        newImage.id = `additional-image-${i}`;
        additionalImagesContainer.appendChild(newImage);
    }

    const additionalImagesHeight = additionalImagesContainer.clientHeight;

    const ourWorkWrapper = document.querySelector('.our-work-wrapper');
    const currentHeight = ourWorkWrapper.clientHeight;

    ourWorkWrapper.style.height = `${currentHeight + additionalImagesHeight}px`;

    const loadMoreButton = document.querySelector('.our-work-load-more-btn');
    loadMoreButton.style.display = 'none';
}

// Кнопки на вкладці Our amazing work є "фільтрами продукції". Попередньо кожній із картинок потрібно присвоїти одну з чотирьох категорій, на ваш розсуд (на макеті це Graphic design, Web design, Landing pages, Wordpress).При натисканні на кнопку категорії необхідно показати лише ті картинки, які належать до цієї категорії. All показує картинки з усіх категорій. Категорії можна перейменувати, картинки для категорій взяти будь-які.

function filterItems(category) {
    event.preventDefault();
    const allItems = document.querySelectorAll('.our-work-img, .our-work-img-special');

    allItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Карусель на вкладці What people say about theHam має бути робочою, по кліку як на іконку фотографії внизу, так і на стрілки вправо-вліво. У каруселі має змінюватися як картинка, і текст. Карусель обов'язково має бути з анімацією.

let currentImageIndex = 2;  // Початковий індекс вибраної картинки

function selectImage(index) {

    event.preventDefault()
    currentImageIndex = index;
    updateSelectedImage();

    // Відображаємо відповідну about-card-info
    const aboutCardInfos = document.querySelectorAll('.about-card-info');
    aboutCardInfos.forEach(info => info.classList.remove('active'));
    aboutCardInfos[currentImageIndex].classList.add('active');
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % 4;
    updateSelectedImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + 4) % 4;
    updateSelectedImage();
}

function updateSelectedImage() {
    const imageItems = document.querySelectorAll('.gallery-img-item');
    const selectedImage = document.querySelector('.selected-image-container img');
    const selectedCaption = document.querySelector('.selected-image-caption');
    const aboutCardInfos = document.querySelectorAll('.about-card-info');

    // Оновлюємо вибране зображення
    selectedImage.src = imageItems[currentImageIndex].querySelector('img').src;

    // Оновлюємо підпис
    const aboutCard = aboutCardInfos[currentImageIndex];
    const aboutCardHTML = aboutCard.innerHTML;
    selectedCaption.innerHTML = aboutCardHTML;

    // Знімаємо клас active з усіх підписів
    aboutCardInfos.forEach(info => info.classList.remove('active'));

    // Додаємо клас active тільки до відповідного підпису
    aboutCard.classList.add('active');

    // Знімаємо клас active з усіх картинок
    imageItems.forEach(item => item.classList.remove('active'));

    // Додаємо клас active тільки до відповідної картинки
    imageItems[currentImageIndex].classList.add('active');
}

// Оновлення підпису при завантаженні сторінки
window.onload = function () {
    updateSelectedImage();
    showContent('webdesign', activeTab);
};