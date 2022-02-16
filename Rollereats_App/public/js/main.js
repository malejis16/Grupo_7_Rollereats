window.addEventListener("scroll",function(){
    var header = this.document.querySelector("header")
    header.classList.toggle("abajo", this.window.scrollY > 0);
});