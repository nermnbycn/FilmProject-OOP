function UI(){

}

UI.prototype.addFilmtoUI = function (newFilm){
    const filmList=document.getElementById("films");
    filmList.innerHTML += `
        <tr>
            <td><img src="${newFilm.poster}" class="img-fluid img-thumbnail"></td>
            <td>${newFilm.title}</td>
            <td>${newFilm.director}</td>
            <td>${newFilm.score}</td>
            <td><a href="#"><i class="fa-solid fa-square-xmark"  id="delete-film"></i></a></td>
        </tr>
    `;

    
}

UI.prototype.filtre = function(films) {
    const selectedFiltre = document.querySelector(".filtre select");
    const filmList=document.getElementById("films");
    filmList.innerHTML = ''; // Listeyi tamamen temizle

    if (selectedFiltre.value === "A-Z (Film Adı)") {
        films.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    } 
    else if (selectedFiltre.value === "A-Z (Yönetmen Adı)") {
        films.sort((a, b) => a.director.toLowerCase().localeCompare(b.director.toLowerCase()));
    } 
    else if (selectedFiltre.value === "Küçükten Büyüğe") {
        films.sort((a, b) => parseInt(a.score) - parseInt(b.score));
    } 
    else if (selectedFiltre.value === "Büyükten Küçüğe") {
        films.sort((a, b) => parseInt(b.score) - parseInt(a.score));
    }
    console.log(films); // Sıralamadan sonra
    films.forEach(function(film) {
        filmList.innerHTML += `
            <tr>
                <td><img src="${film.poster}" class="img-fluid img-thumbnail"></td>
                <td>${film.title}</td>
                <td>${film.director}</td>
                <td>${film.score}</td>
                <td><a href="#"><i class="fa-solid fa-square-xmark" id="delete-film"></i></a></td>
            </tr>
        `;
    });

    
};


UI.prototype.clearInputs = function(element1,element2,element3,element4){
    element1.value="";
    element2.value="";
    element3.value="";
    element4.value="";
}

UI.prototype.displayMessages= function(message,type){
    const formContainer = document.querySelector(".form-container");
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent=message;
    formContainer.appendChild(div);

    setTimeout(function(){
        div.remove();
    },3000);
}
UI.prototype.loadAllFilms=function(films){
   const filmList=document.getElementById("films");

    films.forEach(function(film){
        filmList.innerHTML += `
        <tr>
            <td><img src="${film.poster}" class="img-fluid img-thumbnail"></td>
            <td>${film.title}</td>
            <td>${film.director}</td>
            <td>${film.score}</td>
            <td><a href="#"><i class="fa-solid fa-square-xmark" id="delete-film"></i></a></td>
        </tr>
    `;
   });
}
UI.prototype.deleteFilmFromUI = function(element){
    element.parentElement.parentElement.parentElement.remove();
}
UI.prototype.clearAllFilmsFromUI=function(){
    const filmList=document.getElementById("films");

    while(filmList.firstElementChild !=null){
        filmList.firstElementChild.remove();
    }
}
