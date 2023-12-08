"use strict"

const clock = {
    isRunning : false,
    timeTotal : 60,
    timeRemaining : 60,
    LoopDuration : 1000,
    mins : $("#mins"),
    secs : $("#secs"),
    progressBar : $(".progress-bar"),
    buttonPlay : $(".buttonPlay"),
    buttonPause : $(".buttonPause"),
    intervalId : 0,

    setup : function () {
        this.buttonPlay.on("click", () => {
            this.startTimer();
        })
        this.buttonPause.on("click", () => {
            this.pauseTimer();
        })
        this.resetTimer();
    },
    updateClockDisplay : function () {
        this.mins.html((Math.floor(this.timeRemaining / 60) < 10 ? "0" : "")
        + Math.floor(this.timeRemaining / 60));
        this.secs.html((this.timeRemaining % 60 < 10 ? "0" : "")
        + this.timeRemaining % 60);
    },
    updateProgressBar : function () {
        var percentage = (this.timeRemaining * 100 / 90) + "%";
        this.progressBar.css("width", percentage);
    },
    countdownLoop : function () {
        if (!this.isRunning) return;
        if (this.timeRemaining > 0) {
            this.timeRemaining--;
            this.updateClockDisplay();
            this.updateProgressBar();
        }
        else {
            window.clearInterval(this.intervalId);
            this.buttonPause.addClass("end");
            window.setTimeout(() => {
                this.resetTimer();
            }, 5000)
        }
    },
    startTimer : function () {
        if (!this.isRunning) {
            this.isRunning = true;
            this.updateClockDisplay();
            this.updateProgressBar();
            window.clearInterval(this.intervalId);
            this.intervalId = window.setInterval(() => {
                this.countdownLoop();
            }, this.LoopDuration)
            this.buttonPlay.addClass("invisible");
            this.buttonPause.addClass("visible");
        }
    },
    pauseTimer : function () {
        this.isRunning = false;
        this.buttonPause.removeClass("visible");
        this.buttonPlay.removeClass("invisible");
    },
    resetTimer : function () {
        this.timeRemaining = this.timeTotal;
        this.buttonPause.removeClass("visible");
        this.buttonPause.removeClass("end");
        this.buttonPlay.removeClass("invisible");
        this.updateClockDisplay();
        this.updateProgressBar();
        this.isRunning = false;
    }
}

$(document).ready(() => {
    clock.setup();
})