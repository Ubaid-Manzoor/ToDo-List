import {DOM} from '../dist/DOMfetures.js';


let AllProjects = [];

let DefaultProjects = ["Machine Learning","Web development"];

let Option_button;

let Delete_option;
 
let Edit_option;

let PM = {
    DisplayUserName : ()=> {
        let username = PM.GetStoredData('UserName');
        let header = DOM.GetElement('.username');
        let Dom = `Hi ${username}`;
        DOM.ChangeInnerHtml(header,Dom);
    },
    GetStoredData : (data)=> { 
        return localStorage.getItem(`${data}`);
    },
    Storedata : (data,value)=>{
        localStorage.setItem(`${data}`,`${value}`);
    },
    UserExit : ()=>{
        if(PM.GetStoredData('UserName') == null){
            return false;
        }else{
            return true;
        }
    },
    DontDisplayForm : ()=>{
        DOM.GetElement('.Details_Box').style.display = "none";
    },
    DisplayUserName : ()=> {
        let username = PM.GetStoredData('UserName');
        let header = DOM.GetElement('.username');
        let Dom = `Hi ${username}`;
        DOM.ChangeInnerHtml(header,Dom);
    },


    StoreInArray : (project)=>{
        let CurrentProject = {};
        CurrentProject["name"] = `${project}`;
        CurrentProject["Tasks"] = [];
        AllProjects.push(CurrentProject);
    },


    StoreArray : ()=>{
        localStorage.setItem("AllProjects",JSON.stringify(AllProjects));
    },

    PutItemListInProjectArray : (ListArray,dataAtt)=>{
        let CurrentProjectTasks = AllProjects[dataAtt].Tasks;
        CurrentProjectTasks.push(ListArray);
        PM.StoreArray();
    },

    StoreProject : (project)=>{
        PM.StoreInArray(project);
        PM.StoreArray();
    },

    DisplayEachProjectsTask : (i,Tasks)=>{
        let AllUL = DOM.GetElements(".ListofTasks");
        let RequiredUL = AllUL[i];
        RequiredUL.innerHTML = "";
        Tasks.forEach((task,index)=>{
            RequiredUL.innerHTML += `<li>${task}
                                    <div class="TaskDone" data-key="${index}" data-projectno="${i}">
                                         <div></div>
                                    </div>  
                                    </li>`;
        });
    },

    DisplayAllProjectsItems : ()=>{
        AllProjects.forEach((project,i)=>{
            let Tasks = project.Tasks;
            PM.DisplayEachProjectsTask(i,Tasks);
        });
    },

    DisplayProject : (project,i)=>{
        let container = DOM.GetElement('.Grid_container');
        let List = DOM.GetElement('.sub_list');
        let project_name = project["name"];
        let tasks = project["Tasks"].length;
        container.innerHTML += `<div class="Project_frame" data-key="${i}">
                                    <h1>${project_name}</h1>
                                    <p class="showList" data-key="${i}">${tasks}  items</p>    
                                    <div class="delete_option" data-key="${i}">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div class = "Left_frame" data-key="${i}">
                                    <div class="Left_button">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    </div>
                                </div>
                                <div class="ListPage" data-key="${i}">
                                <div class="up_arrow"></div>
                                <div class="helperBox">
                                    <form class="ListForm">
                                        <input type="text" placeholder="I want to..." class="ListInput" data-key="${i}">
                                        <div class="saveList" data-key="${i}">
                                            <div></div>
                                        </div>
                                    </form>
                                </div>
                                <div class="ListHeading">
                                <h1>Current List of Tasks</h1>
                                    <ul class="ListofTasks" data-key="${i}">
                                        
                                    </ul>
                                </div>
                            </div>`;
        List.innerHTML += `<li class="ProjectList" data-key="${i}">${project_name}</li>`
    },

    DisplayHelperBox : ()=>{
        let container = DOM.GetElement('.Grid_container');
        container.innerHTML += `<div >
                                    <div class="EditableDiv"></div>
                                    <div class = "frame_button">
                                        <div class="cancle_button">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div class = "frame">
                                        <div class="save_button"></div>
                                    </div>
                                </div>`;
    },

    DisplayAllProjects : ()=>{
        AllProjects = JSON.parse(localStorage.getItem("AllProjects"));
        AllProjects.forEach((project,i)=>{
            PM.DisplayProject(project,i);
         });
        PM.DisplayHelperBox();
        //temporary here

    },


    SetDefaultProjects : ()=>{
        DefaultProjects.forEach((project,i)=>{
            PM.StoreProject(project);
        });
        PM.DisplayAllProjects();
    },
    UpdateArray : (index)=>{
        AllProjects.splice(index,1);
    },

    ClearAllList : ()=>{
        let AllUl = DOM.GetElements(".ListofTasks");
        AllUl.forEach((ul)=>{
            ul.innerHTML = "";
        });
    },

    //ListItems
    DeleteListItemsFromArray : (button)=>{
        let TaskNo = button.getAttribute("data-key");
        let ProjectNo = button.getAttribute("data-projectno");
        let CorrespondingProject = AllProjects[ProjectNo];
        let TaskArray = CorrespondingProject.Tasks;
        TaskArray.splice(TaskNo,1);
        PM.AfterDeletionOfUl(ProjectNo);
    },
    AfterDeletionOfUl : (ProjectNo)=>{
        PM.ClearAllList();
        PM.DisplayAllProjectsItems(); 
        PM.ItemsNumber(ProjectNo);
    },

    ItemsNumber : (ProjectNo)=>{
        let Project = AllProjects[ProjectNo];
        let ItemNo = Project.Tasks.length;
        let CurrentItemNumberElements = DOM.GetElements(".showList")[ProjectNo];
        CurrentItemNumberElements.innerHTML = `${ItemNo}items`;
    }
};
export {PM};