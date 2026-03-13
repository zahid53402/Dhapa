async function generate(){

let number=document.getElementById("number").value

let res=await fetch("/pair",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({number:number})

})

let data=await res.json()

document.getElementById("code").innerText=data.code

}
