"use strict";

const game = {
    gameIsRunning : false,
    gameWasRunning : false,
    playerName: null,
    playerScore: 0,
    playerLife: 3,
    arrowLength: 4,
    arrowRed: [],
    arrowGreen: [],
    currentScreen : "splash-screen",
    
    switchScreen: function(screenID) {
        $(".splash-screen").css("display","none");
        $(".game-screen").css("display","none");
        $(".gameover-screen").css("display","none");
        $(".container").removeClass("containerPlay");
        $("#buttonQuit").css("display", "none");
        $("#buttonHelp").css("display", "inline");
        if (screenID === "splash-screen") {
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
        }
        else {
            this.currentScreen = "gameover-screen";
            $(".gameover-screen").css("display","block");
            $("#buttonQuit").css("display", "none");
            $("#buttonPause").css("display", "none");
            $("#buttonHelp").css("display", "none");
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

$("#buttonEnd").on("click", () => {
    game.switchScreen("gameover-screen");
    game.gameIsRunning = false;
})

$("#buttonQuit").on("click", () => {
    game.switchScreen("splash-screen");
})


$("#buttonHelp").on("click", () => {
    game.displayHelp();
})


$("#buttonGameoverPlay").on("click", () => {
    game.switchScreen("game-screen")
})

$("#buttonGameoverQuit").on("click", () => {
    game.switchScreen("splash-screen")
}),

generateArrowIndexs = (size) => {
    const randomArray = [];
    for (let i = 0; i < size; i++) {
        const randomInt = Math.floor(Math.random()*4) + 1;
        randomArray.push(randomInt);
    }
    return randomArray;
}
