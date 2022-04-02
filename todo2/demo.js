var jobs = [];
const todokey = "ToDoList";


function init(){
    if(localStorage.getItem(todokey) == undefined){
        jobs = [
            "Quét nhà lần 1",
            "Lau nhà lần 1",
            
        ]

        localStorage.setItem(todokey, JSON.stringify(jobs))
    }
    else{
        jobs = JSON.parse(localStorage.getItem(todokey))
    }
}

function renderJob(){
    let tbJob = document.querySelector('.table>tbody');
    let htmls = jobs.map(function(job, index){
        return `
                <tr id="tr_${index}">
                    <td>${index + 1}</td>
                    <td>${job}</td>
                    <td class="text-center">
                        <a id="done_${index}" href="javascript:;" onclick="makeDone(${index})">
                            <i class="fas fa-check"></i>
                        </a>
                        <a id="undone_${index}" class="d-none" href="javascript:;" onclick="makeUndone(${index})">
                            <i class="fas fa-ban"></i>
                        </a>
                        <a href="javascript:;" onclick="removeJob(${index})">
                            <i class="fas fa-trash"></i>
                        </a>
                    </td>
                </tr>
                `
    })

    tbJob.innerHTML = htmls.join("");
}


function createJob(){
    let jobName = document.querySelector("#jobname").value;
    if(jobName === ''){
        alert("Job name is required")
        return;
    }

    jobs.push(jobName);
    renderJob();
    localStorage.setItem(todokey, JSON.stringify(jobs))
    document.querySelector("#jobname").value = "";
}


function makeDone(index){
    document.querySelector(`#tr_${index}>td:nth-child(2)`).classList.add("make-done");
    document.querySelector(`#done_${index}`).classList.add("d-none");
    document.querySelector(`#undone_${index}`).classList.remove("d-none");
}

function makeUndone(index){
    document.querySelector(`#tr_${index}>td:nth-child(2)`).classList.remove("make-done");
    document.querySelector(`#done_${index}`).classList.remove("d-none");
    document.querySelector(`#undone_${index}`).classList.add("d-none");
}

function removeJob(index){
    let confirmed =  window.confirm("Are you sure to remove this job?");
    if(confirmed){
        jobs.splice(index,1);
        renderJob();
        localStorage.setItem(todokey, JSON.stringify(jobs))
    }
}




init();
renderJob()