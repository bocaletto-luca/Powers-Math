 "use strict";
    // TAB NAVIGATION FUNCTION
    function openTab(evt, tabName) {
      const tabcontents = document.getElementsByClassName("tabcontent");
      for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
        tabcontents[i].classList.remove("active");
      }
      const tablinks = document.getElementsByClassName("tablinks");
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
      }
      document.getElementById(tabName).style.display = "block";
      document.getElementById(tabName).classList.add("active");
      evt.currentTarget.classList.add("active");
    }
    document.getElementById("defaultTab").click();

    /* ----- POWER CALCULATOR ----- */
    function calculatePower() {
      const base = parseFloat(document.getElementById("baseInput").value);
      const exp = parseFloat(document.getElementById("expInput").value);
      const resultDiv = document.getElementById("powerResult");
      if (isNaN(base) || isNaN(exp)) {
        resultDiv.innerHTML = "<p>Please enter valid numbers for both base and exponent.</p>";
        return;
      }
      const power = Math.pow(base, exp);
      resultDiv.innerHTML = `<p>${base}<sup>${exp}</sup> = ${power}</p>`;
    }
    
    /* ----- QUIZ FUNCTIONS ----- */
    let quizBase, quizExp, quizAnswer;
    function newQuiz() {
      // generate a random base in range [2, 10] and exponent in range [0, 5]
      quizBase = Math.floor(Math.random() * 9) + 2;
      quizExp = Math.floor(Math.random() * 6);  // exponent from 0 to 5
      quizAnswer = Math.pow(quizBase, quizExp);
      const quizQuestionDiv = document.getElementById("quizQuestion");
      quizQuestionDiv.innerHTML = `<p>What is ${quizBase}<sup>${quizExp}</sup>?</p>`;
      
      document.getElementById("quizFeedback").innerHTML = "";
      document.getElementById("quizAnswer").value = "";
    }
    
    function checkQuizAnswer() {
      const userAns = parseFloat(document.getElementById("quizAnswer").value);
      const feedbackDiv = document.getElementById("quizFeedback");
      if (isNaN(userAns)) {
        feedbackDiv.innerHTML = "<p>Please enter your answer.</p>";
        return;
      }
      if (Math.abs(userAns - quizAnswer) < 1e-9) {
        feedbackDiv.innerHTML = "<p style='color:green;'>Correct!</p>";
      } else {
        feedbackDiv.innerHTML = `<p style='color:red;'>Incorrect. The correct answer is ${quizAnswer}.</p>`;
      }
    }
    
    /* ----- VISUALIZER FUNCTIONS ----- */
    // Draw an exponential growth curve f(x)=a^x for x in [0,5].
    function drawExponentGraph() {
      const base = parseFloat(document.getElementById("visBase").value);
      const graphResult = document.getElementById("graphResult");
      if (isNaN(base)) {
        graphResult.innerHTML = "<p>Please enter a valid base number.</p>";
        return;
      }
      const canvas = document.getElementById("graphCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw axes
      const margin = 40;
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      // X axis from margin to canvas.width - margin
      ctx.beginPath();
      ctx.moveTo(margin, canvas.height - margin);
      ctx.lineTo(canvas.width - margin, canvas.height - margin);
      ctx.stroke();
      // Y axis from canvas.height - margin to margin
      ctx.beginPath();
      ctx.moveTo(margin, canvas.height - margin);
      ctx.lineTo(margin, margin);
      ctx.stroke();
      
      // Plot f(x)=base^x for x in [0,5]
      let points = [];
      const xMin = 0, xMax = 5;
      const numPoints = 100;
      let maxY = 0;
      for (let i = 0; i <= numPoints; i++){
        const x = xMin + (xMax - xMin) * i / numPoints;
        const y = Math.pow(base, x);
        if (y > maxY) maxY = y;
        points.push({ x: x, y: y });
      }
      
      // Scale points to canvas coordinates
      // X scale: map [0,5] to [margin, canvas.width - margin]
      const xScale = (canvas.width - 2 * margin) / (xMax - xMin);
      // Y scale: map [0, maxY] to [canvas.height - margin, margin] (inverted)
      const yScale = (canvas.height - 2 * margin) / maxY;
      
      ctx.strokeStyle = "#007BFF";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < points.length; i++){
        let xPixel = margin + points[i].x * xScale;
        let yPixel = canvas.height - margin - points[i].y * yScale;
        if (i === 0) ctx.moveTo(xPixel, yPixel);
        else ctx.lineTo(xPixel, yPixel);
      }
      ctx.stroke();
      
      // Label axes and curve
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.fillText("x", canvas.width - margin + 10, canvas.height - margin + 5);
      ctx.fillText("f(x) = a^x", margin - 5, margin - 10);
      
      graphResult.innerHTML = `<p>Graph of f(x)=${base}<sup>x</sup> for x in [0,5]</p>`;
    }
