let display = document.getElementById('display');
let mode = 'deg'; // Default mode is degrees

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
    try {
      let result;
      let expression = display.value;
  
      // Convert degrees to radians if in degree mode
      if (mode === 'deg') {
        expression = expression.replace(/(sin|cos|tan)\(([^\)]+)\)/g, function(match, p1, p2) {
          return p1 + '(' + degToRad(parseFloat(p2)) + ')';
        });
      }
      expression=expression.replace(/\^/g,'**');
  
      // Use a safer alternative to eval (consider a math library for advanced needs)
      result = new Function('return ' + expression)(); // Parses the expression

  
      display.value = result;
    } catch (error) {
      let errorMessage = "Error";
      if (error.message.includes("SyntaxError")) {
        errorMessage = "Invalid expression";
      } else if (error.message.includes("Division by zero")) {
        errorMessage = "Cannot divide by zero";
      } else if (error.message.includes("is not a function")) {
        errorMessage = "Invalid function or variable";
      }
      display.value = errorMessage;
    }
  }
  
function toggleMode() {
  mode = mode === 'deg' ? 'rad' : 'deg';
  document.getElementById('modeIndicator').innerText=mode.toUpperCase();
}

function degToRad(deg) {
  return deg * Math.PI / 180;
}

function squareRoot() {
  let value = display.value;
  if (isNaN(value)) {
    display.value = "Error: Invalid input for square root";
    return;
  }
  display.value = Math.sqrt(parseFloat(value));
}

function nthRoot() {
  let expression = display.value.split('^');
  let base = parseFloat(expression[0]);
  let exponent = parseFloat(expression[1]);

  if (isNaN(base) || isNaN(exponent)) {
    display.value = "Error: Invalid input for nth root";
    return;
  }

  display.value = Math.pow(base, 1 / exponent);
}

function solveSystemOfEquations() {
  try {
    // Split equations by newline and create coefficient matrix
    let equations = display.value.split('\n');
    let coefficients = [];
    for (let equation of equations) {
      let terms = equation.split(/[=+-]/).filter(term => term.trim() !== '');
      let equationCoefficients = [];
      for (let term of terms) {
        // Convert degrees if necessary (assuming all variables are single-letter)
        if (mode === 'deg' && /[a-z]+/i.test(term)) {
          term = term.replace(/(sin|cos|tan)\(/g, '$1(degToRad(');
        }
        equationCoefficients.push(parseFloat(term));
      }
      coefficients.push(equationCoefficients);
    }

    // Implement a system solver here (e.g., Gaussian elimination)
    // This example uses a placeholder message
    display.value = "System solving functionality not yet implemented";
  } catch (error) {
    display.value = "Error: Invalid system of equations";
  }
}
