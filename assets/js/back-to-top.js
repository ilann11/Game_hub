(()=>{const backToTop=document.getElementById('back-to-top');if(!backToTop)return;const SCROLL_THRESHOLD=20;function scrollFunction(){if(document.body.scrollTop>SCROLL_THRESHOLD||document.documentElement.scrollTop>SCROLL_THRESHOLD){backToTop.classList.add('visible')}else{backToTop.classList.remove('visible')}}
function topFunction(e){e.preventDefault();document.body.scrollTop=0;document.documentElement.scrollTop=0}
window.addEventListener('scroll',scrollFunction,{passive:!0});backToTop.addEventListener('click',topFunction);scrollFunction()})()