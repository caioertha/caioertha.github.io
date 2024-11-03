const avatar = document.querySelector("#avatar")

const gingar = (seletor) => {
    const avatar = document.querySelector(seletor)
    avatar.src = "img/ryu-ginga.gif";
}

const parar = (seletor) => {
    const avatar = document.querySelector(seletor)
    avatar.src = "img/ryu.png";
}

const raduqui = (seletor) => {
    const avatar = document.querySelector(seletor)
    //mudar figura
    avatar.src = "img/ryu-magia.png";
    const bolaDeFogo = '<img src="img/bola-fogo.gif" id="bolaDeFogo">'
    //aparecer bola de fogo
    document.querySelector("#jogo").innerHTML += bolaDeFogo;
    //criar som
    const somRaduqui = '<audio autoplay src="img/hadouken.mp3">';
    document.body.innerHTML += somRaduqui;
}

const voadora = (seletor) => {

}

avatar.addEventListener("mouseover", function(){
    gingar("#avatar");
})

avatar.addEventListener("mouseout", function(){
    parar("#avatar");
})

avatar.addEventListener("keypress", function(){
    voadora("#avatar");
})

avatar.addEventListener("dblclick", function(){
    raduqui("#avatar");
})