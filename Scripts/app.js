/* 
    app.js
    Number Cruncher
    Patrick Ross
    200307049
    This is the custom javascript used for the calculator functions
*/
$(document).on("pagecreate", "#splash-page", function() {
    setTimeout(function(){
    $.mobile.changePage("#portrait-calc", "fade");
    }, 3500);
});
$(document).on("pagecreate", "#portrait-calc", function() {
    //making display field read only
    $("#displayControlPortrait").prop("readonly", true);
    //variables used for the calculator
    var display = $("#displayControlPortrait");
    var operator;
    var operatorSet = false;
    var equalsPressed = false;
    var accumulator = null;
    display.val("0");

    //Detects phone orientation change (0 = portrait)
    $(window).on("orientationchange",function() {
        if(window.orientation == 0) {
            // Phone in portrait
        }
        else {
            //Phone in landscape
        }
    });

    //Detects button tap event
    $("button").on("tap",function() {
        var buttonID = $(this).attr("id");

        //Switch statement to detect which button has been pressed, and call the corresponding function
        switch(buttonID){
        //operand keys
        case "key0":
            enterOperand(0);
            break;
        case "key1":
            enterOperand(1);
            break;
        case "key2":
            enterOperand(2);
            break;
        case "key3":
            enterOperand(3);
            break;
        case "key4":
            enterOperand(4);
            break;
        case "key5":
            enterOperand(5);
            break;
        case "key6":
            enterOperand(6);
            break;
        case "key7":
            enterOperand(7);
            break;
        case "key8":
            enterOperand(8);
            break;
        case "key9":
            enterOperand(9);
            break;
        //operator keys
        case "keyEquals":
            setOperator("=");
            break;
        case "keyDivide":
            setOperator("/");
            break;
        case "keyMultiply":
            setOperator("*");
            break;
        case "keyAdd":
            setOperator("+");
            break;
        case "keySubtract":
            setOperator("-");
            break;
        //misc keys
        case "keyClear":
            clearDisplay();
            break;
        case "keyDel":
            deleteOperand();
            break;
        case "keyDecimalPoint":
            enterOperand(".");
            break;
        case "keySquareRoot":
            getSquareRoot();
            break;
        case "keyPlusMinus":
            plusMinusSwitch();
            break;
        }
    });
    //divides two operands by eachother
    division = function(accumulatorOperand, currentOperand) {
        if (currentOperand == 0) {
            alert("Can't Divide by 0");
            return 0;
        }
        return (accumulatorOperand / currentOperand);
    };

    //Mulitplys two operands by eachother
    multiplication = function(accumulatorOperand, currentOperand) {
        return (accumulatorOperand * currentOperand);
    };

    //adds two operands together
    addition = function(accumulatorOperand, currentOperand) {
        return (accumulatorOperand + currentOperand);
    };

    //subtracts two operands from eachother
    subtraction = function(accumulatorOperand, currentOperand) {
        return (accumulatorOperand - currentOperand);
    };

    //gets the squareroot
    getSquareRoot = function() {
        displayValue = parseFloat(getDisplayValue())
        setDisplayValue(Number(Math.sqrt(parseFloat(getDisplayValue())).toFixed(5)));
    };

    //switches the number on the display between negative and positive
    plusMinusSwitch = function() {
        displayValue = parseFloat(getDisplayValue());
        if(displayValue > 0){
            setDisplayValue("-" + displayValue.toString());
        }
        else{
            setDisplayValue(displayValue.toString().replace("-", ""));
        }
    };

    //this function does the operand calculations depending on the selected operator
    calculate = function() {
        //if no operators or operands have been entered yet, exit this function
        if(accumulator == null || !operator) {
            return;
        }
        //gets the calculator displays value
        var currentNumber = parseFloat(getDisplayValue());
        newDisplayValue = 0;

        //switch statement on the operator to figure out which calculation function to call
        switch (operator) {
        case "/":
            newDisplayValue = division(accumulator, currentNumber);
            break;
        case "*":
            newDisplayValue = multiplication(accumulator, currentNumber);
            break;
        case "+":
            newDisplayValue = addition(accumulator, currentNumber);
            break;
        case "-":
            newDisplayValue = subtraction(accumulator, currentNumber);
            break;
        }

        //rounds numbers decimal to 5 places
        newDisplayValue = Number(newDisplayValue.toFixed(5));
        //if the number is inside of the storable range print to display, else throw error
        if(newDisplayValue < 9007199254740991 && newDisplayValue > -9007199254740991){
            //if the number is small enough to properly show on the display, print to display, else throw error
            if(newDisplayValue.toString().length <= 14){
                //setting the display's value to the new value
                setDisplayValue(newDisplayValue);
                //adding display value to the accumulator
                accumulator = newDisplayValue;
            }
            else{
                alert("The result is too long to fit on Number Crunchers screen. \nThe answer is: " + newDisplayValue);
                setDisplayValue(accumulator);
            }
        }
        else{
            alert("The calculation result is too big to be correctly calculated by Number Cruncher");
            setDisplayValue(accumulator);
        }
    };

    //this function changes the value shown on the calculator display
    setDisplayValue = function(value) {
        display.val(value);
    };

    //this function gets the current value in the display
    getDisplayValue = function() {
        return display.val() + "";
    };

    //this function clears the display and resets tracking variables
    clearDisplay = function() {
        accumulator = null;
        operatorSet = false;
        equalsPressed = false;
    
        setDisplayValue("0");
    };

    //this function removes the last operand entered in the display
    deleteOperand = function() {
        var displayValue = getDisplayValue();

        //if there is a operand, remove it set calc display to new value
        if(displayValue){
            displayValue = displayValue.slice(0, displayValue.length - 1);
            displayValue = displayValue ? displayValue: "0";

            setDisplayValue(displayValue);
        }
    };

    //this function handles operand and decimal button pushes
    enterOperand = function(buttonValue) {
        //if new operator has been set, or if the display is == 0, set display to the number pushed
        if(operatorSet == true || getDisplayValue() == "0" && buttonValue != "."){
            setDisplayValue(buttonValue);
            operatorSet = false;
        }
        
        else{
            //check if current value in the display + 1 is > max display number, 
            if(getDisplayValue().toString().length + 1 > 14){
                alert("Cannot enter more than 14 operands");
            }
            else{
                //check if . already exists in the current display value
                if(buttonValue == "." && getDisplayValue().toString().indexOf(".") != -1){
                    return 0;
                }
                else{
                    setDisplayValue(getDisplayValue() + buttonValue);
                }  
            }
        }
    };

    //this function handles the operator button pushes
    setOperator = function(operatorValue) {
        if(operatorValue === "="){
            equalsPressed = true;
            calculate();
            return;
    }
        if(!equalsPressed) calculate();
            equalsPressed = false;
            operator = operatorValue;
            operatorSet = true;
            accumulator = parseFloat(getDisplayValue());
    };

    hideSplash = function() {
        $.mobile.changePage($("#portrait-calc"),"fade");
    }
});