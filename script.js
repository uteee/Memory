var spielerzahl = 1;      //Variable für die Anzahl der Spieler

function spieler(x){ //Je nachdem wie viele Spieler ausgewählt worden sind, werden sie angezeigt
    if(x==1){
    document.getElementById("spieler1").style.display = "list-item"; 
    document.getElementById("spieler2").style.display = "";
    document.getElementById("spieler3").style.display = ""; 
    document.getElementById("spieler4").style.display = ""; 
    spielerzahl = 1;        //Variable für die Anzahl der Spieler wird gesetzt
    }

    if(x==2){
    document.getElementById("spieler1").style.display = "list-item"; 
    document.getElementById("spieler2").style.display = "list-item";
    document.getElementById("spieler3").style.display = ""; 
    document.getElementById("spieler4").style.display = ""; 
    spielerzahl = 2;
    }

    if(x==3){
    document.getElementById("spieler1").style.display = "list-item"; 
    document.getElementById("spieler2").style.display = "list-item";
    document.getElementById("spieler3").style.display = "list-item"; 
    document.getElementById("spieler4").style.display = "";
    spielerzahl = 3;
    }

    if(x==4){
    document.getElementById("spieler1").style.display = "list-item"; 
    document.getElementById("spieler2").style.display = "list-item";
    document.getElementById("spieler3").style.display = "list-item"; 
    document.getElementById("spieler4").style.display = "list-item"; 
    spielerzahl = 4;
    }

}

function spielerturn(x){    //Je nachdem welcher Spieler an der Reihe ist, wird der Rahmen geändert

    if(x==1){
        document.getElementById("spieler4").style.borderWidth = "1px"; //Da die Anzahl der Spieler variiert, ist jeder Spieler einmal vor dem ersten dran, weshalb alle zurückgesetzt werden
        document.getElementById("spieler3").style.borderWidth = "1px"; 
        document.getElementById("spieler2").style.borderWidth = "1px"; 
        document.getElementById("spieler1").style.borderWidth = "3px";
    }
    if(x==2){
        document.getElementById("spieler1").style.borderWidth = "1px"; //Rahmen des vorherigen Spielers wird zurückgesetzt
        document.getElementById("spieler2").style.borderWidth = "3px";
    }
    if(x==3){
        document.getElementById("spieler2").style.borderWidth = "1px"; 
        document.getElementById("spieler3").style.borderWidth = "3px";
    }
    if(x==4){
        document.getElementById("spieler3").style.borderWidth = "1px"; 
        document.getElementById("spieler4").style.borderWidth = "3px";
    }
}





function returncheck(){ //gibt ausgewählte Kartenzahl zurück
    var button = document.getElementsByName("kartenzahl");
    for(i=0; i<21; i++){            //Schleife durchläuft alle radio-Buttons und gibt den value des ausgewählten zurück
        if(button[i].checked)       
        {
            return button[i].value;
        }
    }
}

function addFlip(){     //Funktion, damit jede Karte umgedreht werden kann.
    const karten = document.querySelectorAll(".karte");
    let umgedreht = false;
    let sperre = false              //Variable, die das Umdrehen anderer Karten sperrt
    let karte1, karte2;
    let flips = 1;                  //Zählvariable für Versuche
    let paare = 1;                  //Zählvariable für gefundene Paare
    var s=1;                        //Zählvariable für Spieler, der an der Reihe ist
    var p1=1, p2=1, p3=1, p4=1;     //Zählvariablen der gefundenen Paare der Spieler
    var f1=1, f2=1, f3=1, f4=1;     //Zählvariablen der Versuche der Spieler
    var x = returncheck();          //x wird die Anzahl der Karten zugewiesen

    function flipKarte(){

        if(sperre)return;               //ist sperre true, kann keine weitere Karte umgedreht werden
        if(this === karte1) return;     //die erste umgedrehte Karte kann nicht doppelt geklickt werden
        this.classList.add("flip");

        if(!umgedreht){         //if-Block für die erste Karte
            umgedreht = true;
            karte1 = this;
            
            document.getElementById("flip").innerHTML="Flips: "+flips;  //Anzahl der allgemeinen Versuche wird hochgezählt
            flips++;

            //Anzahl der Versuche des Spielers, der an der Reihe ist, wird hochgezählt
            if(s==1){document.getElementById("f1").innerHTML="Flips: "+f1; f1++;}
            if(s==2){document.getElementById("f2").innerHTML="Flips: "+f2; f2++;}
            if(s==3){document.getElementById("f3").innerHTML="Flips: "+f3; f3++;}
            if(s==4){document.getElementById("f4").innerHTML="Flips: "+f4; f4++;}
        }

        else{                   //else-Block für zweite Karte
            umgedreht = false;
            karte2 = this;

    
            if(karte1.dataset.name === karte2.dataset.name)         //Beide Karten sind gleich
            {
                document.getElementById("paare").innerHTML="Pairs: "+paare;     //Anzahl der gefundenen Paare wird hochgezählt
                paare++;

                //Anzahl der gefundenen Paare des Spielers, der an der Reihe ist, wird hochgezählt
                if(s==1){document.getElementById("p1").innerHTML="Pairs: "+p1; p1++;}
                if(s==2){document.getElementById("p2").innerHTML="Pairs: "+p2; p2++;}
                if(s==3){document.getElementById("p3").innerHTML="Pairs: "+p3; p3++;}
                if(s==4){document.getElementById("p4").innerHTML="Pairs: "+p4; p4++;}

                if(paare == x/2+1){             //gefundene Paare werden mit der Anzahl der insgesamt vorhandenen Paare verglichen
                    x = Math.max(p1,p2,p3,p4)       //Höchste Anzahl der gefundenen Paare 
                    
                    if(p1==x){
                        var name = document.getElementById("name1").value;
                        alert(name+ " hat gewonnen!");   
                    }
                    if(p2==x){
                        var name = document.getElementById("name2").value;
                        alert(name+ " hat gewonnen!");   
                    }
                    if(p3==x){
                        var name = document.getElementById("name3").value;
                        alert(name+ " hat gewonnen!");   
                    }
                    if(p4==x){
                        var name = document.getElementById("name4").value;
                        alert(name+ " hat gewonnen!");   
                    }
                }
               
                karte1.removeEventListener("click", flipKarte);     //Karten bleiben offen, Umdrehen auf "click" wird entfernt
                karte2.removeEventListener("click", flipKarte);
                zsetzen();
            }

            else{                       //Die Karten sind nicht gleich
                sperre = true;
                setTimeout(() =>{                       //Karten bleiben kurz offen und werden dann wieder umgedreht
                    karte1.classList.remove("flip");
                    karte2.classList.remove("flip");

                zsetzen()
                }, 1200);

                setTimeout(()=>{                    //Zahl des Spielers, der an der Reihe ist, wird hochgezählt und Rahmen verändert sich
                s++;
                if(s>spielerzahl){s=1;}
                spielerturn(s);
                }, 1500);

                
            }   
        }
    }
    
    function zsetzen(){         //Werte werden zurückgesetzt
        umgedreht = false; 
        sperre = false;
        karte1 = false;
        karte2 = false; 
    }
    
    karten.forEach(karte => karte.addEventListener("click",flipKarte));     //Jede Karte bekommt ein Klick Event, bei dem flipKarte ausgeführt wird
}

function addpictures(x){    //Je nachdem wie viele Karten ausgewählt wurde, wird die Anzahl an Karten ins Spielfeld eingefügt
//Vorderseiten der Karten
var bildvor = ["img/Gandalf.jpg", "img/Gandalf.jpg",
            "img/Ring.jpg", "img/Ring.jpg",
            "img/Legolas.jpg", "img/Legolas.jpg",
            "img/Sauron.jpg", "img/Sauron.jpg",
            "img/Bilbo.jpg", "img/Bilbo.jpg",
            "img/SauronsAuge.jpg", "img/SauronsAuge.jpg",
            "img/Aragorn.jpg","img/Aragorn.jpg", 
            "img/Frodo.jpg", "img/Frodo.jpg",
            "img/Nazgul.jpg", "img/Nazgul.jpg",
            "img/Smaug.jpg", "img/Smaug.jpg",
            "img/Saruman.jpg", "img/Saruman.jpg",
            "img/Thorin.jpg", "img/Thorin.jpg",
            "img/Beutelsend.jpg", "img/Beutelsend.jpg",
            "img/Thranduil.jpg", "img/Thranduil.jpg",
            "img/Boromir.jpg", "img/Boromir.jpg",
            "img/Fili.jpg", "img/Fili.jpg",
            "img/Tauriel.jpg", "img/Tauriel.jpg",
            "img/Elrond.jpg", "img/Elrond.jpg",
            "img/Gimli.jpg", "img/Gimli.jpg",
            "img/Bard.jpg", "img/Bard.jpg",
            "img/Arwen.jpg", "img/Arwen.jpg",
            "img/Galadriel.jpg", "img/Galadriel.jpg",
            "img/Blatt.jpg", "img/Blatt.jpg",
            "img/Stein.jpg", "img/Stein.jpg",
            "img/Baumbart.jpg","img/Baumbart.jpg"
            ];
            
//Rückseite der Karten
var bildrueck = ("img/ringspruch.jpg");      

var i=0;

var game = document.createElement("div");           //Erzeugt ein div in dem alle Karten sind
game.setAttribute("id", "game");
document.getElementById("feld").appendChild(game);

//Karten werden eingefügt, jenachdem wie viele ausgewählt worden sind
while(i<x){
    var div = document.createElement("div");           
    var vor = document.createElement("img");
    var rueck = document.createElement("img");
    vor.src=bildvor[i];
    rueck.src=bildrueck;
    div.className="karte";
    vor.className="vorderseite";
    rueck.className="rueckseite";
    var name = div.dataset["name"];                                         
    div.dataset["name"]=bildvor[i];                                         //Jede Karte bekommt ein data Attribut, das gleich der Source der Vorderseite ist
    div.dataset["karte"]="karte"+x;                                         //Jede Karte bekommt ein data Attribut, das die Anzahl der Karten beinhaltet; für Grid in nächster Funktion                                      
    document.getElementById("game").appendChild(div).appendChild(vor);      //Vor- und Rückseite einer Karte sind in einem Gemeinsamen div
    document.getElementById("game").appendChild(div).appendChild(rueck);
    i++;
    }

    addFlip();
}

function createGrid(x){ //Je nachdem wie viele Karten gewählt worden sind, werden sie in einem Passenden Grid angeordnet
    const game = document.getElementById("game");
    game.className="game"+x;                                //div game bekommt eine class mit Kartenanzahl zugewiesen
    const karte = document.querySelectorAll(".karte");
   
    karte.forEach(karte => {                                //Jeder Karte wird eine zufällige Zahl zugeordnet, in deren Reihenfolge sie angeordnet werden
        let position = Math.floor(Math.random() * x);
        karte.style.order = position;
    })

}





function getcheckedValue(){ //Funktion sucht nach ausgewähltem Button und gibt value davon an die anderen Funktionen weiter
    var button = document.getElementsByName("kartenzahl");
    for(i=0; i<21; i++){
        if(button[i].checked)
        {
            addpictures(button[i].value);
            createGrid(button[i].value); 
        }
    }
}

function none(){  //Lässt Einstellungen bei Spielstart verschwinden
    document.getElementById("einstellungen").style.display = "none"; 
}

function showcount(){   //Zeigt nach Spieltstart den Zähler für die Versuche und gefundenen Paare und die Zeit an
    document.getElementById("timelable").style.display = "list-item";
    document.getElementById("timer").style.display = "list-item";
    document.getElementById("flip").style.display = "list-item";
    document.getElementById("paare").style.display = "list-item";
}

function namet(){   //Nach Spielstart können die Namen nicht mehr geändert werden
    document.getElementById("name1").readOnly = true;
    document.getElementById("name2").readOnly = true;
    document.getElementById("name3").readOnly = true;
    document.getElementById("name4").readOnly = true;
}

function turn1(){   //Anzeige dafür, dass bei Spielstart Spieler1 an der Reihe ist
    document.getElementById("spieler1").style.borderWidth = "3px";
    document.getElementById("spieler2").style.borderWidth = "1px";
    document.getElementById("spieler3").style.borderWidth = "1px";
    document.getElementById("spieler4").style.borderWidth = "1px";
}

var secplace = 0; 
var min = 0;
var sec = 0;

function timer(){   //Zählt Zeit hoch  
    sec++;
    if(sec == 59){      //Bei 59 Sekunden wird sec 0 und die Minuten um 1 hochgezählt
        sec = 0;
        min = min + 1;
    }

    if(sec == 10){
        secplace = "";
    }

    if(sec == 0){
        secplace = 0;
    }

    document.getElementById("timer").innerText = min+':'+secplace+sec;
}

function startgame(){    //Klick auf Start
    none();
    showcount();
    namet();
    turn1();
    getcheckedValue();
    time=window.setInterval('timer()',1000);
}


function getMenu(){     //Zeigt nach Reset, Klick auf Menü, die Einstellungen wieder an
    document.getElementById("einstellungen").style.display = "inline-block"; 
}

function namef(){   //Nach Reset kann man die Namen wieder ändern
    document.getElementById("name1").readOnly = false;
    document.getElementById("name2").readOnly = false;
    document.getElementById("name3").readOnly = false;
    document.getElementById("name4").readOnly = false;
}

function deleteField(){ //Löscht bei Reset das div game, in dem alle Karten sind
    var game = document.getElementById("game");
    game.remove()
}

var setzeroFilps = "Flips: 0"
var setzeroPairs = "Pairs: 0"

function setzero(){  //Zähler werden wieder auf 0 gesetzt und deren Anzeige verschwindet
   document.getElementById("flip").innerHTML=setzeroFilps;
   document.getElementById("paare").innerHTML=setzeroPairs;

   document.getElementById("f1").innerHTML=setzeroFilps ;
   document.getElementById("f2").innerHTML=setzeroFilps;
   document.getElementById("f3").innerHTML=setzeroFilps;
   document.getElementById("f4").innerHTML=setzeroFilps;

   document.getElementById("p1").innerHTML=setzeroPairs;
   document.getElementById("p2").innerHTML=setzeroPairs;
   document.getElementById("p3").innerHTML=setzeroPairs;
   document.getElementById("p4").innerHTML=setzeroPairs;
}

function nodisplay(){   //Timer, Versuche und Paare werden bei den Einstellungen nicht
    document.getElementById("timelable").style.display = "";
    document.getElementById("timer").style.display = "";
    document.getElementById("flip").style.display = "";
    document.getElementById("paare").style.display = "";
}

function noturn(){      //Anzeige welcher Spieler an der Reihe ist geht "aus"
    document.getElementById("spieler1").style.borderWidth = "1px";
    document.getElementById("spieler2").style.borderWidth = "1px";
    document.getElementById("spieler3").style.borderWidth = "1px";
    document.getElementById("spieler4").style.borderWidth = "1px";
}

function reset(){       //Klick auf Menü
    getMenu();
    namef();
    deleteField();
    setzero();
    nodisplay();
    noturn();
    window.clearInterval(time);
    min = 0;
    sec = 0;
    document.getElementById("timer").innerText = '0:00';
}
    


