// import { hideLoader } from "./header";

const icon = document.querySelector('.toggle-icon-sun');
const switchDayNight = document.querySelector('.day-night-switch');


if (localStorage.getItem('darkMode')===null){
    localStorage.setItem('darkMode', "false");
}

checkDarkModeStatus();

function checkDarkModeStatus(){
    if (localStorage.getItem("darkMode")==='true'){
        addDarkTheme();
        switchDayNight.checked = true;
    }else{
        removeDarkTheme();
        switchDayNight.checked = false;
    }
}



switchDayNight.addEventListener('change', ()=>{
if(switchDayNight.checked){
addDarkTheme()
    
}else{
removeDarkTheme()
}
  localStorage.setItem("darkMode",switchDayNight.checked);
})

function addDarkTheme(){
    document.body.classList.add('dark__theme');
    

    icon.classList.remove('toggle-icon-sun')
    icon.classList.add('toggle-icon-moon');

   
}


function removeDarkTheme(){
    document.body.classList.remove('dark__theme');
   

    icon.classList.remove('toggle-icon-moon' );
    icon.classList.add('toggle-icon-sun');

  
}