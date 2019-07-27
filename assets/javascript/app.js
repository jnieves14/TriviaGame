 $(document).ready(function () {
    var options = [
        {
            question: "Which city is the most populated in the world (2019)?", 
            choice: ["Tokyo, Japan","Shanghai, China","New York City, NY, USA", "New Delhi, India"],
            answer: 0,
            photo: "assets/images/tokyo-japan.jpg"
         },
         {
            question: "Which city is the richest(based on # of billionaires)?", 
            choice: ["Seoul, South Korea", "Hong Kong","New York, NY, USA", "Beijing, China"],
            answer: 2,
            photo: "assets/images/NY-NY.jpg"
         }, 
         {
            question: "Which city had the world's tallest roller coaster?", 
            choice: ["Gold Coast, Queensland, Australia", "Salou, Catalonia, Spain", "Vaughan, Ontario, Canada,", "Jackson, NJ, USA"],
            answer: 3,
            photo: "assets/images/kingda-ka.jpg"
        }, 
        {
            question: "Which city has the tallest building in the world?", 
            choice: ["Taipe, Taiwan", "Dubai, United Arab Emirates", "Kuala Lumpur, Malaysia", "Lianshan, China"],
            answer: 1,
            photo: "assets/images/Burj-Khalifa.jpg"
        }, 
        {
            question: "What's considered to be the most photographed city?", 
            choice: ["Paris, France", "Istanbul, Turkey", "New York, NY, USA", "Los Angeles, CA, USA"],
            answer: 2,
            photo: "assets/images/ny-photo.jpg"
        }, 
        {
            question: "Which city had the largest recorded earthquake?", 
            choice: ["Tokyo, Japan", "Sumatra, Indonesia", "San Francisco, CA, USA", "Valdivia, Chile"],
            answer: 3,
            photo: "assets/images/valdivia.jpg"
        }, 
        {
            question: "Which city is named after a religion?", 
            choice: ["Islamabad, Pakistan", "Seoul, South Korea", "Christiansburg, VA, USA", "Jersusalem",],
            answer: 0,
            photo: "assets/images/islamabad.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerDiv").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionDiv").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerDiv").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerDiv").html("<p>That's rigtht!!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerDiv").html("<p>The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerDiv").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerDiv").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionDiv").empty();
            // $("#questionDiv").html("<h4>Game Over!  Here's how you did: </h4>");
            $("#answerDiv").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerDiv").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerDiv").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
        }
        }, 3000); 
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerDiv").empty();
        $("#questionDiv").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();  
    })
    })
  
  