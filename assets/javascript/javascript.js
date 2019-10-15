$(document).ready(function() {

  var winCount = 0;
  var loseCount = 0;
  var rightArray = [];
  var wrongArray = [];
  var questionCount = 0;
  var qArray = [ //holds questions and answers, booleans listed currently unused, unsure if I will use them
    {
      question: "Who is the voice actor for Miss Piggy?",
      option: ["Jane Henson", "Richard Hunt", "Frank Oz"],
      answer: "Frank Oz",
      winImage: "img.jpg",
      isCorrect: false,
      answered: false
    },

    {
      question: "What was Kermit first made out of?",
      option: ["Green Felt", "An old green sweatshirt", "Jim Henson's Mother's Coat"],
      answer: "Jim Henson's Mother's Coat",
      winImage: "img.jpg",
      isCorrect: false,
      answered: false
    },

    {
      question: "What was the first Muppet Movie?",
      option: ["The Muppet Movie", "The Muppets Take Manhattan", "The Muppets"],
      answer: "The Muppet Movie",
      winImage: "img.jpg",
      isCorrect: false,
      answered: false
    },

    {
      question: "What was the first TV Show Jim Henson created?",
      option: ["Sesame Street", "Sam and Friends", "The Muppet Show"],
      answer: "Sam and Friends",
      winImage: "img.jpg",
      isCorrect: false,
      answered: false
    },

    {
      question: "Who was NOT a guest star on The Muppet Show?",
      option: ["Elton John", "Julie Andrews", "Paul McCartney"],
      answer: "Paul McCartney",
      winImage: "img.jpg",
      isCorrect: false,
      answered: false
    },

    {
      question: "What Muppet is considered to be closest to Jim Henson's personality?",
      option: ["Kermit", "Swedish Chef", "Rowlf the Dog"],
      answer: "Rowlf the Dog",
      winImage: "img.jpg",
      isCorrect: false,
      answered: false
    },

    {
      question: "Who was not part of the original Muppet Show Cast?",
      option: ["Rizzo the Rat", "Gonzo", "Sweetums"],
      answer: "Rizzo the Rat",
      winImage: "img.jpg",
      isCorrect: false,
      answered: false
    },

    {
      question: "Which character of the muppets is known as a 'Whatever'?",
      option: ["Gonzo", "Dr. Bunsen Honeydew", "Sweetums"],
      answer: "Gonzo",
      winImage: "img.jpg",
      isCorrect: false,
      answered: false
    },

    {
      question: "Jim Henson is known for pioneering the way puppetry is performed today. Because of the way he built his puppets, what two words make up the word 'Muppet'?",
      option: ["Moveable + Puppet", "Motion + Puppet", "Marionette + Puppet"],
      answer: "Marionette + Puppet",
      winImage: "img.jpg",
      isCorrect: false,
      answered: false
    },

    {
      question: "What is the name of the short experimental film that was nominated in the 1966 Oscars and directed by Jim Henson?",
      option: ["Time Piece", "The Cube", "Nobody"],
      answer: "Time Piece",
      winImage: "img.jpg",
      isCorrect: false,
      answered: false
    },
];
var countDown;
var number = 15;

  function genQuestions() { //generates questions
    number = 15;
    var headerText = qArray[questionCount].question;
    $("#q-header").html(headerText);
    for (var i = 0; i < qArray[questionCount].option.length; i++) {
      var optionVal = qArray[questionCount].option[i];
      var optionItem = $(
        '<button class="btn btn-primary option-button" value="' +
          optionVal +
          '">' +
          optionVal +
          "</button>"
      );
      console.log(optionItem);
      $("#option-list").append(optionItem);
    }
  };

  $(document).on("click",".option-button", function() { //choose answer on click
    if($(this).val()===qArray[questionCount].answer){
      console.log(questionCount)
      if(questionCount < 9){
        displayifCorrect();
        console.log("inside correct if < 10: ", questionCount);
    } else{
      clearCount();
      qArray[questionCount].isCorrect = true;
      $("#correct-div").show();
      $("#correct-header").html("YAAAYYYYY!!! You got it!");
      setTimeout(endGame, 2000);
      setTimeout(function() { 
      $("#correct-div").hide() 
    }, 2000);
    }
    } else{
      if(questionCount < 9){
      displayifWrong();  
      }
     else{
      clearCount();
      $("#show-answer").show();
      $("#right-answer").html("Time is up! The correct answer is: " + qArray[questionCount].answer + ". Better luck next time!");
      setTimeout(endGame, 2000);
      setTimeout(function() { 
      $("#show-answer").hide() 
    }, 2000);
    }
    }
});


  function decrement() { //decrements countdown
    number--;
    if(number===0){ //if unanswered
      if(questionCount === 9){
        clearCount();
        $("#show-answer").show();
        $("#right-answer").html("Time is up! The correct answer is: " + qArray[questionCount].answer + ". Better luck next time!");
        setTimeout(endGame, 2000);
        setTimeout(function() { 
        $("#show-answer").hide() 
      }, 2000);
      } else{
      clearCount(); //clears countDown interval
      $("#show-answer").show();
      //displays correct answer
      $("#right-answer").html("Time is up! The correct answer is: " + qArray[questionCount].answer + ". 3 seconds until next question!");
      setTimeout(function() { 
        $("#show-answer").hide() 
      }, 3000);
      //restarts game
      setTimeout(runCount, 3000);     
      console.log(qArray[questionCount]);
      wrongArray.push(qArray[questionCount]);
      console.log(wrongArray);
      loseCount++; //updates wrong answer count
      questionCount++; //updates qArray to next index
      number = 15;
      }
    }
    $("#show-number").html("<h2>Time: " + number + "</h2>");
    
  };

function endGame (){ //function tp end game
  //clearCount();
  $("#finish-div").show();
  if(winCount >= 7){
    $("#finish-header").html("You got "+ winCount+" out of 10 right! Sounds like you're a super Muppet nerd, weirdo.");
  }
  if(winCount <= 6 && winCount > 4 ){
    $("#finish-header").html("You got "+ winCount+" out of 10 right! Looks like you've at least seen The Muppet Movie, good for you.");
  }
  if(winCount < 5){
    $("#finish-header").html("You got "+ winCount+" out of 10 right... Do you know who Kermit the Frog is? Are you Lost?");
  }
 displaySolutions();
};

function displaySolutions(){
  console.log("solutions displayed")
    for(var i = 0; i < qArray.length; i++){
      var solCont = $("<ul class= 'list-group sol-cont' id= 'solution: "+ i + "'>");
      $("#solutions").append(solCont);
      $(solCont).prepend($("<li class='list-group-item'>Question: " + qArray[i].question + "</li>"));
      $(solCont).append($("<li class='list-group-item'>Answer: " + qArray[i].answer + "</li>"));
      $(solCont).append($("<li class='list-group-item'>Answered correctly: " + qArray[i].isCorrect + "</li>"));
    }
  
}

function displayifCorrect (){
      $("#correct-div").show()
      $("#correct-header").html("YAAAYYYYY!!! You got it! Next question in 3 seconds");
      setTimeout(function() { 
        $("#correct-div").hide() 
      }, 3000);
      //restarts game
      setTimeout(runCount, 3000);
      qArray[questionCount].isCorrect = true;
      winCount++;
      questionCount++;
      clearCount();
      number = 15;
      $("#show-number").html("<h2>Time: " + number + "</h2>");
}

function displayifWrong (){
  $("#show-answer").show() 
  $("#right-answer").html("Nice try! The correct answer is: " + qArray[questionCount].answer + ". 3 seconds until next question!");
  setTimeout(function() { 
    $("#show-answer").hide() 
  }, 3000);
  //restarts game
  setTimeout(runCount, 3000);
  loseCount++;
  questionCount++;
  clearCount();
  number = 15;
  $("#show-number").html("<h2>Time: " + number + "</h2>");

}

  function runCount(){
    console.log("runcount is executing")
    console.log(questionCount)
    $("#during-time").show(); //show question
    countDown = setInterval(decrement, 1000); //timer
    genQuestions(); //generate questions
    $("#answer-count").html("<h2>Right Answers: " + winCount + " Wrong Answers: " + loseCount + "</h2>");
  };

  function clearCount() { //clear countDown interval
    clearInterval(countDown);
    $("#during-time").hide(); //hide question
    $("#q-header").empty(); //reset header
    $("#option-list").empty(); //reset questions
    console.log("i did it!");
  };
$("#start-button").on("click", function (){ //starts the game
  $("#startGame").detach();
  number = 15;
  $("#show-number").html("<h2>Time: " + number + "</h2>");
  runCount();
  $("#questions").show();
});
$("#start-again").on("click", function (){ //restarts the game
  $("#finish-div").detach();
  number = 15;
  questionCount = 0;
  winCount = 0;
  loseCount = 0;
  $("#show-number").html("<h2>Time: " + number + "</h2>");
  runCount();
  $("#questions").show();
});
});
