import {DOM} from '../dist/DOMfetures.js';

import {PM,Option_button} from '../dist/ProjectManupulation.js'; 

import {ValidateFrom} from '../dist/FormValidation.js';

const translateButtons = ()=>{
    DOM.AddClass(DOM.GetElement(".frame_button"),"translate_Up");
    DOM.AddClass(DOM.GetElement(".frame"),"translate_Up");
    DOM.DeleteClass(DOM.GetElement(".frame_button"),"translate_Back");
    DOM.DeleteClass(DOM.GetElement(".frame"),"translate_Back");
};

const ClearScreen = ()=>{
    let container = DOM.GetElement('.Grid_container');
    let ListOfProjects = DOM.GetElement(".sub_list");
    ListOfProjects.innerHTML = "";
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

    // AFTER SAVING A PROJECT
    const AfterCreationOfNewProject = ()=>{
        translateButtonsBack();
        ClearScreen();
        PM.DisplayAllProjects();
        AddFuntionToLIofAllProjectsInSetting();
        PlayOptionButton();
        PlayDeleteButton();
        DisplayListPage();
        AddSaveItemButton();
        AddFuntionalityToItemButton();
        PM.DisplayAllProjectsItems();
        AddFuntionalityToTaskDoneButton();
    };

    save_button.onclick = ()=>{
        let NewProject = DOM.GetElement(".EditableDiv").textContent;
        PM.StoreProject(NewProject);
        RemoveAttribute();
        AfterCreationOfNewProject();
    };


};
//Option button

    const translateButton = (project)=>{
        if(!project.querySelector(".Left_frame").classList.contains("translate_Up")){
            DOM.AddClass(project.querySelector(".Left_frame"),"translate_Up");
            DOM.DeleteClass(project.querySelector(".Left_frame"),"translate_Back");
        }else{
            DOM.DeleteClass(project.querySelector(".Left_frame"),"translate_Up");
            DOM.AddClass(project.querySelector(".Left_frame"),"translate_Back");
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
                ChangesAfterDeletion();
            };
        });
    };

//// AFTER DELETING A PROJECT

    const ChangesAfterDeletion = ()=>{
        PM.StoreArray();
        ClearScreen();
        PM.DisplayAllProjects();
        PlayDeleteButton();//Set three dot button Funtionalities again
        PlayOptionButton();
        DisplayListPage();
        AddSaveItemButton();
        AddFuntionalityToItemButton();
        PM.DisplayAllProjectsItems();
        AddFuntionalityToTaskDoneButton();
    };

    const DeleteCurrnetProject = (button)=>{
        let data_value = button.getAttribute("data-key");
        let AllProjects = DOM.GetElements(".Project_frame");
        PM.UpdateArray(data_value); //Delete and Update Array
    };

    const DisplayListPage = ()=>{
        let ListPages = DOM.GetElements(".showList");
        ListPages.forEach((ListPage)=>{
            ListPage.onclick = ()=>{
                ShowListPage(ListPage);
            };
        });
    }
    const ShowListPage = (ListPage)=>{
        let data_value = ListPage.getAttribute("data-key");
        let AllUpArrow = DOM.GetElements('.up_arrow');
        let AllListPages = DOM.GetElements(".ListPage");
        DOM.AddClass(AllListPages[data_value],"Translate_Page_Down");
        DOM.DeleteClass(AllListPages[data_value],"Translate_Page_Up");
        AddFuntionalityToUpArrow(AllUpArrow[data_value],AllListPages[data_value]);
    };  

    const AddFuntionalityToUpArrow = (UpArrow,CurrentListPage)=>{
        UpArrow.onclick = ()=>{
            DOM.DeleteClass(CurrentListPage,"Translate_Page_Down");
            DOM.AddClass(CurrentListPage,"Translate_Page_Up");
        };
    };

    const AddClassToCorrespondingButton = (dataAtt)=>{
        let SaveItemButtons = DOM.GetElements(".saveList");
        SaveItemButtons.forEach((button)=>{
            let buttonDataAttribute = button.getAttribute("data-key");
            if(dataAtt === buttonDataAttribute){
                DOM.AddClass(button,"ShiftLeft");
            }
        });
    };

    const AddFuntionToLIofAllProjectsInSetting = ()=>{
        let allLI = DOM.GetElements(".ProjectList");
        console.log(allLI);
        allLI.forEach((LI)=>{
            LI.onclick = ()=>{
                SetAllPagesToInitialPosition();
                ShowListPage(LI);
                ShiftPageToLeft();
            };
        });
    }

    const SetAllPagesToInitialPosition = ()=>{
        let AllListPages = DOM.GetElements('.ListPage');
        AllListPages.forEach((Page)=>{
            DOM.DeleteClass(Page,"Translate_Page_Down");
        });
    }

    const ShiftPageToLeft = ()=>{
        let body = DOM.GetElement("body");
        DOM.DeleteClass(body,"ShowSetting");
    };

    const AddSaveItemButton = ()=>{
        let inputElement = DOM.GetElements(".ListInput");
        inputElement.forEach((input)=>{
            let dataAtt = input.getAttribute("data-key");
                input.onfocus = (input)=>{
                AddClassToCorrespondingButton(dataAtt);
            };
        });
    };

    const SaveAndDisplayCurrentListItem = (listdata,dataAtt)=>{
        PM.PutItemListInProjectArray(listdata,dataAtt);
        PM.DisplayAllProjectsItems();
    };

    const HelperFunction = (dataAtt)=>{
        let inputElement = DOM.GetElements(".ListInput");
        inputElement.forEach((input)=>{
            let inputdataAtt = input.getAttribute("data-key");
            if(dataAtt === inputdataAtt){
                let listdata = input.value;
                SaveAndDisplayCurrentListItem(listdata,dataAtt);

            }
        });
    };

    const AddFuntionalityToItemButton = ()=>{
        let ItemSaveButton = DOM.GetElements(".saveList");
        ItemSaveButton.forEach((button)=>{  
            let dataAtt = button.getAttribute("data-key");
            button.onclick = (button)=>{
                HelperFunction(dataAtt);
                AfterAddingListItem();
            };
        });
    };

    const AfterAddingListItem = ()=>{
        AddFuntionalityToTaskDoneButton();
    };

    const DeleteCurrentTask = (button)=>{
          PM.DeleteListItemsFromArray(button);
    }
    const AddFuntionalityToTaskDoneButton = ()=>{
        let AllTaskDoneButton  = DOM.GetElements(".TaskDone");
        AllTaskDoneButton.forEach((button)=>{
            button.onclick = ()=>{
                DeleteCurrentTask(button);
                AddFuntionalityToTaskDoneButton();
            };
        });
    };
export {AddButtonFuntionalities,PlayOptionButton,translateButtons,
        DeleteCurrnetProject,PlayDeleteButton,DisplayListPage,
        AddSaveItemButton,AddFuntionalityToItemButton,AddFuntionalityToTaskDoneButton,
        AddFuntionToLIofAllProjectsInSetting};