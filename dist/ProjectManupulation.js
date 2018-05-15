import {DOM} from '../dist/DOMfetures.js';


let AllProjects = [];

let DefaultProjects = ["Machine Learning","Web development"];

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


    StoreProject : (project)=>{
        PM.StoreInArray(project);
        PM.StoreArray();
    },

    DisplayProject : (project,i)=>{
        let container = DOM.GetElement('.Grid_container');
        let project_name = project["name"];
        let tasks = project["Tasks"].length;
        container.innerHTML += `<div class="Project_frame" data-key="${i}">
                                    <h1>${project_name}</h1>
                                    <small>${tasks}items</small>    
                                    <div class="delete_option" data-key="${i}">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div class = "Left_frame">
                                    <div class="Left_button">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    </div>
                                    <div class = "Right_frame">
                                        <div class="Right_button"></div>
                                    </div>
                                </div>`;
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
    },


    SetDefaultProjects : ()=>{
        DefaultProjects.forEach((project,i)=>{
            PM.StoreProject(project);
        });
        PM.DisplayAllProjects();
    }
};
export {PM};