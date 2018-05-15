const ValidateEachInput = (input)=>{
    if(input.value == ""){
        alert("fill User Name");
        return false;
    }else{
        return input.value;
    }
};

const ValidateFrom = (element)=>{
    let Allinputs =  element.querySelectorAll('input');
    let  currentResult;
    Allinputs.forEach(input => {
        currentResult = ValidateEachInput(input);
    });
    if(currentResult == false){
        return false;
    }else{
        return currentResult;
    }
};

export {ValidateFrom};