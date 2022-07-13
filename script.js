let title = document.querySelector('.title');
let category = document.querySelector('.category');
let count = document.querySelector('.count');
let price = document.querySelector('.price');
let taxes =document.querySelector('.taxes');
let ads =document.querySelector('.ads');
let discount =document.querySelector('.discount');
let total =document.querySelector('.totalValue  ');
let calac = document.querySelector('.calac');

let tmp ;

function getTotal(){
    // let price1 = isNaN(parseInt(price.value)) ? 0 :parseInt(price.value )  ;
    // let taxes1 = isNaN(parseInt(taxes.value)) ? 0: parseInt(taxes.value ) ;
    // let ads1 =  isNaN(parseInt(ads.value)) ? 0 : parseInt(ads.value ) ;
    // let discount1 =  isNaN(parseInt(discount.value)) ? 0 : parseInt(discount.value);
    //     total.innerHTML = price1 + taxes1 + ads1 - discount1; 
    //     total.style.cssText='width: fit-content ;'

    if(price.value != ''){
        let resulte = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = resulte;
        document.querySelector('.total').style.cssText='background-color : green; ;'
    }
    else{
        total.innerHTML = '';
        document.querySelector('.total').style.cssText='background-color : #A20C00; ;'
    }
}
price.addEventListener('keyup', getTotal);
taxes.addEventListener('keyup', getTotal);
ads.addEventListener('keyup', getTotal);
discount.addEventListener('keyup', getTotal);

let dataPro;
if(localStorage.proudact != null){
    dataPro=JSON.parse(localStorage.proudact);
}
else{
     dataPro = []
}

function createItem (){
    let obj={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes: taxes.value,
        ads : ads.value, 
        discount: discount.value,
        total : total.innerHTML,
        count:count.value,
        category :category.value.toLowerCase(),
    }
 
    if(title.value !='' && price.value !='' && category.value !='' && count.value <=100){       
         if(+count.value>1){
            for (let i = 0 ; i< +count.value ; i++) {
                dataPro.push(obj) ;
                window.localStorage.setItem('proudact',JSON.stringify(dataPro))

            }

           }
            else{
                dataPro.push(obj) ;
                window.localStorage.setItem('proudact',JSON.stringify(dataPro))
        
            }
            clearInputs()

    }

    printData()
    }


document.querySelector('.create-btn').addEventListener('click',createItem);

// clear inputs 
function clearInputs(){
    title.value=""
    category.value=""
    count.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    total.innerHTML=""


}

//read 

function printData(){
    let table = '';
    for (let i =0 ; i<dataPro.length;i++){
        table +=`
        <tr>
        <td>
        ${1+i}
        </td>
        <td>
        ${dataPro[i].title}
        </td>
        <td>
        ${dataPro[i].price}
        </td>
        <td>
        ${dataPro[i].taxes}
        
        </td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>

        <td>${dataPro[i].category}</td>

        <td><button class="nested-update-Tab" onclick='UpdateItem(${i})'>Update</button></td>
        <td><button class="nested-Delete-Tab" onclick='deleteData(${i})'>Delete</button></td>  
            
        </tr>
        `
    }
     document.querySelector('.tBody').innerHTML=table;


     showDelete()

}

printData()


//delete item 
function deleteData(i) {

    dataPro.splice(i,1);
    window.localStorage.proudact=JSON.stringify(dataPro);
    printData();
}

function showDelete(){
    let deleteBtn= document.querySelector('.deleteAllBtn');
    deleteBtn.value=`Delete All (${dataPro.length})`
    if(dataPro.length == 0){
    
        deleteBtn.style.cssText='  display: none;'
    }
    else{
        deleteBtn.style.cssText='display:inline ;'
}

}

function deleteAllData() {

    localStorage.clear();
    // dataPro= JSON.parse(localStorage.proudact);
    dataPro=[];
    printData();

}


document.querySelector('.deleteAllBtn').addEventListener('click',deleteAllData);



//Update Data
function UpdateItem(i){
    count.style.display='none'
    getTotal();
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    total.innerHTML=dataPro[i].total;
    category.value=dataPro[i].category;
    document.querySelector('.create-btn').style.cssText="display:none;"
    document.querySelector('.update-btn').style.cssText="display:inline;"
    document.querySelector('.total').style.cssText='background-color:green; ;'
    scroll({
        top:0,
        behavior:"smooth"
    })
    tmp = i;

    }

function updateData(i){

    let obj={
        title:title.value,
        price:price.value,
        taxes: taxes.value,
        ads : ads.value, 
        discount: discount.value,
        total : total.innerHTML,
        count:0,
        category :category .value,
    }

    if(title.value !='' && price.value !='' && category.value !='' && count.value <=100){       
        dataPro[i]=obj;
        window.localStorage.proudact=JSON.stringify(dataPro);
        clearInputs();
        document.querySelector('.total').style.cssText='background-color:red; ;'

        count.style.display='inline'
        document.querySelector('.create-btn').style.cssText="display:inline;"
        document.querySelector('.update-btn').style.cssText="display:none;"
   
    }
 
        printData()
     


}


function addEventUpdateFunction(){
    updateData(tmp)
}

document.querySelector('.update-btn').addEventListener('click',addEventUpdateFunction)



//SEARCH 

let searchMood ='title';

// document.querySelector('.search-title').addEventListener('click',()=>{
//     searchMood ='title';
// })

// document.querySelector('.search-category').addEventListener('click',()=>{
//     searchMood ='category';
// })
let search = document.querySelector('.search');
let tmp2;
function getMood(id){
    tmp2 =id;

    if (id=='search-title'){
        searchMood ='title';
      
    }
    else{
        searchMood ='category';
    }
    search.placeholder= 'Search by '+searchMood;

    search.focus()
    search.value=''
    printData()
    
    
}

function searchData(){
    let table ='';
    for (let i =0 ; i<dataPro.length;i++){

    if (searchMood=='title'){
 
            if(dataPro[i].title.includes(search.value.toLowerCase())){
            table +=`
            <tr>
            <td>
            ${1+i}
            </td>
            <td>
            ${dataPro[i].title}
            </td>
            <td>
            ${dataPro[i].price}
            </td>
            <td>
            ${dataPro[i].taxes}
            
            </td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
    
            <td>${dataPro[i].category}</td>
    
            <td><button class="nested-update-Tab" onclick='UpdateItem(${i})'>Update</button></td>
            <td><button class="nested-Delete-Tab" onclick='deleteData(${i})'>Delete</button></td>  
                
            </tr>
            `
            }
            else{
                continue;
            
        }
         document.querySelector('.tBody').innerHTML=table;
      
    }

    else{
            if(dataPro[i].category.includes(search.value.toLowerCase())){
                table +=`
                <tr>
                <td>
                ${1+i}
                </td>
                <td>
                ${dataPro[i].title}
                </td>
                <td>
                ${dataPro[i].price}
                </td>
                <td>
                ${dataPro[i].taxes}
                
                </td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
        
                <td>${dataPro[i].category}</td>
        
                <td><button class="nested-update-Tab" onclick='UpdateItem(${i})'>Update</button></td>
                <td><button class="nested-Delete-Tab" onclick='deleteData(${i})'>Delete</button></td>  
                    
                </tr>
                `
            
        }
         document.querySelector('.tBody').innerHTML=table;
        }
    }
    
    document.querySelector('.tBody').innerHTML=table;


}   



search.addEventListener('keyup',searchData)