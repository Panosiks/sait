
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

// Галерея проектов
function openGallery(imgElement) {
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('project-full-img');
    const captionText = document.getElementById('project-caption');
    
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = imgElement.src;
        
        // Пытаемся получить подпись из figcaption или alt
        const figcaption = imgElement.closest('figure')?.querySelector('figcaption');
        captionText.textContent = figcaption ? figcaption.textContent : imgElement.alt;
    }
}

function closeProjectGallery() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ИИ-помощник для генерации вопросов
document.addEventListener('DOMContentLoaded', () => {
    const topicInput = document.getElementById('topic-input');
    const questionsCount = document.getElementById('questions-count');
    const countValue = document.getElementById('count-value');
    const generateBtn = document.getElementById('generate-btn');
    const questionsOutput = document.getElementById('questions-output');

    // Обновление значения счетчика при перемещении ползунка
    if (questionsCount) {
        questionsCount.addEventListener('input', () => {
            countValue.textContent = questionsCount.value;
        });
    }

    // Генерация вопросов
    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            const topic = topicInput.value.trim();
            const count = parseInt(questionsCount.value);

            if (!topic) {
                questionsOutput.innerHTML = '<p style="color: #e74c3c;">⚠️ Пожалуйста, введите тему для генерации вопросов.</p>';
                return;
            }

            // Показываем индикатор загрузки
            questionsOutput.innerHTML = '<div class="loading-spinner">⏳ Генерация вопросов...</div>';

            try {
                // Здесь можно подключить реальный API (например, GigaChat, OpenAI и т.д.)
                // Пока используем имитацию генерации
                const questions = await generateQuestions(topic, count);
                
                let html = '<h3>Вопросы по теме: "' + topic + '"</h3><ol>';
                questions.forEach((q, index) => {
                    html += '<li>' + q + '</li>';
                });
                html += '</ol>';
                
                questionsOutput.innerHTML = html;
            } catch (error) {
                questionsOutput.innerHTML = '<p style="color: #e74c3c;">❌ Ошибка при генерации вопросов: ' + error.message + '</p>';
            }
        });
    }

    // Функция генерации вопросов (имитация)
    async function generateQuestions(topic, count) {
        // Задержка для имитации запроса к API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Шаблоны для генерации вопросов
        const templates = [
            `Что такое ${topic} и как это работает?`,
            `Какие основные принципы ${topic}?`,
            `Какие преимущества у ${topic}?`,
            `Какие недостатки у ${topic}?`,
            `Как применить ${topic} на практике?`,
            `Какие инструменты используются в ${topic}?`,
            `Какие есть альтернативы ${topic}?`,
            `Какие лучшие практики для ${topic}?`,
            `Какие типичные ошибки при работе с ${topic}?`,
            `Как ${topic} связано с другими технологиями?`
        ];

        // Перемешиваем и берем нужное количество
        const shuffled = templates.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    // Обработчик для модального окна галереи проектов
    const projectModal = document.getElementById('project-modal');
    const projectCloseBtn = document.querySelector('.project-modal-close');
    
    if (projectModal && projectCloseBtn) {
        projectCloseBtn.onclick = closeProjectGallery;
        projectModal.onclick = (e) => {
            if (e.target !== document.getElementById('project-full-img')) {
                closeProjectGallery();
            }
        };
    }
});