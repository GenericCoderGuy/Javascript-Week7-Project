fetch('./quiz.json')
    .then((res) => res.json())
    .then((data) => {displayQuiz(data)});

function displayQuiz(data) {
    console.log(data.quiz1);

    const form = document.querySelector('.quiz-form');
    const result = document.querySelector('.result');
    let quizElement = document.getElementById('quiz');
    let quizHTML = '';
    correctAnswers = []

    for (let question of data.quiz1) {
        quizHTML += `
            <div class="bg-dark p-2 text-light bg-opacity-25 box border border-light rounded mb-5">
                <div class="mt-5">
                    <h2 class="d-flex justify-content-center">${question.number}:</h2>
                    <p class="d-flex justify-content-center" id="">${question.theQuestion}</p>
                </div>
                <div class="d-flex justify-content-center mb-5">
                    <div class="m-2">
                        <input type="radio" name="${question.id}" value="a">
                        ${question.answers.answer1}
                    </div>
                    <div class="m-2">
                        <input type="radio" name="${question.id}" value="b">
                        ${question.answers.answer2}
                    </div>
                    <div class="m-2">
                        <input type="radio" name="${question.id}" value="c">
                        ${question.answers.answer3}
                    </div>
                    <div class="m-2">
                        <input type="radio" name="${question.id}" value="d">
                        ${question.answers.answer4}
                    </div>
                </div>
            </div>
        `
    };
    for (let answer of data.quiz1) {
        correctAnswers.push(answer.correctAnswer)
        console.log(correctAnswers)
    }

    quizElement.innerHTML = quizHTML;

    form.addEventListener('submit', e => {
        e.preventDefault();

        let score = 0;
        let userAnswers = [form.q1.value, form.q2.value, form.q3.value]; 

        userAnswers.forEach((answer,index) => {
            if (answer == correctAnswers[index]){
                score += 25;
            }
        });

        scrollTo(0, 0)
        result.querySelector('span').textContent = `${score}%`;
        result.classList.remove('none');

        let output = 0;
        const timer = setInterval(() => {
            result.querySelector('span').textContent = `${output}%`;
            if(output === score){
                clearInterval(timer);
            }else{
                output++;
            }
        }, 100);
    });
}




