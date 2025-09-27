const container= document.createElement("div");
const inputField=document.createElement("input");
const inputActionBtn= document.createElement("button");
const characterContainer=document.createElement("div");
const characterImage=document.createElement("img");
const characterName=document.createElement("h2");
const characterDescription=document.createElement("p");
const list=document.createElement("div");

inputActionBtn.innerText="search";
inputField.value="thanos";


const date = new Date();
console.log(date.getTime());
const [timestamp, apikey, hashValue]=[ts, publicKey, hashVal];


function displayWords(value){
    inputField.value=value;
    removeElement();
}
function removeElement(){
    list.innerHTML="";
}

inputField.addEventListener("keyup", async () =>{
    removeElement();
    if (inputField.value.length < 4){
        return false;
    }

    const url=`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&nameStartsWith=${inputField.value}`;
    const response=await fetch(url);
    const jsonData= await response.json();
    jsonData.data["results"].forEach((result)=>{
        let name=result.name;
        let div= document.createElement("div");
        div.style.cursor ="pointer"
        div.style.backgroundColor="grey"
        // div.style.position="absolute"
        div.style.width="230px"
        div.style.height="5px"
        div.style.zIndex="1"
        div.classList.add("autocomplete-items");
        // div.onclick = () => displayWords(name);
        div.setAttribute("onclick", "displayWords('" +name +"')");
        let word ="<b>" + name.substr(0,inputField.value.length) +"</b>";
        word += name.substr(inputField.value.length);
        div.innerHTML = `<p class="item"> ${word} </p>`;
        list.appendChild(div);
    });



});


function addAutocompleteStyling() {
    const style = document.createElement('style');
    style.textContent = `
        .autocomplete-items {
            border: 1px solid #d4d4d4;
            border-top: none;
            background-color: #f1f1f1;
            padding: 10px;
            cursor: pointer;
        }
        .autocomplete-items:hover {
            background-color: #e9e9e9;
        }
    `;
    document.head.appendChild(style);
}

// Call this function after your DOM is loaded
addAutocompleteStyling();

document.body.append(container);

document.body.style.backgroundColor="red";
Object.assign(document.body.style,{
    padding:"0px",
    margin:"0px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
})

Object.assign(container.style,{
    width:"320px",
    height:"auto",
    backgroundColor:"black",
    // position:"absolute",
    // dispaly:"flex",
    padding:"15px",
    color:"white",
    margin:"20px",
    padding:"20px",
    borderRadius:"10px",

})
Object.assign(inputField.style,{
    // color:"white",ddd
    width : "230px",
    height:"25px",
    borderRadius:"0.5em",
})
Object.assign(inputActionBtn.style,{
    backgroundColor:"red",
    color:"white",
    borderRadius:"5px",
    marginLeft:"5px",
    width:"70px",
    height:"30px",
    fontWeight:"bold",
    position:"fixed",
    fontSize:"17px",
    cursor:"pointer",
})
Object.assign(characterContainer.style,{
    // position:"fixed",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    marginTop:"15px",
    textAlign:"justify",
})

Object.assign(characterImage.style,{
    // position:"fixed",
    width:"100px",
    height:"100px",
    borderRadius:"50%",
    borderColor:"white",
    borderStyle:"solid",
    borderWidth:"5px",
    cursor:"pointer",
})

container.append(inputField, inputActionBtn,list,  characterContainer);
characterContainer.append(characterImage , characterName, characterDescription);

characterImage.addEventListener("mouseover", ()=>{
    characterImage.style.width="150px"
    characterImage.style.height="150px"
})
characterImage.addEventListener("mouseout", ()=>{
    characterImage.style.width="100px"
    characterImage.style.height="100px"
})

inputActionBtn.addEventListener("click",(getResult= async ()=>{
    if(inputField.value.trim()==""){
        alert("enter MARVEL character name");
    }else{
        // textContainer.innerHTML=""
        const  url=`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&name=${inputField.value}`;
        const response = await fetch(url);
        const jsonData = await response.json();
        jsonData.data["results"].forEach(element => {
            characterImage.src=`${element.thumbnail["path"] + "." + element.thumbnail["extension"]}`;
            characterName.innerText=`${element.name}`;
            characterDescription.textContent=`${element.description}`;
        });
    }
}));
window.onload = ()=>{
    getResult();
}