// drag seysini buradan çaldım
// https://github.com/WebDevSimplified/Drag-And-Drop


var istenenler;
var dislananlar1;
var dislananlar2;

var istenenlerContainer;
var dislananlar1Container;
var dislananlar2Container;

function onError(error) {
  console.log("panik - almayan böyle olsun (full album)", error);
}

function onSuccess(data){
    istenenler = data["istenenler"]
    dislananlar1 = data["dislananlar1"];
    dislananlar2 = data["dislananlar2"];
    if (istenenler === undefined){
          istenenler = ["bugun", "gundem", "debe", "sorunsal", "takip", 
            "son", "kenar", "caylaklar", "#spor", "#iliskiler", "#yasam"]
        dislananlar1 = ["#haber", "#sinema", "#bilim", "#egitim", "#muzik",
            "#spoiler", "#edebiyat", "#ekonomi", "#tarih", "#yeme icme", 
            "#teknoloji", "#siyaset", "#sanat"];
    
        dislananlar2 = ["#moda", "#otomotiv", "#magazin", "#eksi sozluk",
            "#motosiklet", "#saglik", "#oyun", "#programlama",
            "#tv", "#seyahat", "#havacilik", "#kripto"];
        }
istenenlerContainer = document.createElement("div");
istenenlerContainer.className = "container";
istenenlerContainer.innerText = "İSTENENLER";
istenenlerContainer.setAttribute("id", "istenenler");
istenenler.forEach(istenen => {
    let i = document.createElement("p");
    i.className = "draggable";
    i.setAttribute("draggable", true);
    i.innerText = istenen;
    
    if (istenen == "bugun" || istenen == "gundem") {
        i.className = "bok";
        i.setAttribute("draggable", false);
    }
    istenenlerContainer.appendChild(i);
})

dislananlar1Container = document.createElement("div");
dislananlar1Container.className = "container";
dislananlar1Container.innerText = "DIŞLANANLAR";
dislananlar1Container.setAttribute("id", "dislananlar1");
dislananlar1.forEach(dislanan1 => {
    let d1 = document.createElement("p");
    d1.className = "draggable";
    d1.setAttribute("draggable", true);
    d1.innerText = dislanan1;
    dislananlar1Container.appendChild(d1);
})
 dislananlar2Container = document.createElement("div");
dislananlar2Container.className = "container";
dislananlar2Container.innerText = "DIŞLANANLAR";
dislananlar2Container.setAttribute("id", "dislananlar2");
dislananlar2.forEach(dislanan2 => {
    let  d2 = document.createElement("p");
    d2.className = "draggable";
    d2.setAttribute("draggable", true);
    d2.innerText = dislanan2;
    dislananlar2Container.appendChild(d2);
})

let a = document.getElementById("body");

body.innerHtml = "";
body.appendChild(istenenlerContainer)
body.appendChild(dislananlar1Container)
body.appendChild(dislananlar2Container)

const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
    listeleriDuzenle();
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})
    
}

function initialize() {
  let kayitlariAl = browser.storage.local.get(null).then(onSuccess, onError);
  console.log("anan", istenenler)
}

initialize();

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
 

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

function listeleriDuzenle(){
    istenenler = [];
    dislananlar1 = [];
    dislananlar2 = [];
    
    Array.from(istenenlerContainer.children).forEach(istenen => {
    istenenler.push(istenen.innerText);
    })
    
    Array.from(dislananlar1Container.children).forEach(dislanan1 => {
    dislananlar1.push(dislanan1.innerText);
    })
    
    Array.from(dislananlar2Container.children).forEach(dislanan2 => {
    dislananlar2.push(dislanan2.innerText);
    })
    
    let kaydet = browser.storage.local.set({ "istenenler" : istenenler, "dislananlar1": dislananlar1, "dislananlar2": dislananlar2}).then(()=>{}, kayip)
    function kayip(error){console.log("o", error)};
    
    //initialize();
}
