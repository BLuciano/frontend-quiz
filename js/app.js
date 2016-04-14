$(document).ready(function(){
  var quiz = getQuiz();
  var score, questsNum, currentQ, userQs;

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
    var answers = curr.answers;
    var description = userQs[currentQ].desc;
    var html = "";

    html+= "<p>Question <span class='question-num'>" + (currentQ + 1) + "</span>/20</p>";
    html+= "<h3 class='curr-question'>" + question + "</h3>";
    html+= "<ul class='all-answers'>";
    for(var i = 0; i < answers.length; i++){
      html+= "<li class='answer'>" + answers[i] + "</li>";
    }
    html+= "</ul>";
    $(".question-holder").html(html);
    currentQ++;
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
      answers : ["<!DOCTYPE HTML5>", "<!DOCTYPE html>", "<!DOCTYPE>"],
      correct : 1,
      desc : "Was released with the fifth edition of HTML. Made simpler and shorter than before."
    },
    {
      question : "Which HTML5 element defines navigation links?",
      answers : ["avigation", "inks", "nav", "navigate"],
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