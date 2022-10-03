let $btnIniciar = document.getElementById("inicia")
const $btnCancelar = document.getElementById("cancela")
const $mostraNumero = document.getElementById("mostraNumero")
const $numeroTimer = document.getElementById("numeroTimer")
const $somAlarme = new Audio("alarme.mp3")
let cancelar = false
let intervalo
function iniciarTimer(hora,min,seg){
    $btnIniciar = document.getElementById("pausar")
    intervalo = setInterval(()=>{
        if (seg != 0 || min != 0 || hora != 0){
            seg--
            if(seg < 0){
                if (min > 0){
                    min--
                    seg = 59
                } else if(hora>0){
                    hora --
                    min = 59
                    seg = 59
                } 
            }
            if (hora<10){
                formatHora = "0"+hora
            }else{
                formatHora = hora
            }
            if (min<10){
                formatMin = "0"+min
            }else{
                formatMin = min
            }
            if (seg<10){
                formatSeg = "0"+seg
            }else{
                formatSeg = seg
            }
        }else{
            $somAlarme.play()
            $btnIniciar.id = "inicia"
            $btnIniciar.innerText = "Iniciar"
            $numeroTimer.style.visibility = "visible"
            clearInterval(intervalo)

        }
        $mostraNumero.innerText = `${formatHora}:${formatMin}:${formatSeg}`
        
    },1000)
}


$btnIniciar.addEventListener("click", function(){
    if ($btnIniciar.id == "inicia"){
        tempoColocado = $numeroTimer.value
        $numeroTimer.style.visibility = "hidden"
        if(tempoColocado != "00:00:00"){
            $numeroTimer.value = "00:00:00"
            $mostraNumero.innerText = tempoColocado
            tempo = tempoColocado.split(":")
            hora = parseInt(tempo[0])
            min = parseInt(tempo[1])
            seg = parseInt(tempo[2])
            $btnIniciar.innerText = "Pausar"
            $btnIniciar.id = "pausar"
            iniciando = iniciarTimer(hora,min,seg)
        }else{
            alert("Você deve colocar um tempo para iniciar")
        }
    }else if ($btnIniciar.id == "pausar"){
        $btnIniciar.id = "retomar"
        $btnIniciar.innerText = "Iniciar"
        tempo = document.getElementById("mostraNumero").innerText
        tempoFormatado = tempo.split(":")
        hora = parseInt(tempoFormatado[0])
        min = parseInt(tempoFormatado[1])
        seg = parseInt(tempoFormatado[2])
        clearInterval(intervalo)
    }else if ($btnIniciar.id == "retomar"){
        $btnIniciar.innerText = "Pausar"
        $btnIniciar.id = "pausar"
        iniciando = iniciarTimer(hora,min,seg)
    }
})

$btnCancelar.addEventListener("click",function(){
    document.getElementById("mostraNumero"). innerText = "00:00:00"
    formatHora = 0 
    formatMin = 0 
    formatSeg = 0
    clearInterval(intervalo)
    $btnIniciar.id = "inicia"
    $btnIniciar.innerText = "Iniciar"
    $numeroTimer.style.visibility = "visible"
})


document.addEventListener("keypress",function(e){
    if(e.key === "i" || e.key === "I"){
        try{
            let btn = document.getElementById("inicia")
            btn.click()
        }catch{
            let btn = document.getElementById("retomar")
            btn.click()
        }
        
    }else if (e.key === "p" || e.key === "P"){
        let btn = document.getElementById("pausar")
        btn.click()
    }else if (e.key === "c" || e.key === "C"){
        let btn = document.getElementById("cancela")
        btn.click()
    }
})