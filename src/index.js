import 'pubsub-js';

import {DOM} from '../dist/DOMfetures.js';

import {ValidateFrom} from '../dist/FormValidation.js';

import {PM} from '../dist/ProjectManupulation.js'; 

import {AddButtonFuntionalities,PlayOptionButton,translateButtons,
        DeleteCurrnetProject,PlayDeleteButton,DisplayListPage,
        AddSaveItemButton,AddFuntionalityToItemButton,
        AddFuntionalityToTaskDoneButton,AddFuntionToLIofAllProjectsInSetting} from '../dist/ButtonFuntionalities.js';

(()=>{

    window.addEventListener('load',()=>{
       if(PM.UserExit()){
           PM.DontDisplayForm();
           PM.DisplayUserName();
           PM.DisplayAllProjects();
           DOM.GetElement("body").style.pointerEvents = "initial";
       }else{
           PM.SetDefaultProjects();
           DisplayForm();
       }
       LetInitialChanges();
    });

    const DisplayForm = ()=>{
        let Form = DOM.GetElement(".Details_Box");
        Form.style.display = "block"; 
    };
    const LetInitialChanges=()=>{
        ThreeDotButtonFuntionality();
        AddDeleteButtonFuntionality();
        AddShowProjectListFuntionality();
        AddSaveItemButton();
        AddSaveItemButtonFuntionality();
        PM.DisplayAllProjectsItems();
        TaskDoneButton();
        AddAsideShowProjectFuntionality();
    };
    DOM.GetElement("button").onclick = ()=>{
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
        // AddDeleteFuntionality();
    };

// Time Manipulation

    (()=>{
        let TimeDiv = DOM.GetElement('.date');
        let CurrentDate = DOM.GetDateObject();
        TimeDiv.innerHTML = `<h1>${CurrentDate.GetDate()}</h1>`;
    })();

// Setting Manipulation

    const DisplaySubListItems = (element,i)=>{
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
        element.onclick = ()=>{
            DisplaySubListItems(element,i);
        }
    });

    const DisplayListItems = ()=>{
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
    };

    const ThreeDotButtonFuntionality = ()=>{
        PlayOptionButton();
    }

    const AddDeleteButtonFuntionality =()=>{
         PlayDeleteButton();
    }

//Show Lists

    const AddShowProjectListFuntionality = ()=>{
        DisplayListPage();
    };

    const AddSaveItemButtonFuntionality = ()=>{
        AddFuntionalityToItemButton();
    };

    const TaskDoneButton = ()=>{
      AddFuntionalityToTaskDoneButton();  
    };

    const AddAsideShowProjectFuntionality = ()=>{
        AddFuntionToLIofAllProjectsInSetting();
    }
})();