var jobs = [];
const ToDoList = 'todolist'

function init () {
    if(localStorage.getItem(ToDoList) == undefined) {
        jobs = [
            "Work with CSS",
            "Work with CSS",
            "Work with CSS"
        ]
        localStorage.setItem(ToDoList, JSON.stringify(jobs))
    }else{
        jobs = JSON.parse(localStorage.getItem(ToDoList))
    }
}

function renderJob() {
    let tbJob = document.querySelector('.table>tbody');
    let htmls = jobs.map(function(job, index){
        return `
        <tr class="tr_${index}">
            <td>${index}</td>
            <td>${job}</td>
            <td>
                <a href="javascript:;" onclick="getDoneJob(${index})">
                    <i class="fas fa-check"></i>
                </a>
                <a href="javascript:;" onclick="getUndoJob(${index})">
                    <i class="fas fa-ban"></i>
                </a>
                <a href="javascript:;" onclick="getRemoveJob(${index})">
                    <i class="fas fa-trash"></i>
                </a>
            </td>
        </tr>
                `
    })
    tbJob.innerHTML = htmls.join('');
}

function createJob(){

}

function getDoneJob(index) {
    document.querySelector(`#tr_${index}>td:nth-child(2)`).classList.add("make-done")

}

init();
renderJob();