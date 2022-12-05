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
const subtitle = document.querySelector("h2")
// console.log(title)

// title.prepend(">>>")
// title.append(" - please, remember")

// // title.remove()

// title.innerHTML = "My new title"

// =================
// edit css

subtitle.style.color = "gray"

subtitle.style.fontSize = "2rem"


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
// 

function map(){
    const map_contaier = "map01";
    let min_zoom = 4;
    let max_zoom = 14;
    let map_center = [8.976,45.593];

    const data_link = "assets/data/map-data.json";

    // markers
    let myIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    let category = "A"

    fetch(data_link)
        .then(response => response.json())
        .then((data) => {
            const myData = data
            load_map(myData);
        })
    
    function load_map(data){
        
        let map = L.map(map_contaier, {
            center: map_center,
            zoom: max_zoom
        });
    
        function make_map(){ 
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: max_zoom,
                minZoom: min_zoom,
                tileSize: 256
            })
            .addTo(map);
        }

        function set_map(){
            map.fitBounds(bounds, {
                "padding": [20, 20], // 260, 300
                "animate": true,
                "duration": 2
            });			
        }

        // append markers
        function append_markers(category){

            let features = data.features;
            bounds = [];

            let filter = features.filter(function(a,b){
                return a.properties.category == category
            })

            filter.forEach(function(entry){

                let name = entry.properties.name 
                let tooltip = "<span class='tooltip'>" + name + "</span>";

                let lat = entry.geometry.coordinates[0];
                let lon = entry.geometry.coordinates[1];
                // console.log(lon,lat)

                markers = L.marker([lon,lat], {
                    icon: myIcon
                })
                .bindPopup(tooltip, {
                    "maxWidth": 200,
                    "className": "popup building " + entry.id + " " + entry.properties.category
                })
                .addTo(map);

                bounds.push([lon,lat])
            })
    
        }
        make_map();
        append_markers(category);
        set_map();

        // filter items by category
        map_select = document.getElementById("map_select")

        map_select.addEventListener ("change", function () {
            category = this.value;

            // remove markers
            map.eachLayer(function(layer){
                map.removeLayer(layer);
            })

            make_map();
            append_markers(category);	
            set_map();
        })
    
    } 
}

// =================
// page load

window.addEventListener("load", function(){
    // highlight()
    // mySwitch()
    // droppdown()

    map()
})
