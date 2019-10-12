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
        '<button id="option-button" value="' +
          optionVal +
          '">' +
          optionVal +
          "</input>"
      );
      console.log(optionItem);
      $("#option-list").append(optionItem);
    }
  };

  $(document).on("click","#option-button", function() { //choose answer on click
    if($(this).val()===qArray[questionCount].answer){
      console.log("good job!");
      winCount++;
      rightArray.push(qArray[questionCount]);
    } else{
      console.log("boooo");
      loseCount++;
      wrongArray.push(qArray[questionCount]);
      beforeTime();
    }
    //if($(this).attr(""))
});


  function decrement() { //decrements countdown
    number--;
    if(questionCount < 10){ //logic to run the quiz before you reach the end of qArray
    if(number===-1){ //if unanswered
      clearCount(); //clears countDown interval
      $("#show-answer").show();
      //displays correct answer
      $("#right-answer").html("Time is up! The correct answer is: " + qArray[questionCount].answer + ". 5 seconds until next question!");
      setTimeout(function() { 
        $("#show-answer").hide() 
      }, 5000);
      //restarts game
      setTimeout(runCount, 5000);     
      console.log(qArray[questionCount]);
      wrongArray.push(qArray[questionCount]);
      console.log(wrongArray);
      loseCount++; //updates wrong answer count
      questionCount++;
    }
  } else{
    alert("no more questions");
  }
    $("#show-number").html("<h2>Time: " + number + "</h2>");

  };

function beforeTime (){ //function for answered before time up
  questionCount++;
  clearCount();
  runCount();
};

  function runCount(){
    $("#during-time").show(); //show question
    countDown = setInterval(decrement, 1000); //timer
    genQuestions(); //generate questions
    $("#answer-count").html("<h2>Right Answers: " + winCount + " Wrong Answers: " + loseCount + "</h2>");
  };

  function clearCount() { //clear countDown interval
    $("#during-time").hide(); //hide question
    $("#q-header").empty(); //reset header
    $("#option-list").empty(); //reset questions
    clearInterval(countDown);
    console.log("i did it!");
  };
$("#start-button").on("click", function (){ //starts the game
  $("#startGame").detach();
  $("#questions").show();
  runCount();

});
});
