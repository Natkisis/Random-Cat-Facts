/**
 * Приложение которое:
 * 1. Получает случайный факт о котах (Cat Facts API)
 * 2. Получает случайную картинку кота (The Cat API) 
 * 3. Выводит факт и картинку на страницу
 * 4. Добавляет кнопку "Еще котик!" для обновления

// API для фактов: https://catfact.ninja/fact
// API для картинок: https://api.thecatapi.com/v1/images/search
**/

window.addEventListener("load", function () {

  const catFactAPI = 'https://catfact.ninja/fact';
  const catImageAPI = 'https://api.thecatapi.com/v1/images/search';
  const moreBtn = document.querySelector('#more-btn');

  async function getCatData() {
    
    showLoader();
    
    try {
      const [factResponse, imageResponse] = await Promise.all([
        fetch(catFactAPI).then(r => r.json()),
        fetch(catImageAPI).then(r => r.json())
      ]);

      const fact = factResponse.fact;
      const imageUrl = imageResponse[0].url;

      document.getElementById('fact').textContent = fact;
      document.getElementById('cat-image').src = imageUrl;

    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      hideLoader();
    }
  }

  function showLoader() {
    document.getElementById('cat-image').classList.add('hidden');
    document.getElementById('loader').classList.remove('hidden');
  }

  function hideLoader() {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('cat-image').classList.remove('hidden');
  }

  getCatData();

  moreBtn.addEventListener('click', getCatData);

});

