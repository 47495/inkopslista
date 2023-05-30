serverurl='php/'

//funktion för att spara, radera produkterna och radera valda produkter
window.onload = function(){
    getProducts();
    document.getElementById("varabutton").onclick=function(){
        saveProduct();

    } 
    document.getElementById("allaButton").onclick=function(){
        deleteAllProducts();
    }

    document.getElementById("valdaButton").onclick=function(){
        deleteCheckedProducts();
    }
}
//hämtar produkter från databas
function getProducts(){
    
    
        fetch(serverurl+'hamtaAlla.php')
            .then(function (response) {
                    if (response.status == 200) {
                        return response.json();
                    }
            })
            .then(function (data){
               
               appendProducts(data);
            })
}
//visar datan från DB i en tabell
function appendProducts(data) {
     console.log(data);
    tabell=document.getElementById("varatable");
    tabell.innerHTML="";

    for(let i=0;i<data.length;i++){
        let rad=document.createElement("tr");

        //laga checkbox
        let checkboxtd=document.createElement("td");
        let checkbox=document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if(data[i].checked){
            checkbox.checked=1;
        }
        checkbox.onclick=function(){
            productChecked(data[i].id);
        } 


        //text
        let texttd=document.createElement("td");
        texttd.id="vara"+ data[i].id;
        texttd.innerHTML=data[i].namn;

        //redigera
        let redigeratd=document.createElement("td");
        let redigeraicon=document.createElement("i");
        redigeraicon.classList.add("material-icons");
        redigeraicon.innerHTML=("edit");
        redigeraicon.onclick=function(){
            editVaraForm(data[i].id);
        }
            redigeratd.appendChild(redigeraicon);

            //radera
            let raderatd=document.createElement("td");
            let raderaicon=document.createElement("i");
            raderaicon.classList.add("material-icons");
            raderaicon.innerHTML="delete";
            raderaicon.onclick=function(){
                deleteProduct(data[i].id,data[i].namn);
            }
            raderatd.appendChild(raderaicon);

            //skapa rad
            rad.appendChild(checkbox);
            rad.appendChild(texttd);
            rad.appendChild(redigeratd);
            rad.appendChild(raderatd);
            tabell.appendChild(rad);
    }
}
