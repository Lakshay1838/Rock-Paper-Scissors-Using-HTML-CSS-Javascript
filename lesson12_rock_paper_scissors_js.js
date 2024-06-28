const score = JSON.parse(localStorage.getItem('score')) ||{
    wins : 0,
    loses : 0,
    tie : 0
};

function declareResult(playersChoice)
{
    const computerChoice = computerMove();
    let result = '';

    if(playersChoice === computerChoice)    result = 'Tie.';
    else
    {
        if(playersChoice === 'rock')
        {
            if(computerChoice ==='scissors')    result = 'You Won!';
            else if(computerChoice ==='paper')  result = 'You Lose.';
        }
        else if(playersChoice ==='paper')
        {
            if(computerChoice === 'rock')   result = 'You Won!';
            else if(computerChoice === 'scissors')  result = 'You Lose.';
        }
        else if(playersChoice === 'scissors')
        {
            if(computerChoice === 'paper')  result = 'You Won!';
            else if(computerChoice === 'rock')  result = 'You Lose.';
        }
    }

    if(result === 'You Won!')    score.wins+=1;
    else if(result ==='You Lose.')  score.loses+=1;
    else if(result === 'Tie.')  score.tie+=1;  
    
    localStorage.setItem('score',JSON.stringify(score));

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-choices').innerHTML = `You <img class="icon" src="./images/${playersChoice}-emoji.png" alt=""><img class="icon" src="./images/${computerChoice}-emoji.png" alt="">Computer`;
    updateScore();
}

function updateScore()
{
    document.querySelector('.js-score').innerHTML = `Wins : ${score.wins} , Losses : ${score.loses} , Ties  : ${score.tie}`;
}
function computerMove()
{
    const randomNumber = Math.random();
    if(randomNumber >=0 && randomNumber <1/3)   return 'rock';
    else if(randomNumber >=1/3 && randomNumber < 2/3)   return 'paper';
    else if(randomNumber >= 2/3 && randomNumber < 1)    return 'scissors';
}


let isPlaying = false;
let interval = '';

function autoPlay()
{
    if(!isPlaying)
    {
        interval = setInterval(                          //don't declare this variable directly to setinterval as every time there is a different new interval id. 
            function (){
                const playersChoice = computerMove();
                declareResult(playersChoice);
            },1000);   
            isPlaying=true;
    
            document.querySelector('.auto-play-button').innerHTML = 'Stop Play';
        }
        else{
            clearInterval(interval);
            isPlaying= false;
            document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
    }
}