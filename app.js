

// async function getPosts(){
//     let response = await fetch("https://jsonplaceholder.typicode.com/posts")
//     let posts = await response.json()
//     console.log(posts)
// }

// getPosts()
//Selecting the Elements 
const cName= document.getElementById("p_name")
const cImage= document.getElementById("p_image")
const cDescription= document.getElementById("p_description")
const cPrice= document.getElementById("p_price")
const btn= document.getElementById("btn")
const app= document.getElementById("app")

const _URL='http://localhost:3000/cars'
//reading the values whenever the Add Product Button is clicked 
btn.addEventListener('click', async ()=>{
    //when a click happens what should i do?
    // read the values of the input
    if(btn.innerText==="Add Car"){
        let newCar = {
            carName:cName.value,
            carDescription:cDescription.value,
            carImage:cImage.value,
            carPrice:cPrice.value
        }
        // console.log(newCar)
        //save it in a database -JSON
        await saveCar(newCar)
    }else{
        // console.log('Updating...')
    }
})

async function saveCar(car){
    await fetch(_URL,{
        method:"POST",
        body:JSON.stringify(car),
        headers:{
            "Content-Type":"application/json"
        }
    })
    await getCars()
}

async function getCars(){
    let response= await fetch(_URL)
    let cars = await response.json()
    // console.log(cars)
    loadUI(cars)
    //display UI
}

function loadUI(cars){
    let html=" "
    cars.forEach(car=>{
        html+= `
        <div class="item">
            <img src="${car.carImage}" alt="${car.carName}">
            <div class="product-item__content">
                <h2>${car.carName}</h2>
                <h3>$ ${car.carPrice}</h3>
                <p>${car.carDescription}</p>
                <button onclick="updateCar(${car.id})">Update<ion-icon name="create-outline"></ion-icon></button>
                <button onclick="deleteCar(${car.id})">Delete<ion-icon name="trash-outline"></ion-icon></button>
                <!-- <button onclick="">Cart<ion-icon name="cart-outline"></ion-icon></button> -->
            </div>
        </div>
        `
    })
    // console.log(html)

    // display
    app.innerHTML= html

}

getCars()


async function updateCar(id){
    // console.log(id)

    //How to get details of one car???
    let response= await fetch(_URL+"/"+id)
    let car = await response.json()
    // console.log(car)
    prepopulate(car, id)
}

function prepopulate(car,id){
    cName.value=car.carName
    cDescription.value=car.carDescription
    cPrice.value=car.carPrice
    cImage.value= car.carImage
    btn.innerText="Update Car"

    btn.addEventListener('click',async()=>{
        if(btn.innerText==="Update Car"){
            await sendUpdate(id)
        }
    })
}

async function sendUpdate(id){
    let updatedCar = {
        carName:cName.value,
        carDescription:cDescription.value,
        carImage:cImage.value,
        carPrice:cPrice.value
    }

    await fetch(_URL+"/"+id,{
        method:"PUT",
        body:JSON.stringify(updatedCar),
        headers:{
            "Content-Type":"application/json"
        }
    })
}


async function deleteCar(id){
    await fetch(_URL+"/"+ id,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }) 
}


// let greetings =' Hello There'

// //the coach said hello there 
// let sentense ="the coach said "+ greetings
// let sentense1= `the coach said ${greetings}`