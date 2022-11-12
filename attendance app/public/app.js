import {signinFirebase,
    logoutFirebase,
    keeploggined,
    uploadImage,
    registerstudent,
    createclassroom,
    auth,getclasses
  } from "./firebase.js";




window.signIn = async function () {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    try {
        await signinFirebase(email, password);
        await swal("Congratulations!", "Loggined successfully!", "success");
        location.href = "dashboard.html";


    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e.message
            
        })
    }
}

keeploggined()

window.signout= async function(){
    logoutFirebase()
    backtologin()

}

window.createstudentId = async function() {
    const cnicNo = document.getElementById("cnic").value;
    const father = document.getElementById("father").value;
    const phonenumber = document.getElementById("phonenumber").value;
    const fullname = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
    const image = document.getElementById("studentimage").files[0]
    // const rollnumber= Math.random().toFixed(8).splice(2)
    
    try {
        const imageUrl = await uploadImage(image)
        var students= {fullname,imageUrl,cnicNo,phonenumber,father,imageUrl,}
        await registerstudent(students)
        await swal("success", "student registered!", "go back to dashboard");
        
    }
    catch (e) {
        Swal.fire({
            icon: 'missed something!',
            title: 'sorry',
            text: e.message
            // footer: '<a href="">Why do I have this issue?</a>'
        })
    }
};

window.createclass = function(){
    var coursename = document.getElementById("coursename").value
    var teachername =document.getElementById("teachername").value
    var batchno=document.getElementById("batchno").value
    var classtimings = document.getElementById("timings").value
   var sectionname = document.getElementById("sectionname").value
    
     
    try{
        var userinfo={coursename,teachername,classtimings,batchno,sectionname}
        createclassroom(userinfo)
        // alert(coursename+teachername+timings)
        // window.location.href='dashboard.html';
    }
    catch{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e.message
            // footer: '<a href="">Why do I have this issue?</a>'
        })
    }

}

window.classes=function(){
    window.location.href='classroom.html';
}
window.backtologin=function(){
    window.location.href='index.html';

}
window.addstudent=function(){
    window.location.href="student.html";
}
   



// show classes
window.showclassesAvailable=function(){
    var showclasses=document.getElementById("classcontainer");
    showclasses.innerHTML+='';
    for (let item of users) {


        showclasses.innerHTML += `
        <div class="user-item-div" onclick = "initiateChat('${item.userId}')" >
            <div class="user-item-left-profile">
                <div class="user-pic">
                    <img src="${item.imageUrl}" alt="">
                </div>
                <div class="user-item-left-name-and-message">
                    <div class="user-item-name"><span>${item.fullname}</span></div>
                    <div id = "last-msg" class="user-item-last-msg"><span></span></div>
                </div>
            </div>

            <div class="user-item-right-profile">
                <div class="last-msg-time">
                    <span id="last-msg-time"><span>
                </div>
            </div>
        </div>
`
    }
    
}


window.getClasses = async function () {
    let classes = await downloadclasses()
    for (let Item of classes) {
        let classItemObj = Item
        console.log(classItemObj);
        const entries = Object.entries(classItemObj);
        console.log(entries);
        for (const [key, value] of Object.entries(classItemObj)) {
            console.log(`${key}: ${value}` );
            if(`${key}` ==  'classTeacher' ){
                document.getElementById("categories").innerHTML += `
            <option value=" ${key}: ${value}">  ${value}</option>
            `

            }

            
        }


    }
}
getClasses()
