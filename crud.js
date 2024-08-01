// road map function to inputs 

// get total [1]
// create product [2]
// save localStorage [3]
// clear inputs [4]
// read [5]
// count [8]
// delete [6]
// delete All [7] 
// update [9]
// search  [10]
// clean data

// --------------------------------------------



let price = document.getElementById("price");
let title = document.getElementById("title");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";

let temp;


// function total [1]

function getTotal () {
  if (price.value != "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result
    total.style.background = "green"
  } else {
    total.innerHTML = "";
        total.style.background = "#a00d02"
  }
}


// function create product [2]


// save localStorage [3]
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}


submit.onclick = function ()  {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }

// count [8]
if (mood === "create") {
  if (newPro.count > 1) {
    for (let i = 0 ; i < newPro.count; i++) {
      dataPro.push(newPro);
    }
    } else {
      dataPro.push(newPro);
    }
  
} else {
  dataPro[temp] = newPro 
  mood = "create";
  submit.innerHTML = "Create";
  count.style.display = "block";
  submit.style.backgroundColor = " cornflowerblue"

}



  // save localStorage [3]
    localStorage.setItem("product" , JSON.stringify(dataPro));

    clearData () ;

    showData ();
}



// clear inputs [4]

function clearData () {
title.value = "";
price.value = "";
taxes.value = "";
ads.value = "";
discount.value = "";
total.innerHTML = "";
count.value = "";
category.value = "";
}


// read [5]

function showData () {
  getTotal () ;

  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
  table += `
  
          <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>

  `;
  }

  document.getElementById("tbody").innerHTML = table;

let btnDelete = document.getElementById("deleteAll")

  if (dataPro.length > 0 ) {
  btnDelete.innerHTML = `
  
  <button onclick="deleteAll()">Delete All (${dataPro.length})</button>

  `
  } else {
    btnDelete.innerHTML = ""
  }

}

showData ();


// delete [6] 

function deleteData (i) {
dataPro.splice(i, 1);
localStorage.product = JSON.stringify(dataPro);
showData ();

}


// btn deleteAll [7]

function deleteAll () {
  localStorage.clear();
  dataPro.splice(0);
  showData ();
}



// update [9]

function updateData(i)  {
title.value = dataPro[i].title;
price.value = dataPro[i].price;
taxes.value = dataPro[i].taxes;
ads.value = dataPro[i].ads;
discount.value = dataPro[i].discount;
category.value = dataPro[i].category;

getTotal ()
count.style.display = "none"
submit.style.backgroundColor = "#a00d02"
submit.innerHTML = "Update Now";

mood = "update";

temp = i ;
scroll ({
  top: 0,
  behavior:"smooth",
})
}


// search  [10]

let searchMood = "title";

function getSearchMood(id) 
{
  let search = document.getElementById("search")
    if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
    } else {
      searchMood = "category";
    search.placeholder = "Search By Category";

    }
    search.focus();
    search.value = ""
  showData()
}

// search part 2 - [9]

function searchData(value) {

  let table = ""
  if (searchMood == "title") {
   
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
       
        table += `
  
                <tr>
                  <td>${i+1}</td>
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].total}</td>
                  <td>${dataPro[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>

  `;  

      }
    }


  } else {

    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
  
                <tr>
                  <td>${i+1}</td>
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].total}</td>
                  <td>${dataPro[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>

  `;  

      }
    }


  }


  document.getElementById("tbody").innerHTML = table;

}


