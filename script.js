let title, message, date;
let entris = [];
let entrissec = [];
let entry;
let newDiv, new1, new2;
let count = 0;
let divId;
let mainid;
let selectedIndex, cards;
let selectvalue;
let enterDate;
let i, index;



function checkOption() {
    selectvalue = document.getElementById("select_box").value
    console.log(selectvalue);
    if (selectvalue == 1) {
        document.getElementById("filterdate").style.display = "none"
        document.getElementById("filterdate").value = ''
        rearrangeDivs()
    } else {
        document.getElementById("filterdate").style.display = "flex";
    }
}

document.getElementById("myform").addEventListener("submit", function (event) {
    event.preventDefault();
    title = document.getElementById("title-name").value;
    message = document.getElementById("message-text").value;
    date = document.getElementById("date").value;
    document.getElementById("empty").style.display = "none";
    event.target.reset();
    count++

    entry = {
        markas : false,
        id: `id${count}`,
        title: title,
        message: message,
        date: date
    };
    entris.push(entry);
    console.log(entry);
    console.log(entris);
    console.log(`id${count}`);
    rearrangeDivs()
    $("#exampleModal").modal("hide");
});


function editindex(id) {
    index = id
    for (i = 0; i < entris.length; i++) {
        if (id == entris[i].id) {
            document.getElementById("title-second").value = entris[i].title;
            document.getElementById("message-second").value = entris[i].message;
            document.getElementById("date-second").value = entris[i].date;
            break;
        }
    }
}


document.getElementById("myform-second").addEventListener("submit", function (evnt) {
    evnt.preventDefault();
    //second modal edited values update to arrays
    // console.log(i-1);
    entris[i].title = document.getElementById("title-second").value;
    entris[i].message = document.getElementById("message-second").value;
    entris[i].date = document.getElementById("date-second").value;

    // cards = document.getElementsByClassName('card_div');
    // console.log(cards);

    document.getElementById(`${index}`).innerHTML = `
        <div id="title-div">
            <h3>${entris[i].title}</h3>
            <h6>${entris[i].message}</h6>
            <h6>${entris[i].date}</h6>
        </div>
        <div style="flex-grow: 1;"></div>
        <div id="button-div">
            <button type="button" id="delete" class="btn btn-success" onclick="datadelete('${index}')">Delete</button>
            <button type="button" id="edit" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#editmodal" onclick="editindex('${index}')">Edit</button>
            <button type="button" id="mark" class="btn btn-danger" onclick="read('${index}')">Mark as complete</button>
        </div>
    `;
    evnt.target.reset();
});

function read(id) {
    let readercard = document.getElementById(`${id}`);
    let classcheck = "mainread"
    let filterid = entris.filter(function (fi_id){
        return fi_id.id == id
    })
    
    if (readercard.classList.contains(classcheck)) {
        readercard.classList.remove("mainread")
        filterid[0].markas = false
    } else {
        readercard.classList.add("mainread");
        filterid[0].markas = true
    }
}

function datadelete(id) {
    let selectDiv = document.getElementById(`${id}`)
    entris = entris.filter(function (value) {
        return value.id !== id
    })
    selectDiv.remove();
    console.log("entris is ", entris);
    console.log("entris length", entris.length);
}

function rearrangeDivs() {
    // removeAllCardDivs()
    enterDate = document.getElementById("filterdate").value
    const container = document.getElementById("container-fluid");
    container.innerHTML = '';
    if (enterDate == '') {
        for (let k = 0; k < entris.length; k++) {
            const newDiv = document.createElement("div");
            let nextid = entris[k].id
            newDiv.id = nextid;
            newDiv.className = 'card_div'
            if (entris[k].markas == true) {
                newDiv.classList.add("mainread")
            }

            newDiv.innerHTML = `
                <div id="title-div">
                    <h3>${entris[k].title}</h3>
                    <h6>${entris[k].message}</h6>
                    <h6>${entris[k].date}</h6>
                </div>
                <div style="flex-grow: 1;"></div>
                <div id="button-div">
                    <button type="button" id="delete" class="btn btn-success" onclick="datadelete('${nextid}')">Delete</button>
                    <button type="button" id="edit" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#editmodal" onclick="editindex('${nextid}')">Edit</button>
                    <button type="button" id="mark" class="btn btn-danger" onclick="read('${nextid}')">Mark as complete</button>
                </div>
            `;
            container.appendChild(newDiv);
            container.style.flexDirection = "column";
            container.style.alignItems = "center";
            container.style.justifyContent = "flex-start";
        }
    } else {
        let secdate = entris.filter(function (result) {
            return result.date == enterDate
        })
        for (let j = 0; j < secdate.length; j++) {
            const newDiv = document.createElement("div");
            let nextid1 = secdate[j].id
            newDiv.id = nextid1
            newDiv.className = 'card_div'
            if (secdate[j].markas == true) {
                newDiv.classList.add("mainread")
            }

            newDiv.innerHTML = `
                <div id="title-div">
                    <h3>${secdate[j].title}</h3>
                    <h6>${secdate[j].message}</h6>
                    <h6>${secdate[j].date}</h6>
                </div>
                <div style="flex-grow: 1;"></div>
                <div id="button-div">
                    <button type="button" id="delete" class="btn btn-success" onclick="datadelete('${nextid1}')">Delete</button>
                    <button type="button" id="edit" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#editmodal" onclick="editindex('${nextid1}')">Edit</button>
                    <button type="button" id="mark" class="btn btn-danger" onclick="read('${nextid1}')">Mark as complete</button>
                </div>
            `;
            container.appendChild(newDiv);
            container.style.flexDirection = "column";
            container.style.alignItems = "center";
            container.style.justifyContent = "flex-start";
        }
    }
}
