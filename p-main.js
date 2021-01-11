//notificação com som -> quando o Timer acabar
function playAlarm() {
    var pomodoroAlarm =  new Audio("sound-mario.mp3");
    pomodoroAlarm.play();
}

//cronômetro na tela -> contagem regressiva do Pomodoro
function TimerCronometro(segundos, a) {
    this.segundos = segundos || (25*60);
    this.a = a || 500;
    this.a = [];
    this.timerRun = false;
    this.timerC = this.segundos;

    this.start = function() {
        if (this.timerRun) {
            return;
        }

        this.timerRun = true;

        //começando timer do Pomodoro
        var ComecarPomodoro = Date.now(), 
            Pomodoro = this;
         
        (function pomTimer() {
            segundosComecando = ((Date.now() - ComecarPomodoro)/1000) | 0;
            var segundostimerC = Pomodoro.timerC - segundosComecando;
            
            if (Pomodoro.timerRun === false) {
                Pomodoro.timerC = segundostimerC;
            } else {
                if (segundostimerC > 0) {
                    setTimeout(pomTimer, Pomodoro.a);
                } else {
                    
                    Pomodoro.timerC = 0;
                    Pomodoro.timerRun = false;

                    //notificação
                    pomodoroAlarm.play();
                    
                }
                
                var timetimerC = parsesegundos(segundostimerC);
                Pomodoro.a.forEach(
                    function(pomTimerFunction) {
                        pomTimerFunction.call(this, 
                        timetimerC.minutos, 
                        timetimerC.segundos);
                    }, 
                Pomodoro);
            }
        }());        
    };

    //botão pausar timer
    this.pause = function() {
        this.timerRun = false;
    };

    this.onClick = function(pomTimerFunction) {
        if (typeof pomTimerFunction === 'function') {
            this.a.push(pomTimerFunction);
        }
    };
}

function parsesegundos(segundos) {
    return {
        'minutos': (segundos / 60) | 0,
        'segundos': (segundos % 60) | 0
    }
}

window.onload = function () {
    var cronometroTela = document.getElementById('timer'),
        customzt = document.getElementById('customz'),
        timer = new TimerCronometro(),
        timerDef = parsesegundos(25*60);
    
    function PomodoroButtonsTela(minutos, segundos) {
        Pminutos = minutos < 10 ? '0' + minutos : minutos;
        Pminutos += ':';
        Psegundos = segundos < 10 ? '0' + segundos : segundos;

        //P - ponteiros na tela, relógio etc
        cronometroTela.textContent =  Pminutos + Psegundos; 
    }
    
    //reinicia o timer quando clica em outro botão
    function ResetButtonsTroca(segundos) {
        timer.pause();
        timer = new TimerCronometro(segundos); 
        timer.onClick(PomodoroButtonsTela);
    }
    
    PomodoroButtonsTela(timerDef.minutos, timerDef.segundos);

    timer.onClick(PomodoroButtonsTela);
    
    //botões habilitados
    document.getElementById('btn_comecar').addEventListener(
        'click', function () { 
            timer.start(); 
        });
        
    document.getElementById('btn_pausar').addEventListener(
        'click', function () {
            timer.pause(); 
        });
        
    document.getElementById('btn_pomodoro').addEventListener(
        'click', function () {
            ResetButtonsTroca(25*60);
            timer.start();
        });
        
    document.getElementById('btn_intervalo').addEventListener(
        'click', function () {
            ResetButtonsTroca(5*60);
            timer.start();
        });
        
    document.getElementById('btn_intervalolongo').addEventListener(
        'click', function () {
            ResetButtonsTroca(10*60);
            timer.start();
        });
        
    document.getElementById('btn_custom').addEventListener(
        'click', function () {
            ResetButtonsTroca(customz.value*60);
            timer.start();
        });  
};

