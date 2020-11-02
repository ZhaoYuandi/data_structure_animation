//文字呼吸部分
var breath = document.querySelector('#breath');
var transparency = 10;
var reduce = true;
function result() {
    if (reduce === true){
        transparency -= 1;
        if (transparency === 1){
            reduce = false;
        }
    } else if (reduce === false){
        transparency += 1;
        if (transparency === 10){
            reduce = true;
        }
    }
    breath.style.opacity = transparency/10;
}
setInterval(result,200);

//页面切换部分
var core = document.querySelector("#core");
core.onclick = function () {
    window.location.replace("./pages/main.html")
};



