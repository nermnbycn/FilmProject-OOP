const form=document.getElementById("film-form");
const titleElement=document.querySelector("#filmName");
const directorElement=document.querySelector("#directorName");
const posterElement=document.querySelector("#poster");
const scoreElement=document.querySelector("#score");
const filmListContainer=document.querySelector(".film-list-container");
const clear=document.getElementById("clear-all-films");

// UI objesini baslatma
const ui=new UI();

// Storage objesini baslatma
const storage=new Storage();

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films=storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    filmListContainer.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
    document.querySelector(".filtre").addEventListener("change", function() {
        let films = storage.getFilmsFromStorage(); 
        ui.filtre(films); // 'films' dizinini filtrele ve ekrana yazdır
    });

}

function addFilm(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const poster=posterElement.value;
    const score=scoreElement.value;

    if(title==="" || director==="" || poster==="" || score===""){
        ui.displayMessages("Lütfen tüm alanları doldurun","danger");
    }
    else{
        const newFilm= new Film(title,director,poster,score); // Yeni film olusturuldu 
        ui.addFilmtoUI(newFilm); // Arayuze film ekleme
        storage.addFilmToStorage(newFilm); // Local Storage'a film ekleme
        ui.displayMessages("Film başarıyla eklendi","success")
    }

    ui.clearInputs(title,director,poster,score);
    e.preventDefault();
}
function deleteFilm(e){
    console.log(e.target);
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme işlemi başarıyla gerçekleşti","success");
    }
}
function clearAllFilms(){
    if(confirm("Tüm filmleri kaldırmak istediğinize emin misiniz?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    } 
}


