const quizData = [
    {
        question: 'What is the capital of France?',
        answers: {
            a: 'Paris',
            b: 'London',
            c: 'Berlin'
        },
        correctAnswer: 'a'
    },
    {
        question: 'What is 2 + 2?',
        answers: {
            a: '3',
            b: '4',
            c: '5'
        },
        correctAnswer: 'b'
    },
    // Add more questions here
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    const output = [];

    quizData.forEach((question, index) => {
        const answers = [];

        for (const letter in question.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${index}" value="${letter}">
                    ${letter}: ${question.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question">${question.question}</div>
            <div class="answers">${answers.join('')}</div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');

    let score = 0;

    quizData.forEach((question, index) => {
        const answerContainer = answerContainers[index];
        const selector = `input[name=question${index}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === question.correctAnswer) {
            score++;
            answerContainers[index].style.color = 'lightgreen';
        } else {
            answerContainers[index].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

buildQuiz();

submitButton.addEventListener('click', showResults);