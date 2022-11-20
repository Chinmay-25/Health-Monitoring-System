const table =document.getElementById("table");

function buildTable(data){
    var table = table;

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].age}</td>
                        <td>${data[i].birthdate}</td>
                  </tr>`
        table.innerHTML += row


    }
}
async function searchFun() {

    try {
        // console.log(patient.value);

        const userData = {
            "patientNumber": patient.value,
            "date": date.value

        }
        // console.log(userData);
        const post = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };


        let completeload = await fetch("http://localhost:3002/reading/getReadings", post);
        completeload = await completeload.json();
        if (completeload.message == "success") {
            console.log("Found Data", completeload.data);
            buildTable(completeload)

        } else {
            console.log("Data not found");
            document.querySelector("h3").innerText="Patient not Found";
        }

    } catch (err) {
        console.log(err.message);
    }
}

searchFun();