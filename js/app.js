$(document).ready(function(){
  var quiz = getQuiz(), answerSelected = false;
  var score, questsNum, userQs, userAnswer;
  var currentQ, currentAnswers, correctAnswer, description;

  //Starts the game and resets data when replaying
  function playGame(){
    userQs = getQuestions();
    score = 0;
    currentQ = 0;
    showQuestion();
  }

  /*Gets the specified number of questions from the 
  quiz object in random order.*/ 
  function getQuestions(){
    var count = 0, curr;
    var questions =[];
    var chosen = [];

    while(count < questsNum){
      curr = Math.floor(Math.random() * 7);
      if(chosen.indexOf(curr) === -1){
        chosen.push(curr);
        questions.push(quiz.questions[curr]);
        count++;
      }
    }
    return questions;
  }

  //Displays the current question to the user. 
  function showQuestion(){
    var curr = userQs[currentQ];
    var question = curr.question;
    currentAnswers = curr.answers;
    description = curr.desc;
    correctAnswer = curr.correct;
    var html = "";

    html+= "<p>Question <span class='question-num'>";  
    html+= (currentQ + 1) + "</span>/" + userQs.length + "</p>";
    html+= "<h3 class='curr-question'>" + question + "</h3>";
    html+= "<ul class='all-answers'>";
    for(var i = 0; i < currentAnswers.length; i++){
      html+= "<li class='answer'>" + currentAnswers[i] + "</li>";
    }
    html+= "</ul>";
    $(".question-holder").html(html);
    currentQ++;
    setClickAnswers();
  }

  //Adds click events on the question's answers
  function setClickAnswers(){
    //Grabs user answer and disables other options
    $('body').on('click', '.answer', function(){
      userAnswer = $(this).text();
      $('body').off('click', '.answer');
      $(".answer").addClass('disabled').css('cursor', 'default');
      $(this).removeClass('disabled').addClass('selected');
      showAnswerSection();
      answerSelected = true;
    });
  }

  function showAnswerSection(){
    var html = "", correct = "Wrong!";
    if(userAnswer === currentAnswers[correctAnswer]){
      score++;
      correct = "Correct!";
    }
    html+= "<p class='wrong-right'><em>" + correct + "</em></p>";
    html+= "<p>Score <span class='curr-score'>"; 
    html+= score + "</span>/" + userQs.length + "</p>";
    html+= "<p class='description'><em>" + currentAnswers[correctAnswer];
    html+= "</em>: " + description + "</p>";
    html+= "<button class='next'>NEXT</button>";
    $('.results-holder').html(html);
    $('.results-holder').slideDown(1000);
  }

  function showEndPage(){
    $(".final-score").html(score + "/" + userQs.length);
  }
  
  /*Sets the number of questions to be played
  and starts the game.*/
  $(".num-btn").click(function(){
    questsNum = $(this).text();
    $(".starting-page").fadeOut(1000, function(){
      $(".game-page").fadeIn(1500);
      playGame();
    });
  });

  //Shows next question or takes user to ending page if end of game
  $('body').on('click', '.next', function(){
    if(answerSelected){
      answerSelected = false;
      $('.results-holder').fadeOut(500);
      if(currentQ +1 > userQs.length){
        $(".game-page").fadeOut(1000, function(){
          showEndPage();
          $(".end-page").fadeIn(1500);
        });
      } else{
        showQuestion();
      }
    }
  });

  //Takes user back to starting section
  $('.new-game').click(function(){
    $(".end-page").fadeOut(1000, function(){
      $(".starting-page").fadeIn(1500);
    });
  });
});


//Holds all of the quiz questions information
function getQuiz(){
  var quiz = {
    questions : [
    {
      question : "HTML ID's can only be used once",
      answers : ["True", "False"],
      correct : 0,
      desc : "ID's are unique and each page can only have one element with that ID."
    },
    {
      question : "Which doctype is correct for HTML5?",
      answers : ["!DOCTYPE HTML5", "!DOCTYPE html", "!DOCTYPE"],
      correct : 1,
      desc : "Was released with the fifth edition of HTML. Made simpler and shorter than before."
    },
    {
      question : "Which HTML5 element defines navigation links?",
      answers : ["avigation", "links", "nav", "navigate"],
      correct : 2,
      desc : "Introduced with HTML5, this element is intended to be used with major blocks of navigation links."
    },
    {
      question : "Inside which HTML element do we put the JavaScript?" ,
      answers : ["script", "javascript", "JS", "link"],
      correct : 0,
      desc : "Used to either point to external JavaScript files or to contain scripting statements."
    },
    {
      question : "How do you call the function 'myFunction'?",
      answers : ["myFunction", "func myFunction()", "myFunction()", "None of those"],
      correct : 2,
      desc : "using parenthesis executes the function. Without them you would hold a reference to the function itself."
    },
    {
      question : "JavaScript is the same as Java.",
      answers : ["True", "False"],
      correct : 1,
      desc : "JavaScript was developed by Netscape and Java by Sun Microsystems. "
    },
    {
      question : "What keyword is used to create a JavaScript variable",
      answers : ["variable", "varies", "string", "var"],
      correct : 3,
      desc : "It is used to hold any JavaScript data type. In other languages different keywords are used for different data types."
    }
    ]
  };
  return quiz;
}