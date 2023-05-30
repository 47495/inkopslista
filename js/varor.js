
//funktion för att spara vara
function saveProduct(){
    let varanode = document.getElementById('varainput');
    let vara = varanode.value;

    if (vara.trim() !="") {
        let FD = new FormData();
        FD.append("vara", vara);

        fetch(serverurl+'sparaVara.php',
        {
            method:'POST',
            body: FD
        })
        .then(function (response){
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            getProducts();
        })
    }

    varanode.value="";
}
//låter en redigera varan
function editVaraForm(id){
    document.getElementById("varainput").value = document.getElementById("vara" + id).innerHTML;
    document.getElementById("varabutton").onclick=function (){
        editProduct(id);
    }
    document.getElementById("varabutton").innerHTML="spara"
}
function editProduct(id){
    let varanode = document.getElementById('varainput');
    let vara = varanode.value;

    if (vara.trim() !="") {
        let FD = new FormData();
        FD.append("vara", vara);
        FD.append("id",id)

        fetch(serverurl+'uppdateraVara.php',
        {
            method:'POST',
            body: FD
        })
        .then(function (response){
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            getProducts();
        })
    }
    
    varanode.value="";
    document.getElementById("varabutton").onclick=function() {
        saveProduct();
    }
    document.getElementById("varabutton").innerHTML="lägg till"

}
//radera varan
function deleteProduct(id,namn){

    if(confirm("vill du radera "+namn+"?")){

        let FD = new FormData();
        FD.append("id", id);

        fetch(serverurl+'raderaVara.php', {
        
            method:'POST',
            body: FD
        })
        .then(function (response){
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            getProducts();
        })
    }
}

//radera alla varor
function deleteAllProducts(id,namn){

    if(confirm("vill du verkligen radera alla varor?")){

        fetch(serverurl+'raderaAllaVaror.php', {
        
            method:'POST',
        })
        .then(function (response){
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            getProducts();
        })
    }
}
//markera en produkt
function productChecked(id){

        let FD = new FormData();
        FD.append("id", id);

        fetch(serverurl+'kryssaVara.php', {
        
            method:'POST',
            body: FD
        })
        .then(function (response){
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            getProducts();
        })

}
//radera markerade produkter.
function deleteCheckedProducts(id,namn){

    if(confirm("vill du verkligen radera dina valda varor?")){

        fetch(serverurl+'raderaValda.php', {
        
            method:'POST',
        })
        .then(function (response){
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            getProducts();
        })
    }
}
