"use strict";
import {startGenerate, endGenerate} from "./arrow.js"

const game = {
    gameIsRunning : false,
    gameWasRunning : false,
    playerName: null,
    playerScore: 0,
    playerLife: 3,
    currentScreen : "splash-screen",
    
    switchScreen: function(screenID) {
        console.log(game);
        $(".splash-screen").css("display","none");
        $(".game-screen").css("display","none");
        $(".gameover-screen").css("display","none");
        $(".container").removeClass("containerPlay");
        $("#buttonQuit").css("display", "none");
        $("#buttonHelp").css("display", "inline");
        if (screenID === "splash-screen") {
            endGenerate();
            this.currentScreen = "splash-screen";
            $(".splash-screen").css("display","block");
            $("#buttonQuit").css("display", "none");
        }
        else if (screenID === "game-screen") {
            this.currentScreen = "game-screen";
            $(".game-screen").css("display","block");
            $("#buttonQuit").css("display", "inline");
            $("#buttonPause").css("display", "inline");
            $("#buttonHelp").css("display", "none");
            startGenerate(0, 4);
        }
        else {
            endGenerate();
            this.currentScreen = "gameover-screen";
            $(".gameover-screen").css("display","block");
            $("#buttonQuit").css("display", "none");
            $("#buttonPause").css("display", "none");
            $("#buttonHelp").css("display", "none");
            $("#p-gameover").text("Thank you for playing, " + game.playerName + "!");
            $("#p-score").text("Your Score is: " + game.playerScore);
        }
    },
    displayHelp: function() {
        if (this.currentScreen == "game-screen" && this.gameIsRunning) {
            $(".container").toggleClass("containerPlay");
        }
    }
}

$("#buttonQuit").css("display", "none");
$("#buttonPause").css("display", "none");

$("#buttonStart").on("click", () => {
    var input = $("#usernameInput").val().trim();
    if (input === "") {
        alert("Please enter a non-empty username");
    }
    else {
        game.playerName = input;
        game.switchScreen("game-screen");
    }
})

$("#buttonPlay").on("click", () => {
    $(".container").toggleClass("containerPlay");

    game.gameIsRunning ? game.gameIsRunning = false : game.gameIsRunning = true;
})

$("#buttonQuit").on("click", () => {
    game.switchScreen("gameover-screen");
    game.gameIsRunning = false;
})



$("#buttonHelp").on("click", () => {
    game.displayHelp();
})


$("#buttonGameoverPlay").on("click", () => {
    game.switchScreen("game-screen")
})

$("#buttonGameoverQuit").on("click", () => {
    game.switchScreen("splash-screen")
})

