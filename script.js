document.addEventListener('DOMContentLoaded', function () {
    var mySwiper = new Swiper('.swiper-container', {
        // Настройки слайдера
        loop: true, // Включить бесконечный цикл
        mousewheel: true, // Включить прокрутку мыши
        slidesPerView: 3, // Количество отображаемых слайдов
        slidesPerGroup: 1,
        spaceBetween: 20,
        grabCursor: true, // Исправленная опечатка
    });
});

var searchData;

// Асинхронная функция для загрузки JSON из файла
async function loadJSON() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error('Ошибка HTTP: ' + response.status);
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
    }
}

// Асинхронная функция для выполнения всего кода, использующего загруженные данные
async function processData() {
    try {
        searchData = await loadJSON();
        // Здесь можно выполнять дополнительные действия с загруженными данными
    } catch (error) {
        console.error('Ошибка обработки данных:', error);
    }
}

// Вызываем функцию для выполнения всего кода загрузки
processData();



document.getElementById("searchInput").addEventListener("input", function () {
    var searchTerm = this.value.toLowerCase();
    const autocompleteResults = document.getElementById('autocomplete-results');

    // Очищаем результаты предыдущего поиска
    autocompleteResults.innerHTML = "";

    // Проверяем, что введено не менее 3-х символов
    if (searchTerm.length >= 3) {
        // Фильтруем данные из JSON-объекта
        var filteredData = searchData.searchData.filter(function (item) {
            return item.toLowerCase().includes(searchTerm);
        });

        // Выводим результаты
        filteredData.forEach(function (item) {
            var resultItem = document.createElement("li");
            resultItem.textContent = item;
            resultItem.classList.add("result")
            resultItem.addEventListener("click", () => {
                var input = document.getElementById("searchInput")
                input.value = item;
                autocompleteResults.style.display = 'none'
            })
            autocompleteResults.appendChild(resultItem);
        });
        if (filteredData.length > 0) {
            autocompleteResults.style.display = 'block';
        } else {
            autocompleteResults.style.display = 'none';
        }
    }
});

// Валидация формы
document.getElementById("searchForm").addEventListener("submit", function (event) {
    var searchTerm = document.getElementById("searchInput").value;

    // Пример валидации: требуется, чтобы было введено не менее 3-х символов
    if (searchTerm.length < 3) {
        alert("Введите не менее 3-х символов для поиска.");
        event.preventDefault(); // Отменяем отправку формы
    }
});

// Глобальное событие клика для скрытия результатов автокомплита
document.addEventListener('click', function (event) {
    const target = event.target;
    const searchForm = document.getElementById('searchForm');
    const autocompleteResults = document.getElementById('autocomplete-results');
    // Проверяем, был ли клик вне области поиска и результатов автокомплита
    if (!searchForm.contains(target) && !autocompleteResults.contains(target)) {
        autocompleteResults.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var notifications = document.querySelectorAll(".navbar__notification");

    notifications.forEach(function (notification) {
        // Проверяем, есть ли контент внутри элемента
        if (notification.textContent.trim() !== "") {
            // Если есть контент, делаем элемент видимым
            notification.style.display = "block";
        }
    });
});