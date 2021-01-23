let intervalo;
let saveMin, saveSec;
let paginaActual = 1;
let switcher = false;

let label = document.querySelector('#timer-label');
let fondo = document.querySelector('body');
let btnsNav = document.querySelectorAll('.container-items__item');

let btnPomodoro = document.querySelector('#btn-pomodoro');
let btnShortBreak = document.querySelector('#btn-short-break');
let btnComenzar = document.querySelector('#btn-start');
let btnLongBreak = document.querySelector('#btn-long-break');



class Temporizador {
    constructor(minutos, segundos) {
        this.minutos = minutos;
        this.segundos = segundos;

    }
    comenzar(label) {
        let tiempoTotal = this.minutos * 60 + this.segundos;
        intervalo = setInterval(() => {
            let minutosReales = Math.floor(tiempoTotal / 60);
            let segundosReales = tiempoTotal % 60;

            let minutosPadding = minutosReales <= 9 ? 0 : '';
            let segundosPadding = segundosReales <= 9 ? 0 : '';

            let tiempoReal = `${minutosPadding}${minutosReales}:${segundosPadding}${segundosReales}`;
            saveMin = minutosReales;
            saveSec = segundosReales;
            label.textContent = tiempoReal;
            if (tiempoTotal === 0) {
                clearInterval(intervalo);
            }
            tiempoTotal--;
        }, 1000);
    }

}

let pomodoro = new Temporizador(25, 0);
let shortBreak = new Temporizador(5, 0);
let longBreak = new Temporizador(15, 0);


btnPomodoro.addEventListener('click', function () {
    paginaActual = 1;
    switcher = false;
    saveMin = pomodoro.minutos;
    saveSec = pomodoro.segundos;
    clearInterval(intervalo);

    fondo.setAttribute('class', 'bg-default');
    fondoBotonesNav('bg-default');
    

    label.textContent = '25:00';
    btnComenzar.innerHTML = 'COMENZAR';

})

btnShortBreak.addEventListener('click', function () {
    paginaActual = 2;
    switcher = false;
    saveMin = shortBreak.minutos;
    saveSec = shortBreak.segundos;
    clearInterval(intervalo);

    fondo.setAttribute('class','bg-green');
    fondoBotonesNav('bg-green');
    

    label.textContent = '05:00';
    btnComenzar.innerHTML = 'COMENZAR';

})

btnLongBreak.addEventListener('click', function () {
    paginaActual = 3;
    switcher = false;
    saveMin = longBreak.minutos;
    saveSec = longBreak.segundos;
    clearInterval(intervalo);

    fondo.setAttribute('class', 'bg-cyan');
    fondoBotonesNav('bg-cyan');

    label.textContent = '15:00';
    btnComenzar.innerHTML = 'COMENZAR';
})

btnComenzar.addEventListener('click', function () {
    if (switcher == false) {
        btnComenzar.textContent = 'PARAR';
        if (paginaActual === 1) {
            pomodoro.comenzar(label);
        } else if (paginaActual === 2) {
            shortBreak.comenzar(label);
        } else if (paginaActual === 3) {

            longBreak.comenzar(label);
        }
        switcher = true;
    } else {
        if (paginaActual === 1) {
            pomodoro.minutos = saveMin;
            pomodoro.segundos = saveSec;
        } else if (paginaActual === 2) {
            shortBreak.minutos = saveMin;
            shortBreak.segundos = saveSec;
        } else if (paginaActual === 3) {
            longBreak.minutos = saveMin;
            longBreak.segundos = saveSec;
        }
        switcher = false;
        clearInterval(intervalo);
        btnComenzar.textContent = 'COMENZAR';
    }
})


function fondoBotonesNav(clase) {
    for (let i = 0; i < btnsNav.length; i++) {

        if (clase === 'bg-cyan') {
            btnsNav[i].classList.remove('bg-default');
            btnsNav[i].classList.remove('bg-green');
        } else if (clase === 'bg-default') {
            btnsNav[i].classList.remove('bg-cyan');
            btnsNav[i].classList.remove('bg-green');
        }else if (clase === 'bg-green') {
            btnsNav[i].classList.remove('bg-default');
            btnsNav[i].classList.remove('bg-cyan');
        }

        btnsNav[i].classList.add(clase);
    }
}