/*desplegar sliderbar*/
document.getElementById('open-close').addEventListener('click',()=>{
    document.getElementById('aside-container').classList.toggle('desplegar')
})
/*End desplegar sliderbar*/

/*open & close modal*/
const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isHidden  = 'show';

for( const i of openEls){
    i.addEventListener('click', function(){
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isHidden);
    });
}

for(const i of closeEls){
    i.addEventListener('click', function(){
        this.parentElement.parentElement.parentElement.classList.remove(isHidden);
    });
}
/* End open & close modal*/

/*desplegar configuration business*/
document.getElementById('open-configuration').addEventListener('click',()=>{
    document.getElementById('business-configuration').classList.toggle('desplegar-configuration')
})
document.getElementById('open-configProduct').addEventListener('click',()=>{
    document.getElementById('product-configuration').classList.toggle('desplegar-configuration')
})
/*End desplegar configuration business and product*/