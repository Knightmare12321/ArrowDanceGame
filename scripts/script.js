"use strict";

const game = {
    gameIsRunning : false,
    gameWasRunning : false,
    currentScreen : "splash-screen",
    switchScreen: function(screenID) {
        $(".splash-screen").css("display","none");
        $(".game-screen").css("display","none");
        $(".gameover-screen").css("display","none");
        $(".container").removeClass("containerPlay");
        $("#buttonQuit").css("visibility", "visible");
        $("#buttonHelp").css("visibility", "visible");
        if (screenID === "splash-screen") {
            this.currentScreen = "splash-screen";
            $(".splash-screen").css("display","block");
            $("#buttonQuit").css("visibility", "hidden");
            $("#buttonHelp").attr("data-bs-target", "#splashModal");
        }
        else if (screenID === "game-screen") {
            this.currentScreen = "game-screen";
            $(".game-screen").css("display","block");
            $("#buttonHelp").attr("data-bs-target", "#gameModal");
        }
        else {
            this.currentScreen = "gameover-screen";
            $(".gameover-screen").css("display","block");
            $("#buttonQuit").css("visibility", "hidden");
            $("#buttonHelp").css("visibility", "hidden");
        }
        
    },
    displayHelp: function() {
        if (this.currentScreen == "game-screen" && this.gameIsRunning) {
            $(".container").toggleClass("containerPlay");
        }
    }
}

$("#buttonStart").on("click", () => {
    game.switchScreen("game-screen");
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

$("#buttonGameoverPlay").on("click", () => {
    game.switchScreen("game-screen")
})

$("#buttonGameoverQuit").on("click", () => {
    game.switchScreen("splash-screen")
})

$("#buttonHelp").on("click", () => {
    game.displayHelp();
})

$("#gameModal").on("hidden.bs.modal", function () {
    game.displayHelp();
});

$("#buttonInfo").on("click", () => {
    $("#splashModal").modal("hide");
    $("#gameModal").modal("show");
})