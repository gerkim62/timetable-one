
// Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(() => { console.log('Service Worker Registered'); });
}

//slideout
let slideout = new Slideout({
  'panel': document.getElementById('panel'),
  'menu': document.getElementById('menu'),
  'padding': 255,
  'tolerance': 85
});

//document.getElementById('menu')


const bgs = {
  agr: '#33a04a',
  bio: '#536b2d',
  bs: '#c63e37',
  chem: '#20ade8',
  comp: '#ef2150',
  cre: '#ea098c',
  eng: '#1e3f90',
  geo: '#0291c8',
  his: '#92242d',
  hscie: '#c65102',
  kis: '#9d1f81',
  maths: '#b51d60',
  phy: '#5e2988',
}
let totalSubjects,bulkSubs;
let outputed = false;
let subjects;
const saveBtn = document.querySelector('.save-btn')
const allBtn = document.querySelector('.all-box');
const newTableBtn = document.querySelector('#new-table-btn')
const selectSubjectsBtn = document.querySelector('#select-subjects-btn')
selectSubjectsBtn.addEventListener('click',()=>{
  
document.querySelector('.wrapper').style.display = 'none';
document.querySelector('.choices').style.display = 'flex'
slideout.close();

  //...

  try {
    document.querySelector('body').requestFullscreen().catch((e) => {
      //console.log(e.message)
    });
  }
  catch (err) {
    //console.log(err.message);
  }

  //console.log("screen ")

  try {
    screen.orientation.lock("portrait").catch((e) => {
      //console.log(e.message)
    });
  }

  catch (err) {
    //console.log(err.message);
  }


  //...

})

const chooseBoxes = Array.from(document.querySelectorAll('.pretty:not(.all)'));

for(let i =0; i<chooseBoxes.length;i++){
  chooseBoxes[i].querySelector('input').addEventListener('change',()=>{
    //console.log(1)
    allBtn.checked = false;
  })
}

const btnNext = document.querySelector('.next-btn');
newTableBtn.addEventListener('click',()=>{
  slideout.close();
  subjects = getSubs()
  //console.log(subjects)
  totalSubjects = subjects.length;
  newArr()
  //console.log('&&')
  showTable()
  
})
btnNext.addEventListener('click',()=>{
  subjects = getSubs()
  //console.log(subjects)
  totalSubjects = subjects.length;
  newArr()
  //console.log('&&')
  showTable()


})
//showTable()
function showTable(){
  document.querySelector('.wrapper').style.display = 'grid';
  document.querySelector('.choices').style.display = 'none'
  //console.log('$$')
try {
 document.querySelector('body').requestFullscreen().catch((e)=>{
//console.log(e.message)
});
}
catch(err) {
//console.log(err.message);
}

//console.log("screen ")

try {
    screen.orientation.lock("landscape").catch((e) => {
      //console.log(e.message)
    });
  }

  catch (err) {
    //console.log(err.message);
  }
}

allBtn.addEventListener('change',()=>{
  if(allBtn.checked){
    //console.log('%%')
    checkAll()
  }else{
    //console.log(0)
    uncheckAll()
  }
})
function uncheckAll(){
  const subs = document.querySelectorAll('.pretty:not(.all)');
  for (let i = 0; i < subs.length; i++) {
    subs[i].querySelector('input').checked =false;
  }
}


function checkAll(){
  const subs = document.querySelectorAll('.pretty:not(.all)');
  for(let i = 0;i<subs.length;i++){
    subs[i].querySelector('input').checked=true;
  }
}

function getSubs(){
  const subs = document.querySelectorAll('.pretty:not(.all)');
  subjects = [];
  //console.log(subs[1].querySelector('input').checked)
  for (let i = 0; i < subs.length; i++) {
    if (subs[i].querySelector('input').checked) {
  
      const currentSub = subs[i].dataset.sub.trim();
      subjects.push(currentSub)
    }
  }
  if (subjects.length == 7 || subjects.length == 8 || subjects.length == 11 || subjects.length == 12||subjects.length == 13) {
    //console.log('eyap')
    return subjects;
  }else{
    Toastify({
      text: "Select 7, 8, 11 or 12 subjects. ",
      duration: 5000,
      destination: "https://fb.com/gerkim62/",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function() {} // Callback after click
    }).showToast();
    return;
  }
}


//const subjects = ['MATHS', 'CHEM', 'BIO', 'CRE', 'ENG', 'KIS', 'AGR','PHY','GEO','HIS','COMP']


const cells = document.querySelectorAll('.cell');
//console.log('g',cells[2].innerHTML)

/*saveBtn.addEventListener('click', () => {
  const timetable = document.querySelector('.wrapper')
  html2pdf()
    .from(timetable)
    .save();
    outputed=false;
    //console.log(outputed)
    newArr()
   //console.log(outputed)
})*/

//let bulkSubs = []
//newArr()

function newArr() {
  //console.log('newarr')
  if (totalSubjects == 7) {
    let SCIENCE;
    if (subjects.includes('BIO')) {
      SCIENCE = 'BIO'
    } else {
      SCIENCE = 'PHY'
    }
    const addition = ['MATHS', 'ENG', 'KIS', SCIENCE, 'CHEM']

    bulkSubs = [];
    for (let i = 0; i < 5; i++) {
      const a = shuffle(subjects);
      bulkSubs.push(...a);
    }
    bulkSubs.push(...addition)

  } else if (totalSubjects == 8) {
    bulkSubs = [];
    for (let i = 0; i < 5; i++) {
      const a = shuffle(subjects);
      bulkSubs.push(...a);
    }
  } else if (totalSubjects == 11) {
    addition = ['ENG', 'KIS', 'PHY', 'BIO', 'MATHS', 'GEO', 'AGR']
    bulkSubs = [];
    for (let i = 0; i < 3; i++) {
      const a = shuffle(subjects);
      bulkSubs.push(...a);
    }
    bulkSubs.push(...addition)
  } else if (totalSubjects == 12) {
    addition = ['ENG', 'PHY', 'BIO', 'MATHS', ]
    bulkSubs = [];
    for (let i = 0; i < 3; i++) {
      const a = shuffle(subjects);
      bulkSubs.push(...a);
    }
    bulkSubs.push(...addition)
  }else if (totalSubjects == 13) {
    addition = [ 'PHY', 'BIO', 'MATHS', ]
    bulkSubs = [];
    for (let i = 0; i < 3; i++) {
      const a = shuffle(subjects);
      bulkSubs.push(...a);
    }
    bulkSubs.push(...addition)
  }
  //checkDuplicate()
  /*arr = [];
  for (let i = 0; i < cells.length / subjects.length; i++) {
    const a = shuffle(subjects);
    arr.push(...a);
  }*/
  for (let i = 0; i < bulkSubs.length - 7; i++) {
    if (bulkSubs[i] == bulkSubs[i + 8]) {

      return newArr()

    }
    for (let i = 0; i < bulkSubs.length - 1; i++) {
      if ((bulkSubs[i] == bulkSubs[i + 1]) || bulkSubs[i] == bulkSubs[i + 2]) {
        return newArr()

      }
    }
  }
  outputed = true;
  output()
  
}

//newArr()

/*function checkDuplicate(array) {
  for (let i = 0; i < 32; i += 8) {
    if (checkX(i)) {
      console.log('did')
      return newArr()
    }else{
      console.log('diddnt')
    }
  }
}
//checkDuplicate()

function checkX(start) {
  let array = [];
  for (let i = start; i < start + 8; i++) {
    array.push(bulkSubs[i])
  }
  
  ///console.log(array,duplicate(array))
  if (duplicate(array)) {
    return true
  } else {
    console.log(array)
    return true
  }
}


function duplicate(arr) {
  let result = false;
  // iterate over the array
  for (let i = 0; i < arr.length; i++) {
    // compare the first and last index of an element
    if (arr.indexOf(arr[i]) !== arr.lastIndexOf(arr[i])) {
      result = true;
      // terminate the loop
      break;
    }
  }
  return result;
}*/

function output() {
  for (let i = 0; i < cells.length; i++) {
    //console.log('pupt')
    cells[i].innerHTML = bulkSubs[i];
    const name = bulkSubs[i].toLowerCase()
    switch (name) {
      case 'agr':
        clr = bgs.agr;
        break;
      case 'bio':
        clr = bgs.bio;
        break;
      case 'bs':
        clr = bgs.bs;
        break;
      case 'chem':
        clr = bgs.chem;
        break;
      case 'comp':
        clr = bgs.comp;
        break;
      case 'cre':
        clr = bgs.cre;
        break;
      case 'eng':
        clr = bgs.eng;
        break;
      case 'geo':
        clr = bgs.geo;
        break;
      case 'his':
        clr = bgs.his;
        break;
      case 'hscie':
        clr = bgs.hscie
        cells[i].style.backgroundColor = clr;
      case 'kis':
        clr = bgs.kis;
        //console.log('kis',clr)
        break;
      case 'maths':
        clr = bgs.maths;
        break;
      case 'phy':
        clr = bgs.phy;
        break;
      default:
        clr = 'yellow';
    }

    cells[i].style.backgroundColor = clr;
    cells[i].style.color = 'white'
    if(name == 'hscie'){
      cells[i].style.backgroundColor = bgs.hscie;
    }

  }
}


function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function bulkGeneration(){
  //ask how many
  //show many inputs
  //generate one by one
  //catch errors in array
  
}