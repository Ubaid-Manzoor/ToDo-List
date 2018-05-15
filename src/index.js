import {DOM} from '../dist/DOMfetures.js';

import {ValidateFrom} from '../dist/FormValidation.js';

import {PM} from '../dist/ProjectManupulation.js'; 

import {AddButtonFuntionalities,OptionButton,translateButtons} from '../dist/ButtonFuntionalities.js';

(()=>{

    let Delete_button;

    window.addEventListener('load',()=>{
       if(PM.UserExit()){
           PM.DontDisplayForm();
           PM.DisplayUserName();
           PM.DisplayAllProjects();
           DOM.GetElement("body").style.pointerEvents = "initial";
           Delete_button = DOM.GetElements(".delete_option");
       }else{
           PM.SetDefaultProjects();
           Delete_button = DOM.GetElements(".delete_option");
       }
       AddDeleteFuntionality();
    });
    DOM.GetElement("button").onclick = ()=>{
        console.log("4");
        let CurrentFrom = DOM.GetElement('.Details_form');
        let username = ValidateFrom(CurrentFrom);
        if(username == false){
            return false;
        }else{
            PM.Storedata('UserName',username);
            PM.DisplayUserName();
        }
        DOM.AddClass(DOM.GetElement(".Details_Box"),"animateFrom");
        DOM.GetElement("body").style.pointerEvents = "initial";
    };

// Time Manipulation

    (()=>{
        console.log("5");
        let TimeDiv = DOM.GetElement('.date');
        let CurrentDate = DOM.GetDateObject();
        TimeDiv.innerHTML = `<h1>${CurrentDate.GetDate()}</h1>`;
    })();

// Setting Manipulation

    const DisplaySubListItems = (element,i)=>{
        console.log("6");
        let CurrentSub_list = DOM.GetElements(".sub_list")[`${i}`];
        if(!CurrentSub_list.classList.contains(`animateSublist${i}`)){
            DOM.AddClass(CurrentSub_list,`animateSublist${i}`);
            DOM.DeleteClass(CurrentSub_list,`animateSublist${i}0`);
        }
        else{
            DOM.DeleteClass(CurrentSub_list,`animateSublist${i}`);
            DOM.AddClass(CurrentSub_list,`animateSublist${i}0`);
        }
        DOM.toggleClass(element,'FlipAround');
    };


    DOM.GetElements(".down_arrow").forEach((element,i)=> {
        console.log("7");
        element.onclick = ()=>{
            DisplaySubListItems(element,i);
        }
    });

    const DisplayListItems = ()=>{
        console.log("8");
        let body = DOM.GetElement('body');
        if(!body.classList.contains("ShowSetting")){
            DOM.AddClass(body,"ShowSetting");
            DOM.DeleteClass(body,"CloseSetting");
        }
        else{
            DOM.DeleteClass(body,"ShowSetting");
            DOM.AddClass(body,"CloseSetting");
        }
    };


    DOM.GetElement('.Setting_button').onclick = ()=>{
        DisplayListItems();
    };

// Plus Button

    const SetRequiredAtt = ()=>{
        let DefaultBox = DOM.GetElement('.EditableDiv');
        DefaultBox.setAttribute("contenteditable","true");
        DefaultBox.setAttribute("data-placeholder","Project");
        DefaultBox.focus();
    };

    DOM.GetElement('.plus_sign').onclick = ()=>{
        SetRequiredAtt();
        translateButtons();
        AddButtonFuntionalities();
        // DOM.GetElement('.plus_sign').setAttribute("id","default_box");
    };

    const AddDeleteFuntionality = ()=>{
        OptionButton(Delete_button);
    }

})();

