const img = document.getElementById("img-generated");
const generateButton = document.getElementById("generate-img");
const restAPI = "https://cataas.com/";
const htmlExtension = "&html=true";
const effectOption = document.getElementById("effect-option");
const catTextInput = document.getElementById("cat-text")
const sizeOption = document.getElementById("size-option");
let downloadImg = document.getElementById("downloadImg");

let effect;
let catText;
let sizeText;

const renderImage = () => {
    effect = getEffect();
    catText = getText();
    sizeText = getSize();

    fetch("https://cataas.com/c/s/" + catText + "?filter=" + effect + "&size=" + sizeText + "&json=true", {
        mode: 'cors'
    })
        .then(function (response) {
            return response.json();
        }).then(function (response) {
            img.src = restAPI + response.url;
            downloadImg.href = img.src;
        }).catch(function (err) {
            console.log(err);
        });
}

function getText() {
    catText = catTextInput.value;
    if (catText === null || catText === "") {
        catText = "Te odio"
    }
    return catText;
}

function getEffect() {
    return effectOption.options[effectOption.selectedIndex].text;
}

function getSize() {
    return sizeOption.options[sizeOption.selectedIndex].text;
}

const init = (() => {
    renderImage();
    generateButton.addEventListener("click", () => {
        renderImage();
    })
})()
