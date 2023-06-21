let e;const t=document.querySelector(".toggle-icon-sun"),a=document.querySelector(".day-night-switch");function o(){document.body.classList.add("dark__theme"),t.classList.remove("toggle-icon-sun"),t.classList.add("toggle-icon-moon")}function i(){document.body.classList.remove("dark__theme"),t.classList.remove("toggle-icon-moon"),t.classList.add("toggle-icon-sun")}"use strict";null===localStorage.getItem("darkMode")&&localStorage.setItem("darkMode","false"),"true"===localStorage.getItem("darkMode")?(o(),a.checked=!0):(i(),a.checked=!1),a.addEventListener("change",()=>{a.checked?o():i(),localStorage.setItem("darkMode",a.checked)});const l=document.querySelector(".myLibrary--watched"),n=document.querySelector(".myLibrary--queue"),s=document.querySelector(".watched"),c=document.querySelector(".queue"),d=document.querySelector(".header_library");function r(){l.innerHTML="",l.classList.remove("is-hidden"),n.classList.add("is-hidden"),c.classList.remove("aktiv"),s.classList.add("aktiv");let e=JSON.parse(localStorage.getItem("watched-films"));if(e&&e.length>0){let t=e.map(e=>`<a class="gallery__link">
        <div class="gallery__item" id="${e.id}">
          <img class="gallery__item-img" src="https://image.tmdb.org/t/p/w500/${e.poster_path}" />
          <h4 class="gallery__item-header">${e.title}</h4>
          <span class="gallery__item-info">${e.genres.map(e=>`${e.name}`).join(", ")}</span>
          <span class="gallery__item-info">${e.release_date.substring(0,4)}</span>
        </div>
      </a>`).join("");l.insertAdjacentHTML("afterbegin",t)}else l.insertAdjacentHTML("afterbegin",'<h4 class="noway">Tutaj nic nie ma!<p class="nowaytwo">Dodaj proszę filmy do kolekcji !</p></h4>')}s.addEventListener("click",r),d.addEventListener("click",r),c.addEventListener("click",function(){n.innerHTML="",l.classList.add("is-hidden"),n.classList.remove("is-hidden"),s.classList.remove("aktiv"),c.classList.add("aktiv");let e=JSON.parse(localStorage.getItem("queued-films"));if(e&&e.length>0){let t=e.map(e=>`<a class="gallery__link">
    <div class="gallery__item" id="${e.id}">
      <img class="gallery__item-img" src="https://image.tmdb.org/t/p/w500/${e.poster_path}" />
      <h4 class="gallery__item-header">${e.title}</h4>
      <span class="gallery__item-info">${e.genres.map(e=>`${e.name}`).join(", ")}</span>
      <span class="gallery__item-info">${e.release_date.substring(0,4)}</span>
    </div>
  </a>`).join("");n.insertAdjacentHTML("afterbegin",t)}else n.insertAdjacentHTML("afterbegin",'<h4 class="noway">Tutaj nic nie ma!<p class="nowaytwo">Dodaj proszę filmy do kolekcji !</p></h4>')}),window.addEventListener("load",r);const m=document.querySelector(".modal-footer");document.querySelector(".close-footer");const u=document.querySelector(".open-modal"),g=document.querySelector(".close-modal");u.addEventListener("click",()=>{m.style.display="block"}),g.addEventListener("click",()=>{m.style.display="none"});const y=document.querySelector(".backdrop"),_=document.querySelector(".modal__btnClose"),h=document.querySelector(".modal__moviePoster"),p=document.querySelector(".modal__title"),f=document.querySelector(".modal__about"),S=document.querySelector(".modal__genre"),L=document.querySelector(".modal__vote"),v=document.querySelector(".modal__votes"),k=document.querySelector(".modal__popularity"),q=document.querySelector(".modal__originalTitle"),b=document.querySelectorAll(".gallery"),w=document.querySelector(".modal__btnRemoveWatched"),$=document.querySelector(".modal__btnRemoveQueue");function j(t){t.target.matches("img")&&(e=t.target.parentNode.id,t.currentTarget.classList.contains("myLibrary--queue")&&($.classList.remove("is-hidden"),w.classList.add("is-hidden")),t.currentTarget.classList.contains("myLibrary--watched")&&(w.classList.remove("is-hidden"),$.classList.add("is-hidden")),E(e).then(e=>{h.setAttribute("src",`https://image.tmdb.org/t/p/w500/${e.poster_path}`),p.textContent=e.title,L.textContent=`${e.vote_average.toFixed(1)}`,v.textContent=`${e.vote_count}`,k.textContent=e.popularity.toFixed(1),q.textContent=e.original_title,f.textContent=e.overview,S.textContent=e.genres[0].name}),I())}async function E(e){try{let t=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=e7c806d7ce9bbdf1ef93bebcabbfe0f1`),a=await t.json();return a}catch(e){console.log(e)}}function I(){y.classList.toggle("is-hidden")}b.forEach(e=>{e.addEventListener("click",j)}),_.addEventListener("click",I),document.addEventListener("keydown",function(e){27!==e.keyCode||y.classList.contains("is-hidden")||I()}),y.addEventListener("click",function(e){e.target===y&&I()}),w.addEventListener("click",function(){let t=[];localStorage.getItem("watched-films")&&(t=JSON.parse(localStorage.getItem("watched-films"))),E(e).then(e=>{for(let a=0;a<t.length;a++)if(t[a].id===e.id){let a=t.findIndex(t=>t.id===e.id);t.splice(a,1),localStorage.setItem("watched-films",JSON.stringify(t));let o=document.querySelector(`#${CSS.escape(e.id)}`);o.parentNode.remove(),I()}})}),$.addEventListener("click",function(){let t=[];localStorage.getItem("queued-films")&&(t=JSON.parse(localStorage.getItem("queued-films"))),E(e).then(e=>{for(let a=0;a<t.length;a++)if(t[a].id===e.id){let a=t.findIndex(t=>t.id===e.id);t.splice(a,1),localStorage.setItem("queued-films",JSON.stringify(t));let o=document.querySelector(`#${CSS.escape(e.id)}`);o.parentNode.remove(),I()}})});
//# sourceMappingURL=mylibrary.5fc111b7.js.map
