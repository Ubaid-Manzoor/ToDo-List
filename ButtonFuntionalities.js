import {DOM} from '../dist/DOMfetures.js';

import {PM} from '../dist/ProjectManupulation.js'; 


const translateButtons = ()=>{
    DOM.AddClass(DOM.GetElement(".frame_button"),"translate_Up");
    DOM.AddClass(DOM.GetElement(".frame"),"translate_Up");
    DOM.DeleteClass(DOM.GetElement(".frame_button"),"translate_Back");
    DOM.DeleteClass(DOM.GetElement(".frame"),"translate_Back");
};

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

    const ClearScreen = ()=>{
        let container = DOM.GetElement('.Grid_container');
        container.innerHTML = "";
    }

    save_button.onclick = ()=>{
        let NewProject = DOM.GetElement(".EditableDiv").textContent;
        PM.StoreProject(NewProject);
        RemoveAttribute();
        translateButtonsBack();
        ClearScreen();
        PM.DisplayAllProjects();
    };

    


};
//Delete Button

    const translateButton = (project)=>{
        if(!project.querySelector(".Left_frame").classList.contains("translate_Up")){
            DOM.AddClass(project.querySelector(".Left_frame"),"translate_Up");
            DOM.AddClass(project.querySelector(".Right_frame"),"translate_Up");
            DOM.DeleteClass(project.querySelector(".Left_frame"),"translate_Back");
            DOM.DeleteClass(project.querySelector(".Right_frame"),"translate_Back");
        }else{
            DOM.DeleteClass(project.querySelector(".Left_frame"),"translate_Up");
            DOM.DeleteClass(project.querySelector(".Right_frame"),"translate_Up");
            DOM.AddClass(project.querySelector(".Left_frame"),"translate_Back");
            DOM.AddClass(project.querySelector(".Right_frame"),"translate_Back");
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
        console.log(button);
        CurrentProjects.forEach(project =>{
            if(MatchDataKey(project,dataAtt)){
                console.log(project);
                translateButton(project);
            }
        });
        
    };
    const OptionButton = (Option_button)=> {
        console.log("asd");
        console.log(Option_button);
        Option_button.forEach(button => {
            button.onclick = ()=>{
                console.log(button);
                AddFeaturestoOptionButton(button);
            }
        });
    } 
export {AddButtonFuntionalities,OptionButton,translateButtons};