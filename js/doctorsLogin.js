

const butt = document.getElementById("login");

const patient = document.getElementById("patientId");

const date = document.getElementById("input-start");

const table =document.getElementById("myTable");
const reset =document.getElementById("reset");

let display=function displayvalues(data){

    document.getElementById("name").innerText+=data.patientName;
    document.getElementById("Indication").innerText+=data.indication;
    document.getElementById("conclusion").innerText+=data.conclusion;
    document.getElementById("mintemp").innerText+=data.temperature.min;
    document.getElementById("maxtemp").innerText+=data.temperature.max;
    document.getElementById("average").innerText+=data.temperature.Avg;

   
}
function buildTable(data){
  

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i][0]}</td>
                        <td>${data[i][1]}</td>
                  </tr>`
        table.innerHTML += row;


    }
}

console.log(butt);
console.log("hii");


async function searchFun() {

    try {

        console.log(date.value);

        const userData = {
            "patientNumber": patient.value,
            "date": date.value

        }
        console.log(userData);   
        const post = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };


        let completeload = await fetch("http://localhost:3002/reading/getReadings", post);
        completeload = await completeload.json();
        console.log(completeload)
        if (completeload.message == "success") {
            console.log("Found Data", completeload.data);
        
            console.log(completeload.data.abnormals[0][0]);
            buildTable(completeload.data.abnormals);
            display(completeload.data)
          

        } else {
            console.log("Data not found");
            document.querySelector("h3").innerText="Patient not Found";
        }

    } catch (err) {
        console.log(err.message);
    }
}

function resetfun(){
    window.location.href="./temp.html";


}
reset.addEventListener('click',resetfun);
butt.addEventListener('click',searchFun);