let canvas = document.getElementById('des')
let des = canvas.getContext('2d')

let estado = 'menu'
let fase = 1
const MAX_FASE = 3

const BACKGROUNDS = [
    './img/background.png',
    './img/background2.png',
    './img/background3.png'
]

let bg = new Background(BACKGROUNDS[0], 1200, 700)

function criaInimigos() {
    return [
        new CarroInimigo(1300, 325, 80, 80, './img/obstaculo.png'),
        new CarroInimigo(1500, 125, 80, 80, './img/obstaculo.png'),
        new CarroInimigo(1700, 400, 80, 80, './img/obstaculo.png'),
        new CarroInimigo(1900, 250, 80, 80, './img/obstaculo.png'),
        new CarroInimigo(2100, 500, 80, 80, './img/obstaculo.png'),
    ]
}
let inimigos = criaInimigos()

let carro  = new Carro (100, 250, 75, 75, './img/skiador.png')
let carro2 = new Carro2(100, 430, 75, 75, './img/skiador2.png')

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

let imgCoracao = new Image()
imgCoracao.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='red' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E"

let imgCoracaoAzul = new Image()
imgCoracaoAzul.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%230099ff' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E"

document.addEventListener('keydown', (e) => {
    if (estado === 'menu' && (e.key === 'Enter' || e.key === ' ')) {
        iniciarJogo()
        return
    }

    if ((estado === 'gameover' || estado === 'vitoria') && (e.key === 'Enter' || e.key === ' ')) {
        reiniciar()
        return
    }

    if (estado === 'jogando') {
        if (e.key === 'w') carro.dir = -10
        if (e.key === 's') carro.dir = 10

        if (e.key === 'ArrowUp') carro2.dir = -10
        if (e.key === 'ArrowDown') carro2.dir = 10
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 's') carro.dir = 0

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') carro2.dir = 0
})

function iniciarJogo() {
    estado = 'jogando'
    fase = 1
    carro  = new Carro (100, 250, 75, 75, './img/skiador.png')
    carro2 = new Carro2(100, 430, 75, 75, './img/skiador2.png')
    inimigos = criaInimigos()
    bg.trocarImagem(BACKGROUNDS[0])
    bg.vel = 4
}

function reiniciar() {
    iniciarJogo()
}

function setVelInimigos(vel) {
    inimigos.forEach(i => i.vel = vel)
    bg.vel = vel - 1
}

function game_over() {
    if (carro.vida <= 0 && carro2.vida <= 0) {
        estado = 'gameover'
        // música com o jogo parado
    }
}

function ver_fase() {
    if (carro.pontos >= 300 && fase === 2) {
        fase = 3
        setVelInimigos(13)
        bg.trocarImagem(BACKGROUNDS[2])
    } else if (carro.pontos >= 150 && fase === 1) {
        fase = 2
        setVelInimigos(9)
        bg.trocarImagem(BACKGROUNDS[1])
    }

    if (carro.pontos >= 500 && fase === 3) {
        estado = 'vitoria'
    }
}

function colisao() {
    inimigos.forEach(inimigo => {
        if (carro.colid(inimigo)) {
            inimigo.recomeca()
            carro.vida -= 1
            carro.invencivel = 90
            console.log('vida P1: ', carro.vida)
        }
        if (carro2.colid(inimigo)) {
            inimigo.recomeca()
            carro2.vida -= 1
            carro2.invencivel = 90
            console.log('vida P2: ', carro2.vida)
        }
    })
}

function pontuacao() {
    inimigos.forEach(inimigo => {
        if (carro.point(inimigo) || carro2.point(inimigo)) {
            carro.pontos  += 10
            carro2.pontos += 10
            inimigo.recomeca()
        }
    })
}

function desenhaHUD() {
    des.fillStyle = 'rgba(0,0,0,0.45)'
    des.fillRect(0, 0, 1200, 55)

    des.fillStyle = 'white'
    des.font = 'bold 13px Arial'
    des.textAlign = 'left'
    des.fillText('P1 (W/S)', 20, 14)
    for (let i = 0; i < carro.vida; i++) {
        des.drawImage(imgCoracao, 20 + i * 30, 18, 26, 26)
    }

    des.fillStyle = 'white'
    des.font = 'bold 13px Arial'
    des.fillText('P2 (ArrowUp/ArrowDown)', 20, 50)
    for (let i = 0; i < carro2.vida; i++) {
        des.drawImage(imgCoracaoAzul, 20 + i * 30, 54, 26, 26)
    }

    t1.des_text('Pontos: ' + carro.pontos, 980, 38, 'yellow', 'bold 26px Arial')
    fase_txt.des_text('Fase: ' + fase, 565, 38, 'white', 'bold 26px Arial')
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
    des.fillText('  SKI RUSH', 600, 220)

    des.font = '20px Arial'
    des.fillStyle = '#cccccc'
    des.fillText('Desvie dos obstáculos e ganhe pontos!', 600, 268)

    des.fillStyle = '#FF8888'
    des.font = 'bold 18px Arial'
    des.fillText('P1 — W / S', 600, 318)

    des.fillStyle = '#88CCFF'
    des.font = 'bold 18px Arial'
    des.fillText('P2 — Arrow Up / Arrow Down', 600, 348)

    des.fillStyle = '#FFD700'
    des.font = 'bold 28px Arial'
    des.fillText('[ ENTER ] para jogar', 600, 420)

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
    des.fillText('P1 — Pontuação: ' + carro.pontos  + '   Vidas restantes: ' + Math.max(carro.vida,  0), 600, 330)
    des.fillText('P2 — Pontuação: ' + carro2.pontos + '   Vidas restantes: ' + Math.max(carro2.vida, 0), 600, 375)

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
    des.fillText('P1 — Pontuação: ' + carro.pontos  + '   Vidas: ' + carro.vida,  600, 305)
    des.fillText('P2 — Pontuação: ' + carro2.pontos + '   Vidas: ' + carro2.vida, 600, 348)

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

    if (estado === 'jogando') {
        bg.desenha()
        inimigos.forEach(i => i.des_carro())
        carro.des_carro()
        carro2.des_carro()
        desenhaHUD()
        return
    }

    if (estado === 'gameover') {
        bg.desenha()
        inimigos.forEach(i => i.des_carro())
        carro.des_carro()
        carro2.des_carro()
        desenhaHUD()
        desenhaGameOver()
        return
    }

    if (estado === 'vitoria') {
        bg.desenha()
        inimigos.forEach(i => i.des_carro())
        carro.des_carro()
        carro2.des_carro()
        desenhaHUD()
        desenhaVitoria()
        return
    }
}

function atualiza() {
    if (estado === 'menu') {
        bg.atualiza()
        return
    }

    if (estado === 'jogando') {
        bg.atualiza()
        carro.mov_car()
        carro2.mov_car()
        // carro.anim('carro_00')
        inimigos.forEach(i => i.mov_car())
        colisao()
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