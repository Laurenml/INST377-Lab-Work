function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('#restaurant_list');
  target.innerHTML = '';

  //const listEl = document.createElement('ol');
  //target.appendChild(listEl);

  list.forEach(item => {
      const str = `<li>${item.name}</li>`;
      target.innerHTML += str

    //const el = document.createElement('li');
    //el.innerText = item.name;
    //listEl.appendChild(el);
    
  });

}

/*function processRestaurants(list) {
  console.log('fired restaurants list');
  const range = [...Array(15).keys()];
  const newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length);
    return list[index]
  })
return newArray;*/

function filterList(array, filterInputValue){
  const newArray = array.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = filterInputValue.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
  })
  return newArray;

}
 
function cutRestaurantList(list) {
  console.log('fired cut list');
  const range = [...Array(15).keys()];
  return newArray = range.map((item)=> {
      const index = getRandomIntInclusive(0, list.length -1);
      return list[index]
  })

}



async function mainEvent() {
  const mainForm = document.querySelector('.main_form'); // get your main form so you can do JS with it
  const loadDataButton = document.querySelector('#data_load');
  const generateListButton = document.querySelector('#generate')
  const textField = document.querySelector('#resto');
  const loadAnimation = document.querySelector('#data_load_animation') //.lds-ellipsis
  loadAnimation.style.display = 'none'; // let your submit button disappear
  generateListButton.classList.add('hidden');

  const storedData = localStorage.getItem('storedData');
  const parsedData = JSON.parse(storedData);
  if (parsedData.length > 0){
    generateListButton.classList.remove('hidden')
  }

 
  let currentList = [];
  

  console.log(`replace me with the first entry`);

 
  console.log(`replace me with the name and category of the first entry`);

  // This IF statement ensures we can't do anything if we don't have information yet
//  if (arrayFromJson?.length > 0) { // the question mark in this means "if this is set at all"
//    submit.style.display = 'block'; // let's turn the submit button back on by setting it to display as a block when we have data available
//}
// loadAnimation.classList.remove('lds-ellipsis');
// loadAnimation.classList.add('lds-ellipsis_hidden');

   
  loadDataButton.addEventListener('click', async (submitEvent) => {
      console.log('Loading data');
      loadAnimation.style.display = 'inline-block';
    
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
      const storedList = await results.json();
      localStorage.setItem('storedData', JSON.stringify(storedList));
      
            
  

      loadAnimation.style.display = 'none';
      //console.table(storedList);
     // submitEvent.preventDefault();
    


 

  generateListButton.addEventListener('click', (event) => {
      console.log('generate new list');
      currentList = cutRestaurantList(storedList);
      console.log(currentList);
      injectHTML(currentList);
})

  textField.addEventListener('input', (event)=> {
      console.log('input', event.target.value);
      const newList = filterList(currentList, event.target.value);
      console.log(newList);
      injectHTML(newList);        
  })
})

/*
  This last line actually runs first!
  It's calling the 'mainEvent' function at line 57
  It runs first because the listener is set to when your HTML content has loaded
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests

// Leaflet can be a bit old-fashioned.
// Here's some code to remove map markers.

/* map.eachLayer((layer) => {
 // if (layer instanceof L.Marker) {
   // layer.remove();
  } */}
