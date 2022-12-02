// =================
// variables

let text = "write some text"
let n1 = 384
let n2 = 183
let response = true

let result = n1 + n2

// console.log(text)
// console.log(n1)
// console.log(response)

// console.log(result)

// const constant = "constant"
// console.log(constant)

// =================
// select HTML elements

const dv1 = document.getElementById("dataviz_01")
// console.log(dv1)

const sections = document.getElementsByClassName("no_margin")
// console.log(sections)

// const p = document.querySelectorAll("p")
// console.log(p)


// =================
// edit the DOM

const title = document.querySelector("h1")
// console.log(title)

// title.prepend(">>>")
// title.append(" - please, remember")

// // title.remove()

// title.innerHTML = "My new title"

// =================
// edit css

title.style.color = "red"

title.style.fontSize = "2rem"


// =================
//function

function my_first_function(){
    console.log("works!")
}


function sum(n1,n2){
    let result = n1 + n2
    title.innerHTML = result
}


// =================
// listener

function listener(element){
    dv1.addEventListener("mouseenter", function(){
        console.log("in")
    })
    
    dv1.addEventListener("mouseleave", function(){
        console.log("out")
    })
}



// =================
// page load

window.addEventListener("load", function(){
    // my_first_function()
    // sum(1,2)
    listener(dv1)
})
