import {DOM} from '../dist/DOMfetures.js';

import {PM,Option_button} from '../dist/ProjectManupulation.js'; 


const translateButtons = ()=>{
    DOM.AddClass(DOM.GetElement(".frame_button"),"translate_Up");
    DOM.AddClass(DOM.GetElement(".frame"),"translate_Up");
    DOM.DeleteClass(DOM.GetElement(".frame_button"),"translate_Back");
    DOM.DeleteClass(DOM.GetElement(".frame"),"translate_Back");
};

const ClearScreen = ()=>{
    let container = DOM.GetElement('.Grid_container');
    container.innerHTML = "";
}

const AddButtonFuntionalities = ()=>{
    let cancle_button = DOM.GetElement(".frame_button");
    let save_button = DOM.GetElement(".frame");

    //cancle Button

    const RemoveAttribute = ()=>{
        let DefaultBox = DOM.GetElement('.EditableDiv');
        DefaultBox.removeAttribute("contenteditable","true");
        DefaultBox.removeAttribute("data-placeholder","Project");
        DefaultBox.blur();
    };



    const translateButtonsBack = () =>{
        DOM.DeleteClass(DOM.GetElement(".frame_button"),"translate_Up");
        DOM.DeleteClass(DOM.GetElement(".frame"),"translate_Up");
        DOM.AddClass(DOM.GetElement(".frame_button"),"translate_Back");
        DOM.AddClass(DOM.GetElement(".frame"),"translate_Back");
    };


    cancle_button.onclick = ()=>{
        RemoveAttribute();
        translateButtonsBack();
};
 
    //save Button


    save_button.onclick = ()=>{
        let NewProject = DOM.GetElement(".EditableDiv").textContent;
        PM.StoreProject(NewProject);
        RemoveAttribute();
        translateButtonsBack();
        ClearScreen();
        PM.DisplayAllProjects();
        PlayOptionButton();
        PlayDeleteButton();

    };

    


};
//Option button

    const translateButton = (project)=>{
        if(!project.querySelector(".Left_frame").classList.contains("translate_Up")){
            DOM.AddClass(project.querySelector(".Left_frame"),"translate_Up");
            // DOM.AddClass(project.querySelector(".Right_frame"),"translate_Up");
            DOM.DeleteClass(project.querySelector(".Left_frame"),"translate_Back");
            // DOM.DeleteClass(project.querySelector(".Right_frame"),"translate_Back");
        }else{
            DOM.DeleteClass(project.querySelector(".Left_frame"),"translate_Up");
            // DOM.DeleteClass(project.querySelector(".Right_frame"),"translate_Up");
            DOM.AddClass(project.querySelector(".Left_frame"),"translate_Back");
            // DOM.AddClass(project.querySelector(".Right_frame"),"translate_Back");
        }
    };


    const MatchDataKey = (project,dataAtt)=>{
        if(project.getAttribute("data-key") == dataAtt){
            return true;
        }
    };
    const AddFeaturestoOptionButton = (button)=>{
        let dataAtt = button.getAttribute("data-key");
        let CurrentProjects = DOM.GetElements(".Project_frame");
        CurrentProjects.forEach(project =>{
            if(MatchDataKey(project,dataAtt)){
                translateButton(project);
            }
        });
        
    };


    const PlayOptionButton = ()=> {
        let Option_button = DOM.GetElements(".delete_option");
        Option_button.forEach(button => {
            button.onclick = ()=>{
                AddFeaturestoOptionButton(button);
            }
        });
    }; 
    const PlayDeleteButton = ()=>{
        let delete_option = DOM.GetElements(".Left_frame");
        delete_option.forEach((button)=>{
            button.onclick = ()=>{
                DeleteCurrnetProject(button);
                PM.StoreArray();
                ClearScreen();
                PM.DisplayAllProjects();
                PlayDeleteButton();
                PlayOptionButton();  //Set three dot button Funtionalities again
            };
        });
    };


    const DeleteCurrnetProject = (button)=>{
        let data_value = button.getAttribute("data-key");
        let AllProjects = DOM.GetElements(".Project_frame");
        PM.UpdateArray(data_value); //Delete and Update Array
    };


export {AddButtonFuntionalities,PlayOptionButton,translateButtons,DeleteCurrnetProject,PlayDeleteButton};