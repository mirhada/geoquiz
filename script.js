ymaps.ready(init);

function init() {
    var myPlacemark,
        myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 3
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getCountry(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'Здесь'
        }, {
            preset: 'islands#yellowDotIconWithCaption',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getCountry(coords) {
        ymaps.geocode(coords).then(function (res) {
            CountryName = res.geoObjects.get(0).properties.get('metaDataProperty.GeocoderMetaData.AddressDetails.Country.CountryName');
            console.log(CountryName);  // Выводим в консоль название старны по клику 
        });
    }
}
// Вопросы для викторины
const myQuestions = [
    {
    question: "Mamma mia! Мы приготовили лучшую пасту в твоей жизни, а ты не хочешь к нам приехать!",
    correctAnswer: "Италия"
    },
    {
    question: "Да, возможно отсюда тяжело пройти квест, но взамен им дали ром и сигары.",
    correctAnswer: "Куба"
    },
    {
    question: "Какая боль! Какая боль! Тыкни на победившего.",
    correctAnswer: "Аргентина"
    }
];

function buildQuiz() {
    // Тут храним выход HTML
    const output = [];

    // Для каждого вопроса
    myQuestions.forEach((currentQuestion, questionNumber) => {
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
         </div>`
      );
    });

    // Собираем наш выход в строку и добавляем в HTML
    quizContainer.innerHTML = output.join("");
}

const quizContainer = document.querySelector(".quiz");
// Создаём массив для записи ответов
var answers = [];
var CountryName; 
// Добавление страны в массив ответов
function pushAnswer(){ 
    answers.push(CountryName); 
    console.log(answers); 
};



function showResults() {
    pushAnswer();
    slides[currentSlide].classList.remove("active-slide");
    submitButton.style.display = "none";
    // Считаем правильные ответы
    let numCorrect = 0;

    // Проверка на правильность ответа 
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answer = answers[questionNumber];
      if (answer === currentQuestion.correctAnswer) {
        numCorrect++;
      } 
    });
    // Количество правильных ответов
    resultsContainer.innerHTML = `${numCorrect} из ${myQuestions.length}`;
}

const submitButton = document.querySelector(".submitAll");
// Функция для смены вопросов
function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === slides.length - 1) {
      submitButton.style.display = "inline-block";
      confirmButton.style.display = "none";
    } else {
      submitButton.style.display = "none";
    }
}
// Переход на следующий слайд
function showNextSlide() {
  showSlide(currentSlide + 1);
};

const resultsContainer = document.querySelector(".results");

buildQuiz();

const slides = document.querySelectorAll(".slide");
// Обнуляем слайд
let currentSlide = 0;
showSlide(0);

submitButton.addEventListener("click", showResults);
const confirmButton = document.querySelector(".submit");
confirmButton.addEventListener('click',() => {    
     pushAnswer();
     showNextSlide();    
});
/* Start Screen Fade  */
function fadeOutEffect() {
    var fadeTarget = document.querySelector(".start");
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.05;
        } else {
            clearInterval(fadeEffect);
            fadeTarget.style.display = "none";
            document.querySelector(".quiz-container").style.display = "block";
        }
    }, 1);
}



document.querySelector(".start-btn").addEventListener('click', fadeOutEffect);





