let canvas = document.getElementById('des')
let des = canvas.getContext('2d')

let estado = 'menu'
let fase = 1
let modoJogo = 2
const MAX_FASE = 3

const BACKGROUNDS = [
    './img/background.png',
    './img/background2.png',
    './img/background3.png'
]

let bg = new Background(BACKGROUNDS[0], 1200, 700)

const audio = document.getElementById('musica-fundo')
audio.volume = 0.5
let somAtivo = true

function toggleSom() {
    if (somAtivo === true) {
        somAtivo = false
        audio.pause()
    } else {
        somAtivo = true
        audio.play()
    }
}

function criaInimigos() {
    return [
        new Obstaculo(1300, 325, 80, 80, './img/obstaculo.png'),
        new Obstaculo(1500, 125, 80, 80, './img/obstaculo.png'),
        new Obstaculo(1700, 400, 80, 80, './img/obstaculo.png'),
        new Obstaculo(1900, 250, 80, 80, './img/obstaculo.png'),
        new Obstaculo(2100, 500, 80, 80, './img/obstaculo.png'),
    ]
}
let inimigos = criaInimigos()

let bolasNeve = [
    new BolaNeve(1600, 300, 36, 36, null),
    new BolaNeve(2300, 500, 36, 36, null),
]

let skiador  = new Skiador1(100, 250, 75, 75, './img/skiador.png')
let skiador2 = new Skiador2(100, 430, 75, 75, './img/skiador2.png')

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

let imgCoracao = new Image()
imgCoracao.src = "./img/vidaJ1.png"

let imgCoracaoAzul = new Image()
imgCoracaoAzul.src = "./img/vidaJ2.png"

document.addEventListener('keydown', (e) => {
    if (estado === 'menu') {
        if (e.key === '1') { modoJogo = 1; audio.play(); iniciarJogo(); return }
        if (e.key === '2') { modoJogo = 2; audio.play(); iniciarJogo(); return }
        if (e.key === 's' || e.key === 'S') { estado = 'sobre'; return }
        if (e.key === 'c' || e.key === 'C') { estado = 'controle'; return }
        if (e.key === 'm' || e.key === 'M') { toggleSom(); return }
        return
    }

    if (estado === 'sobre') {
        if (e.key === 'Escape' || e.key === 'Enter') estado = 'menu'
        if (e.key === 'm' || e.key === 'M') { toggleSom(); return }
        return
    }

    if (estado === 'controle') {
        if (e.key === 'Escape' || e.key === 'Enter') estado = 'menu'
        if (e.key === 'm' || e.key === 'M') { toggleSom(); return }
        return
    }

    if ((estado === 'gameover' || estado === 'vitoria') && (e.key === 'Enter' || e.key === ' ')) {
        reiniciar()
        return
    }

    if (estado === 'jogando') {
        if (e.key === 'w') skiador.dir = -10
        if (e.key === 's') skiador.dir = 10
        if (e.key === 'm' || e.key === 'M') { toggleSom(); return }

        if (modoJogo === 2) {
            if (e.key === 'ArrowUp') skiador2.dir = -10
            if (e.key === 'ArrowDown') skiador2.dir = 10
        }
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 's') skiador.dir = 0

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') skiador2.dir = 0
})

function iniciarJogo() {
    estado = 'jogando'
    fase = 1
    skiador  = new Skiador1(100, 250, 75, 75, './img/skiador.png')
    skiador2 = new Skiador2(100, 430, 75, 75, './img/skiador2.png')
    if (modoJogo === 1) skiador2.vida = 0
    inimigos = criaInimigos()
    bolasNeve = [
        new BolaNeve(1600, 300, 36, 36, null),
        new BolaNeve(2300, 500, 36, 36, null),
    ]
    bg.trocarImagem(BACKGROUNDS[0])
    bg.vel = 4
}

function reiniciar() {
    iniciarJogo()
}

function setVelInimigos(vel) {
    inimigos.forEach(i => i.vel = vel)
    bolasNeve.forEach(b => b.vel = vel)
    bg.vel = vel - 1
}

function game_over() {
    if (modoJogo === 1 && skiador.vida <= 0) {
        estado = 'gameover'
    }
    if (modoJogo === 2 && skiador.vida <= 0 && skiador2.vida <= 0) {
        estado = 'gameover'
    }
}

function ver_fase() {
    if (skiador.pontos >= 400 && fase === 2) {
        fase = 3
        setVelInimigos(13)
        bg.trocarImagem(BACKGROUNDS[2])
    } else if (skiador.pontos >= 200 && fase === 1) {
        fase = 2
        setVelInimigos(9)
        bg.trocarImagem(BACKGROUNDS[1])
    }

    if (skiador.pontos >= 600 && fase === 3) {
        estado = 'vitoria'
    }
}

function colisao() {
    inimigos.forEach(inimigo => {
        if (skiador.colid(inimigo)) {
            inimigo.recomeca()
            skiador.vida -= 1
            skiador.invencivel = 90
            console.log('vida P1: ', skiador.vida)
        }
        if (modoJogo === 2 && skiador2.colid(inimigo)) {
            inimigo.recomeca()
            skiador2.vida -= 1
            skiador2.invencivel = 90
            console.log('vida P2: ', skiador2.vida)
        }
    })
}

function coletarBolasNeve() {
    bolasNeve.forEach(bola => {
        if (skiador.colid(bola)) {
            skiador.vida = Math.min(skiador.vida + 1, 5)
            skiador.pontos += 10
            bola.recomeca()
        }
        if (modoJogo === 2 && skiador2.colid(bola)) {
            skiador2.vida = Math.min(skiador2.vida + 1, 5)
            skiador2.pontos += 10
            bola.recomeca()
        }
    })
}

function pontuacao() {
    inimigos.forEach(inimigo => {
        if (skiador.point(inimigo) || skiador2.point(inimigo)) {
            skiador.pontos  += 5
            skiador2.pontos += 5
            inimigo.recomeca()
        }
    })
}

function desenhaHUD() {
    des.fillStyle = 'rgba(0,0,0,0.45)'
    des.fillRect(0, 0, 1200, 85)

    des.fillStyle = '#FF8888'
    des.font = 'bold 14px Arial'
    des.textAlign = 'left'
    des.fillText('P1 (W/S)', 20, 16)
    for (let i = 0; i < skiador.vida; i++) {
        des.drawImage(imgCoracao, 20 + i * 30, 17, 26, 26)
    }

    if (modoJogo === 2) {
        des.fillStyle = '#88CCFF'
        des.font = 'bold 14px Arial'
        des.fillText('P2 (ArrowUp/ArrowDown)', 20, 50)
        for (let i = 0; i < skiador2.vida; i++) {
            des.drawImage(imgCoracaoAzul, 20 + i * 30, 54, 26, 26)
        }
    }

    des.font = 'bold 14px Arial'
    des.textAlign = 'right'
    if (somAtivo === true) {
        des.fillStyle = '#88FF88'
        des.fillText('[ M ] Som: ON', 1185, 38)
    } else {
        des.fillStyle = '#FF6666'
        des.fillText('[ M ] Som: OFF', 1185, 38)
    }

    t1.des_text('Pontos: ' + skiador.pontos, 980, 38, 'yellow', 'bold 26px Arial')
    fase_txt.des_text('Fase: ' + fase, 565, 38, 'white', 'bold 26px Arial')

    des.textAlign = 'left'
}

function desenhaMenu() {
    bg.desenha()

    des.fillStyle = 'rgba(0,0,0,0.65)'
    des.beginPath()
    des.roundRect(300, 130, 600, 430, 24)
    des.fill()

    des.fillStyle = '#ffffff'
    des.font = 'bold 64px Arial'
    des.textAlign = 'center'
    des.fillText('SKI RUSH', 600, 220)

    des.font = '20px Arial'
    des.fillStyle = '#cccccc'
    des.fillText('Desvie dos obstáculos e ganhe pontos!', 600, 268)

    des.fillStyle = '#FFD700'
    des.font = 'bold 24px Arial'
    des.fillText('[ 1 ] 1 Jogador', 600, 330)
    des.fillText('[ 2 ] 2 Jogadores', 600, 370)

    des.fillStyle = '#aaaaaa'
    des.font = '18px Arial'
    des.fillText('[ S ] Sobre', 600, 430)
    des.fillText('[ C ] Controles', 600, 475)

    if (somAtivo === true) {
        des.fillStyle = '#88FF88'
        des.fillText('[ M ] Som: ON', 600, 515)
    } else {
        des.fillStyle = '#FF6666'
        des.fillText('[ M ] Som: OFF', 600, 515)
    }

    des.textAlign = 'left'
}

function desenhaSobre() {
    bg.desenha()

    des.fillStyle = 'rgba(0,0,0,0.75)'
    des.beginPath()
    des.roundRect(300, 130, 600, 430, 24)
    des.fill()

    des.textAlign = 'center'
    des.fillStyle = '#FFD700'
    des.font = 'bold 36px Arial'
    des.fillText('SOBRE', 600, 200)

    des.fillStyle = 'white'
    des.font = '20px Arial'
    des.fillText('Desenvolvedor: Guilherme Rech', 600, 260)
    des.fillText('Email: gssrech@gmail.com', 600, 295)
    des.fillText('Product Owner: Carlos', 600, 365)
    des.fillText('Ano: 2026', 600, 400)

    des.fillStyle = '#FFD700'
    des.font = 'bold 20px Arial'
    des.fillText('[ ENTER ] Voltar', 600, 500)

    des.textAlign = 'left'
}

function desenhaControle() {
    bg.desenha()

    des.fillStyle = 'rgba(0,0,0,0.75)'
    des.beginPath()
    des.roundRect(300, 130, 600, 430, 24)
    des.fill()

    des.textAlign = 'center'
    des.fillStyle = '#FFD700'
    des.font = 'bold 36px Arial'
    des.fillText('Controles', 600, 200)

    des.fillStyle = 'white'
    des.font = '20px Arial'
    des.fillText('Jogador 1: W para subir e S para descer', 600, 265)
    des.fillText('Jogador 2: Arrow Up para subir', 600, 300)
    des.fillText('e Arrow Down para descer', 600, 328)

    des.fillStyle = '#cccccc'
    des.font = '17px Arial'
    des.fillText('Cada obstáculo desviado vale 5 pontos.', 600, 385)
    des.fillText('Coletar uma bola de neve vale 20 pontos e recupera 1 vida.', 600, 415)
    des.fillText('Objetivo: chegar a 600 pontos sem morrer.', 600, 445)

    des.fillStyle = '#FFD700'
    des.font = 'bold 20px Arial'
    des.fillText('[ ENTER ] Voltar', 600, 510)

    des.textAlign = 'left'
}

function desenhaGameOver() {
    des.fillStyle = 'rgba(0,0,0,0.7)'
    des.fillRect(0, 0, 1200, 700)

    des.textAlign = 'center'
    des.fillStyle = '#ff4444'
    des.font = 'bold 80px Arial'
    des.fillText('GAME OVER', 600, 260)

    des.fillStyle = 'white'
    des.font = 'bold 28px Arial'
    des.fillText('P1 — Pontuação: ' + skiador.pontos  + '   Vidas restantes: ' + Math.max(skiador.vida,  0), 600, 330)
    if (modoJogo === 2) des.fillText('P2 — Pontuação: ' + skiador2.pontos + '   Vidas restantes: ' + Math.max(skiador2.vida, 0), 600, 375)

    des.fillStyle = '#AAAAAA'
    des.font = '22px Arial'
    des.fillText('Fase alcançada: ' + fase, 600, 425)

    des.fillStyle = '#FFD700'
    des.font = 'bold 26px Arial'
    des.fillText('[ ENTER ] para jogar novamente', 600, 490)

    des.textAlign = 'left'
}

function desenhaVitoria() {
    des.fillStyle = 'rgba(0,0,0,0.7)'
    des.fillRect(0, 0, 1200, 700)

    des.textAlign = 'center'
    des.fillStyle = '#FFD700'
    des.font = 'bold 74px Arial'
    des.fillText(' VOCÊ VENCEU! ', 600, 230)

    des.fillStyle = 'white'
    des.font = 'bold 28px Arial'
    des.fillText('P1 — Pontuação: ' + skiador.pontos  + '   Vidas: ' + skiador.vida,  600, 305)
    if (modoJogo === 2) des.fillText('P2 — Pontuação: ' + skiador2.pontos + '   Vidas: ' + skiador2.vida, 600, 348)

    des.fillStyle = '#88FF88'
    des.font = '24px Arial'
    des.fillText('Parabéns! Vocês completaram as 3 fases!', 600, 405)

    des.fillStyle = '#FFD700'
    des.font = 'bold 26px Arial'
    des.fillText('[ ENTER ] para jogar novamente', 600, 470)

    des.textAlign = 'left'
}

function desenha() {
    if (estado === 'menu') {
        desenhaMenu()
        return
    }

    if (estado === 'sobre') {
        desenhaSobre()
        return
    }

    if (estado === 'controle') {
        desenhaControle()
        return
    }

    if (estado === 'jogando') {
        bg.desenha()
        bolasNeve.forEach(b => b.des_obj())
        inimigos.forEach(i => i.des_obj())
        skiador.des_obj()
        if (modoJogo === 2) skiador2.des_obj()
        desenhaHUD()
        return
    }

    if (estado === 'gameover') {
        bg.desenha()
        inimigos.forEach(i => i.des_obj())
        skiador.des_obj()
        if (modoJogo === 2) skiador2.des_obj()
        desenhaHUD()
        desenhaGameOver()
        return
    }

    if (estado === 'vitoria') {
        bg.desenha()
        inimigos.forEach(i => i.des_obj())
        skiador.des_obj()
        if (modoJogo === 2) skiador2.des_obj()
        desenhaHUD()
        desenhaVitoria()
        return
    }
}

function atualiza() {
    if (estado === 'menu' || estado === 'sobre' || estado === 'controle') {
        bg.atualiza()
        return
    }

    if (estado === 'jogando') {
        bg.atualiza()
        skiador.mov_obj()
        if (modoJogo === 2) skiador2.mov_obj()
        inimigos.forEach(i => i.mov_obj())
        bolasNeve.forEach(b => b.mov_obj())
        colisao()
        coletarBolasNeve()
        pontuacao()
        ver_fase()
        game_over()
    }
}

function main() {
    des.clearRect(0, 0, 1200, 700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()