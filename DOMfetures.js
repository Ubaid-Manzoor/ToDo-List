let DOM = {
        GetElement : (element)=>{
            return document.querySelector(`${element}`);
        },
        GetElements : (element)=>{
            return document.querySelectorAll(`${element}`);
        },
        AddClass : (element,classname)=>{
                element.classList.add(`${classname}`);
        },
        DeleteClass : (element,classname)=>{
                element.classList.remove(`${classname}`);
        },
        toggleClass : (element,classname)=>{
                element.classList.toggle(`${classname}`);
        },
        GetDateObject : ()=>{
                var date = new Date();
                date.GetDate = ()=>{
                        return date.toDateString();
                };
                date.GetTime = ()=>{
                        return date.toLocaleDateString();
                };
                return date;
        },
        ChangeInnerHtml : (element,Dom)=>{
                element.innerHTML = `${Dom}`;
        }
};

export {DOM};