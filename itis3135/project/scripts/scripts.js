//calculator lab
function calculateResult() {
    // 1. Get all necessary elements and their values
    const num1Input = document.getElementById('num1').value;
    const num2Input = document.getElementById('num2').value;
    const operation = document.getElementById('operation').value; // 'add' or 'subtract'
    const resultDisplay = document.getElementById('result');

    // 2. Convert string inputs to numbers
    const number1 = parseFloat(num1Input);
    const number2 = parseFloat(num2Input);
    let calculationResult = 0;

    // 3. Input validation
    if (isNaN(number1) || isNaN(number2)) {
        resultDisplay.textContent = 'Please enter valid numbers.';
        return;
    }

    // 4. Perform the calculation based on the selected operation
    if (operation === 'add') {
        calculationResult = number1 + number2;
    } else if (operation === 'subtract') {
        calculationResult = number1 - number2;
    }

    // 5. Display the final result
    resultDisplay.textContent = calculationResult;
}

//display quotes
const quoteDisplay = document.getElementById('quote-display');
const loadingIndicator = document.getElementById('loading');
const quoteButton = document.getElementById('new-quote-btn');

const quoteSource = 'quotes.json';

let quotesData = [];

async function loadQuotesData() {
    
    if (quotesData.length > 0) {
        return true; 
    }
    try {
        
        const response = await fetch(quoteSource); 
        
        if (!response.ok) {
            throw new Error(`Failed to load data. Status: ${response.status}`);
        }

        
        quotesData = await response.json(); 
        
        
    } catch (error) {
        console.error("Error loading quotes:", error);
        quoteDisplay.textContent = "Error: Could not load local quotes file.";
        quoteButton.disabled = true;
    }
} 

function displayRandomQuote() {
    if (quotesData.length === 0) {
        quoteDisplay.textContent = "No quotes available.";
        return;
    }
    
    
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    const randomQuote = quotesData[randomIndex];
    
    quoteDisplay.textContent = `"${randomQuote.content}"`;
    
}

function fetchQuote() {

    quoteDisplay.textContent = 'Shuffling quotes...';
    loadingIndicator.style.display = 'block'; 
    quoteButton.disabled = true; 

    setTimeout(() => {
        
        displayRandomQuote();

        loadingIndicator.style.display = 'none';
        quoteButton.disabled = false;
    }, 500); 
}

loadQuotesData();

//ui slider
$(function() {
    
    $("#font-size-slider").slider({
        
        value: 16, 
        min: 8,    
        max: 48,   
        step: 1,   
        
        slide: function(event, ui) {
            const newSize = ui.value; 
            $("#demo-box").css("font-size", newSize + "px");
            $("#font-size-value").text(newSize);
        }
    });
});