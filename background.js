
let kayitlariAl = browser.storage.local.get(null).then(onSuccess, onError);
function onError(err){console.log("kurban - sahip (full album)")};
function onSuccess(data){
    let istenenler = data["istenenler"];
    if (istenenler == undefined){
    istenenler = ["bugun", "gundem", "debe", "sorunsal", "takip", 
    "son", "kenar", "caylaklar", "#spor", "#iliskiler", "#yasam"]
    }
    var nav = document.getElementById("quick-index-nav")
    dropdown = nav.children[nav.childElementCount -1]
    nav.innerHTML = "";

    istenenler.forEach(istenen => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        let href = "/debe"
        if (istenen.includes("#")) {href = "/basliklar/kanal/" + istenen.replace("#", "") }
        else if (istenen == "caylaklar") {href = "/basliklar/caylaklar/bugun"}
        else if (["bugun", "gundem", "sorunsal", "takip", "son", "kenar"].includes(istenen)) {href = "/basliklar/" + istenen}
        a.text = istenen
        a.setAttribute("href", href)
        a.setAttribute("title", "")
        li.appendChild(a)
        nav.appendChild(li)
    })
    
    nav.appendChild(dropdown)
}
