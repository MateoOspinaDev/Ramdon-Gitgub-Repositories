
//Obtener la lista de repositorio publicos
const githubBaseUrl="https://api.github.com";

const getPublicRepositories=async(url)=>{
    const repos = await fetch(`${url}/repositories`);
    return await repos.json();
}
/*
//Obtener los nombres de los owners
const getOwnersNamesOfPublicRepositories = async(url)=>{
    const repos = await getPublicRepositories(url);
    let ownersList = new Array;
    repos.forEach(element => {
        ownersList.push(element["owner"]["login"]);
    });
    return ownersList;
}

//Obetener los repositorios del primer owner
const getrepsoOfFirsOwner = async(url)=>{
    const repos = await getPublicRepositories(url);
    const firstOwnerReposUrl = repos[0]["owner"]["repos_url"];
    const reposFirstOwner = await fetch(firstOwnerReposUrl);
    return await reposFirstOwner.json();
}
*/

const getNanmeOfOwner=async(id,urlRepos)=>{
    const repos = await getPublicRepositories(urlRepos);
    const ownerName= repos[id]["owner"]["login"];
    return ownerName;
}

const getImageOfOwner=async(id,urlRepos)=>{
    const repos = await getPublicRepositories(urlRepos);
    const ownerProfileImage= repos[id]["owner"]["avatar_url"];
    return ownerProfileImage;
}

const getFirstFiveRepositoriesNanmeOfOwner=async(id,urlRepos)=>{
    const repos = await getPublicRepositories(urlRepos);
    const ownerRepos= repos[id]["owner"]["repos_url"];
    const fiveReposJson = await (await fetch(ownerRepos)).json();
    const fiveRepos = new Array;
    for (let index = 0; index < 5; index++) {
        fiveRepos.push(fiveReposJson[index]["html_url"]);
    }
    return fiveRepos;
}


const getSpecificOwnersNamesOfPublicRepositories = async(id,urlRepos)=>{
    var arrayOfNameImageFirstFiveRepos = new Object;

    arrayOfNameImageFirstFiveRepos.ownerName=await getNanmeOfOwner(id,urlRepos);
    arrayOfNameImageFirstFiveRepos.ownerProfileImage=await getImageOfOwner(id,urlRepos);
    arrayOfNameImageFirstFiveRepos.fiveRepos=await getFirstFiveRepositoriesNanmeOfOwner(id,urlRepos);
    return arrayOfNameImageFirstFiveRepos;
}

let userName=document.getElementById("username");
let ownerImage=document.getElementById("ownerImage");
let aside=document.getElementById("repos");
let ul = document.createElement("ul");

getSpecificOwnersNamesOfPublicRepositories(0,githubBaseUrl).then((response)=>{
userName.textContent=response["ownerName"]
ownerImage.src=response["ownerProfileImage"]
response["fiveRepos"].forEach(element => {
    lista=`<li><a href="${element}">${element}</a></li>`;
    ul.innerHTML=ul.innerHTML+lista;
})
});

aside.appendChild(ul);


//Hacer hover sin hover en css
const makeHoverWithoutCss=()=>{
    ownerImage.classList.toggle("hover")
}
ownerImage.addEventListener("mouseover",makeHoverWithoutCss);



//HAcer boton para repositorio aleatorio
var cantidadRepositorios;
getPublicRepositories(githubBaseUrl).then((result)=>{cantidadRepositorios=result.length})



let button = document.createElement("button");
button.textContent="Shuffle"
aside.appendChild(button);

const shuffleRepository=()=>{
    let aleatory = Math.floor(Math.random() * 100);
    userName.textContent="";
    ownerImage.src="";
    ul.innerHTML="";
    getSpecificOwnersNamesOfPublicRepositories(aleatory,githubBaseUrl).then((response)=>{
        userName.textContent=response["ownerName"]
        ownerImage.src=response["ownerProfileImage"]
        response["fiveRepos"].forEach(element => {
            lista=`<li><a href="${element}">${element}</a></li>`;
            ul.innerHTML=ul.innerHTML+lista;
        })
        });
}

button.addEventListener("click",shuffleRepository)