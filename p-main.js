//notificação com som -> quando o Timer acabar
function PomodoroAlarm() {
    var TocarAlarme = document.getElementById('selecionar-a').value;
    var TocarAudio = document.getElementById(TocarAlarme);
    var ADvolume = document.getElementById('volume_a').value;
    TocarAudio.volume = ADvolume/100;
    TocarAudio.play();
}

//crônometro
function Cronometro(segundos, clicK) {
    this.segundos = segundos || (25*60);
    this.clicK = clicK || 500; 
    this.clickFunction = [];
    this.R = false;
    this.C = this.segundos;

    this.start = function() {
        if (this.R) {
            return;
        }

        this.R = true;

        //começando timer
        var ComecarTimer = Date.now(), 
            Timer = this;

        (function Click() {
            segundosTimer = ((Date.now() - ComecarTimer)/1000) | 0;
            var segundosC = Timer.C - segundosTimer;

            //usuário interrompendo
            if (Timer.R === false) {
                Timer.C = segundosC;
            } else {
                if (segundosC > 0) {
                    setTimeout(Click, Timer.clicK);
                } else {
                    
                    //parar
                    Timer.C = 0;
                    Timer.R = false;

                    //notificação
                    PomodoroAlarm();
                }

                var timerC = parsesegundos(segundosC);
                Timer.clickFunction.forEach(
                    function(ClickFunction) {
                      ClickFunction.call(this, 
                      timerC.minutos, 
                      timerC.segundos);
                    },
                Timer);
            }
        }());        
    };

    //botão pausar timer
    this.timerPausar = function() {
        this.R = false;
    };

    //botão de reset -> reiniciar timer
    this.timerReiniciar = function(segundos) {
        this.R = false;
        this.segundos = segundos
        this.C = segundos
    };

    this.onClick = function(ClickFunction) {
        if (typeof ClickFunction === 'function') {
            this.clickFunction.push(ClickFunction);
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
    var TimerNaTela = document.getElementById('timer'),
        customizarTimer = document.getElementById('btn-customz'),
        timer = new Cronometro(),
        defTimer = parsesegundos(25*60);

    function TimersButtons(minutos, segundos) {
        if (minutos >= 60) {
            horas = Math.floor(minutos / 60);
            minutos = minutos % 60;
            Cronometrohoras = horas + ':';
            
            
        } else {
            Cronometrohoras = '';
        }
        
        Cronometrominutos = minutos < 10 ? '0' + minutos : minutos;
        Cronometrominutos += ':';
        Cronometrosegundos = segundos < 10 ? '0' + segundos : segundos;

        TimerNaTela.textContent = Cronometrohoras + Cronometrominutos + Cronometrosegundos;
    }

    function timerReiniciar2(segundos) {
        timer.timerPausar();
        timer = new Cronometro(segundos); 
        timer.onClick(TimersButtons);
    }

    TimersButtons(defTimer.minutos, defTimer.segundos);
    timer.onClick(TimersButtons);
    
    //botões habilitados
    document.getElementById('btn-start').addEventListener(
        'click', function() { 
            timer.start(); 
            Pomodorosrealizados();
            
        });
        
    document.getElementById('btn-pause').addEventListener(
        'click', function() {
            timer.timerPausar(); 
        });
        
    document.getElementById('btn-reset').addEventListener(
        'click', function() {
            timerReiniciar2(timer.segundos);
            timer.start();
            Pomodorosrealizados();
            
        });
        
    document.getElementById('btn-pomodoro').addEventListener(
        'click', function () {
            timerReiniciar2(25*60);
            timer.start();
            Pomodorosrealizados();
            
        });
        
    document.getElementById('btn-intervalo').addEventListener(
        'click', function () {
            timerReiniciar2(5*60);
            timer.start();
            Pomodorosrealizados();
            
        });
        
    document.getElementById('btn-intervalo2').addEventListener(
        'click', function () {
            timerReiniciar2(10*60);
            timer.start();
            
            
        });
        
    document.getElementById('btn-customz').addEventListener(
        'click', function () {
            timerReiniciar2(customz.value*60);
            timer.start();
            
    });
   
};

function Pomodorosrealizados(){
    document.getElementById("Rpomodoros").innerHTML = `Pomodoros realizados: ${Rpomodoros}`;
}


