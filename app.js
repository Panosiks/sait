
document.addEventListener('DOMContentLoaded', () => {
    // Табы
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');

            // Убираем активный класс у всех кнопок и контента
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Добавляем активный класс нужным элементам
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');

            // Сохраняем активную вкладку
            localStorage.setItem('activeTab', target);
        });
    });

    // Восстановление активной вкладки после перезагрузки
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        const targetTab = document.querySelector(`[data-target="${savedTab}"]`);
        if (targetTab) targetTab.click();
    }

    // Тема оформления
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeBtnText(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeBtnText(newTheme);
    });

    function updateThemeBtnText(theme) {
        themeBtn.textContent = theme === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема';
    }

    // Загрузка данных
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderCourses(data.courses);
            renderProjects(data.projects);
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));

    function renderCourses(courses) {
        const container = document.getElementById('courses-grid');
        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<h3>${course.title}</h3><p>${course.platform}</p>`;
            container.appendChild(card);
        });
    }

    function renderProjects(projects) {
        const container = document.getElementById('projects-container');
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.marginBottom = '2rem';
            card.innerHTML = `
                <h3 style="color: var(--accent-color);">${project.mdk}</h3>
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
            `;
            container.appendChild(card);
        });
    }
});
// Ждем загрузки документа
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('full-cert-img');
    const closeBtn = document.querySelector('.close-modal');

    // Находим все ссылки на сертификаты
    document.querySelectorAll('.view-cert').forEach(link => {
        link.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src; // Берем адрес картинки
            modal.style.display = "block"; // Показываем окно
            modalImg.src = imgSrc; // Вставляем фото в окно
        });
    });

    // Закрытие при клике на крестик или на любое место фона
    const closeModal = () => modal.style.display = "none";
    
    closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
        if (e.target !== modalImg) closeModal();
    };
});