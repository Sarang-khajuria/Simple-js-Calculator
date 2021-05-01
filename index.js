const operators = {
  '+': function(a, b){ return a+b},
  '-': function(a, b){ return a-b},
  '*': function(a, b){ return a*b},
  '/': function(a, b){ return a/b}
}
let nextStr = '';
let prevStr = '';
let showStr = ''
let didOperation = false;
const equal = Object.freeze({"INITIAL":'initial', "CALLED":'called', "NOT_CALLED":'not_called'})
let equalCalled = equal.INITIAL;
let operator = null;
let prevOperator = null;
function doOperation(value) {

  if(!isNaN(Number(value)) && showStr.length <=10){
    prevOperator = operator;
    if(equalCalled === equal.CALLED) {
      doOperation('clear')
    }

    if(didOperation){
      nextStr = '';
      showStr = '';
      didOperation = false;
    }
      nextStr += value;
      showStr = '' + nextStr;
  }
  switch(value) {
    case 'clear':
      nextStr = '';
      prevStr = ''
      showStr = '';
      operator = null;
      prevOperator = null;
      didOperation = false;
      equalCalled = equal.INITIAL;
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      equalCalled = equal.NOT_CALLED;
      operator = value;
      if(!prevStr) {
        prevStr = nextStr;
        nextStr = '';
        showStr = prevStr;
      }
       else if(nextStr !== '' && !didOperation){
        let temp = nextStr;
        nextStr = operators[prevOperator](Number(prevStr), Number(nextStr));
        showStr = '' + nextStr;
        prevStr = nextStr;
        didOperation = true
      }
      break;
    case '=':
      if(!didOperation && prevOperator){
        nextStr = operators[prevOperator](Number(prevStr), Number(nextStr));
        showStr = '' + nextStr;
        prevStr = nextStr;
        operator = null;
        didOperation = true;
        equalCalled = equal.CALLED;
      }
      break;
    default:
      break;
  }
  document.getElementsByTagName('input')[0].value = showStr
}

function getInput(event) {
  event.target.value = nextStr;
  event.preventDefault();
}

//TODO: adding keypress events to the input field