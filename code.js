const XKCD = "https://xkcd.now.sh/?comic="

let latestIssueId = undefined;
let currentIssueId = undefined;
// write your code here

const fetchIssue = async ( issue_id )=> {
    let url = `${XKCD}${issue_id}`;
    return fetch( url ).then( (res) => {
        return res.json();
    })
    .then( (data) => {
        let elem = document.querySelector("div#xkcd>img");
        elem.setAttribute("src", data.img);
        let status = document.getElementById("num");
        status.innerText = `issue ${data.num} - ${data.day}/${data.month}/${data.day}`     
        currentIssueId = data.num ;
    })
    .catch( (error)=>{
        console.error(error);
    })

}

const buttonLockUnlock = ( issue_id ) =>{
    let btn_next = document.getElementById("next");
    let btn_prev = document.getElementById("previous")
    if( issue_id == 1 ){
        btn_prev.style.visibility = "hidden";
    }
    else if ( issue_id == latestIssueId  ){
        btn_next.style.visibility = "hidden";
    }
    else if( btn_next.style.visibility = "hidden") {
        btn_next.style.visibility = "visible"
    }
    else if(btn_prev.style.visibility = "hidden"){
        btn_prev.style.visibility = "visible"
    }
}

const nextIssue = async () => {
    let issue = currentIssueId+1;
    buttonLockUnlock(issue);
    return fetchIssue(issue);
}

const previousIssue = async () => {
    let issue = currentIssueId-1;
    buttonLockUnlock(issue);
    return fetchIssue(issue);
}

document.addEventListener("DOMContentLoaded", () => {

    let reset = document.getElementById("reset");
    reset.addEventListener("click", () =>{
        fetchIssue("latest").then( () => {
            latestIssueId = currentIssueId;
            buttonLockUnlock(currentIssueId);
        });
    });

    let next = document.getElementById("next");
    next.addEventListener("click", () => {
        nextIssue();
    });

    let previous = document.getElementById("previous");
    previous.addEventListener("click", () => {
        previousIssue();
    });

});