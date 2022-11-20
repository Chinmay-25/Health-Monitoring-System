const userName = document.getElementById("form2Example17");
const password = document.getElementById("form2Example27");
console.log(userName.value);
const loginBtn = document.getElementById("login");
console.log("hii")

console.log(loginBtn);  

async function loginFun() {



    try {
        const userData = {
            "username": userName.value,
            "password": password.value
        };
        // console.log(userData);
        const post = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };

        console.log(userName.value);
        console.log(password.value);
        console.log(userData);
        let completeload = await fetch("http://localhost:3002/user/login/", post);
        completeload = await completeload.json();
        if (completeload.message == "success") {
            console.log("Found Data", completeload.data);
            window.location.href="./temp.html";

        } else {
            console.log("Data not found");
            document.getElementById("para").innerText="Invalid Credentials";
        }

    } catch (err) {
        console.log(err.message);
    }
}

loginBtn.addEventListener('click', loginFun);