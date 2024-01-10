
let validEmails=[];
let invalidEmails=[];
let counter=0;
let upload = document.getElementById("upload");
upload.addEventListener("change", () => {
    upload.style.color="white";
    let fr = new FileReader();
    fr.readAsText(upload.files[0]);
    fr.onload = function () {
        let Arr = fr.result.split(/\r?\n|\n/).map(e => {
            return e.split(',');
        });
        Window.valNo = 0;
        let invalNo = 0;
        Window.valMail = [];
        Arr.forEach(e => {
            let em = String(e);
            let m = e.map(e => {
                return `<td>${e}</td>`;
            })
            let creEle = document.createElement("tr");
            creEle.innerHTML = m;
            if (em != "") {
                if (em.charAt(em.length - 4) == '.') {
                    document.querySelector("table#val").appendChild(creEle);
                    Window.valMail.push(em);
                    validEmails.push(em);
                    
                    Window.valNo = Window.valNo + 1;
                    return false;
                }
                else if (em.charAt(em.length - 3) == '.') {
                    document.querySelector("table#val").appendChild(creEle);
                    Window.valMail.push(em);
                    validEmails.push(em);
                    Window.valNo = Window.valNo + 1;
                    return false;
                }
                else {
                    document.querySelector("table#inval").appendChild(creEle);
                    invalidEmails.push(em);
                    invalNo = invalNo + 1;
                    return false;
                }
            }
          console.log(validEmails.length);
           
        });

        document.querySelector("#valCount").innerHTML = Window.valNo;
        document.querySelector("#invalCount").innerHTML = invalNo;


    };
});

// stmp configuration
function emailSend(em){
	var subject = document.getElementById('subject').value;
	var ebody = document.getElementById('ebody').value;
	var email=em;
	Email.send({
    Host : "smtp.elasticemail.com",
    Username : "username",
    Password : "password",
    To : email,
    From : "username",
    Subject : subject,
    Body : ebody
}).then(
  message => {
  	if(message=='OK'){
        counter++;
    }
    if(counter==validEmails.length){
        alert("Succssfully "+counter+" email messages are sent ");
    }
  }
);
}


function sendEachMail(){
    for(let i=0;i<validEmails.length;i++){
           let each_mail=validEmails[i];
           emailSend(each_mail);
    }

    


}