const spa = document.querySelectorAll('#dao span');
const pic = document.querySelectorAll('#pic img');
const dao = document.querySelector('#dao')
// console.log(dao);
//选项卡***************
let spev = 0;
let len = spa.length;
function xxk() {
    for (let i = 0; i < len; i++) {
        // pic[spev].className='n';
        spa[i].onclick = function () {
            pic[spev].className = 'n';
            spa[spev].classList.remove('c');
            spa[i].classList.add('c');
            pic[i].className = 'k';
            spev = i;
        }
    }
}
// xxk();
// for(let i=0,len=spa.length;i<len;i++){
//     // pic[spev].className='n';
//     spa[i].onclick=function(){
//         pic[spev].className='n';
//         pic[i].className='k';
//         spev=i;
//     }
// }
document.onclick = function () {
    dao.style.opacity = 1;
}
for (let i = 0; i < len; i++) {
    spa[i].onmouseover = function () {
        xxk();
    }
    spa[i].onmouseout = function () {
        setTimeout(() => {
            dao.style.opacity = 0;
        },5000);
    }

}