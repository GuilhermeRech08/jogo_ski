let canvas = document.getElementById('des')
let des = canvas.getContext('2d')

let estado = 'menu'
let fase = 1
const MAX_FASE = 3

let bg = new Background('./img/background.png', 1200, 700)

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

let carro = new Carro(100, 325, 75, 75, './img/skiador.png')

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

let imgCoracao = new Image()
imgCoracao.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='red' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E"

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
        if (e.key === 'w' || e.key === 'ArrowUp')   carro.dir = -10
        if (e.key === 's' || e.key === 'ArrowDown') carro.dir = +10
    }
    console.log(e.key)
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp')   carro.dir = 0
    if (e.key === 's' || e.key === 'ArrowDown') carro.dir = 0
    console.log(e.key)
})

function iniciarJogo() {
    estado = 'jogando'
    fase = 1
    carro = new Carro(100, 325, 75, 75, './img/skiador.png')
    inimigos = criaInimigos()
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
    if (carro.vida <= 0) {
        estado = 'gameover'
        // música com o jogo parado
    }
}

function ver_fase() {
    if (carro.pontos >= 300 && fase === 2) {
        fase = 3
        setVelInimigos(13)
    } else if (carro.pontos >= 150 && fase === 1) {
        fase = 2
        setVelInimigos(9)
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
            console.log('vida: ', carro.vida)
        }
    })
}

function pontuacao() {
    inimigos.forEach(inimigo => {
        if (carro.point(inimigo)) {
            carro.pontos += 10
            inimigo.recomeca()
        }
    })
}

function desenhaHUD() {
    des.fillStyle = 'rgba(0,0,0,0.45)'
    des.fillRect(0, 0, 1200, 55)

    for (let i = 0; i < carro.vida; i++) {
        des.drawImage(imgCoracao, 20 + i * 38, 8, 32, 32)
    }

    t1.des_text('Pontos: ' + carro.pontos, 980, 38, 'yellow', 'bold 26px Arial')
    fase_txt.des_text('Fase: ' + fase, 565, 38, 'white', 'bold 26px Arial')
}

function desenhaMenu() {
    bg.desenha()

    des.fillStyle = 'rgba(0,0,0,0.65)'
    des.beginPath()
    des.roundRect(300, 160, 600, 360, 24)
    des.fill()

    des.fillStyle = '#ffffff'
    des.font = 'bold 64px Arial'
    des.textAlign = 'center'
    des.fillText('  SKI RUSH', 600, 260)

    des.font = '22px Arial'
    des.fillStyle = '#cccccc'
    des.fillText('Use ↑ ↓ ou W / S para mover', 600, 320)
    des.fillText('Desvie dos obstáculos e ganhe pontos!', 600, 358)

    des.fillStyle = '#FFD700'
    des.font = 'bold 28px Arial'
    des.fillText('[ ENTER ] para jogar', 600, 430)

    des.textAlign = 'left'
}

function desenhaGameOver() {
    des.fillStyle = 'rgba(0,0,0,0.7)'
    des.fillRect(0, 0, 1200, 700)

    des.textAlign = 'center'
    des.fillStyle = '#ff4444'
    des.font = 'bold 80px Arial'
    des.fillText('GAME OVER', 600, 280)

    des.fillStyle = 'white'
    des.font = 'bold 32px Arial'
    des.fillText('Pontuação Final: ' + carro.pontos, 600, 350)

    des.fillStyle = '#AAAAAA'
    des.font = '22px Arial'
    des.fillText('Fase alcançada: ' + fase, 600, 400)

    des.fillStyle = '#FFD700'
    des.font = 'bold 26px Arial'
    des.fillText('[ ENTER ] para jogar novamente', 600, 470)

    des.textAlign = 'left'
}

function desenhaVitoria() {
    des.fillStyle = 'rgba(0,0,0,0.7)'
    des.fillRect(0, 0, 1200, 700)

    des.textAlign = 'center'
    des.fillStyle = '#FFD700'
    des.font = 'bold 74px Arial'
    des.fillText('🏆 VOCÊ VENCEU! 🏆', 600, 260)

    des.fillStyle = 'white'
    des.font = 'bold 32px Arial'
    des.fillText('Pontuação Final: ' + carro.pontos, 600, 340)

    des.fillStyle = '#88FF88'
    des.font = '24px Arial'
    des.fillText('Parabéns! Você completou as 3 fases!', 600, 395)

    des.fillStyle = '#FFD700'
    des.font = 'bold 26px Arial'
    des.fillText('[ ENTER ] para jogar novamente', 600, 460)

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
        desenhaHUD()
        return
    }

    if (estado === 'gameover') {
        bg.desenha()
        inimigos.forEach(i => i.des_carro())
        carro.des_carro()
        desenhaHUD()
        desenhaGameOver()
        return
    }

    if (estado === 'vitoria') {
        bg.desenha()
        inimigos.forEach(i => i.des_carro())
        carro.des_carro()
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