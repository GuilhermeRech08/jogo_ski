class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }

    des_carro(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }

    des_quad(){
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h, this.a)
    }

    des_carro_manual() {
        des.beginPath()
        des.lineWidth = '5'
        des.strokeStyle = 'rgb(186, 186, 186)'
        des.fillStyle = 'darkorange'
        des.rect(this.x + 60, this.y-50, 10, 10) 
        des.stroke()
        des.fill()
    
        des.beginPath()
        des.rect(this.x + 60, this.y-10, 10, 10)
        des.stroke()
        des.fill()
    
        des.beginPath()
        des.rect(this.x + 10, this.y-52, 10, 10)
        des.stroke()
        des.fill()
    
        des.beginPath()
        des.rect(this.x + 10, this.y-8, 10, 10)
        des.stroke()
        des.fill()
    
        des.beginPath()
        des.moveTo(this.x, this.y - 50) 
        des.lineTo(this.x, this.y)
        des.lineTo(this.x + 50, this.y - 10)
        des.lineTo(this.x + 50, this.y - 40)
        des.closePath()
        des.lineWidth = '5'
        des.strokeStyle = 'rgb(186, 186, 186)'
        des.fillStyle = this.a
        des.stroke()
        des.fill()
    
        des.beginPath()
        des.rect(this.x + 50, this.y - 40, 20, 30)
        des.stroke()
        des.fill()
    
        des.beginPath()
        des.rect(this.x + 70, this.y - 50, 10, 50)
        des.stroke()
        des.fill()
    }    
}

class Carro extends Obj{

    dir = 0
    vida = 5
    pontos = 0
    frame = 1
    tempo = 0
    invencivel = 0

    mov_car(){
        this.y += this.dir
        if(this.y < 62){
            this.y = 62
        }else if(this.y > 700 - this.h){
            this.y = 700 - this.h
        }
        if(this.invencivel > 0){
            this.invencivel--
        }
    }

    des_carro(){
        if(this.invencivel > 0 && Math.floor(this.invencivel / 5) % 2 === 0){
            return
        }
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }

    colid(objeto){
        if(this.invencivel > 0) return false
        if((this.x < objeto.x + objeto.w)&&
          (this.x + this.w > objeto.x)&&
          (this.y < objeto.y + objeto.h)&&
          (this.y + this.h > objeto.y)){
            return true
        }else{
            return false
        }
    }

    point(objeto){
        if(objeto.x <= -100){
            return true
        }else{
            return false
        }
    }
}

class CarroInimigo extends Obj{

    vel = 5

    recomeca(){
        this.x = Math.floor(Math.random() * 400 + 1300)
        this.y = Math.floor(Math.random() * (638 - 62) + 62)
    }

    mov_car(){
        this.x -= this.vel
        if(this.x <= -200){            
            this.recomeca()         
        }
    }
}

class Background{
    constructor(src, largura, altura){
        this.img = new Image()
        this.img.src = src
        this.x1 = 0
        this.x2 = largura
        this.largura = largura
        this.altura = altura
        this.vel = 4
    }

    atualiza(){
        this.x1 -= this.vel
        this.x2 -= this.vel
        if(this.x1 <= -this.largura) this.x1 = this.largura
        if(this.x2 <= -this.largura) this.x2 = this.largura
    }

    desenha(){
        des.drawImage(this.img, this.x1, 0, this.largura, this.altura)
        des.drawImage(this.img, this.x2, 0, this.largura, this.altura)
    }
}

class Estrada extends Obj{
    mov_est(){
        this.x -= 6
        if(this.x < -60){
            this.x = 1300
        }        
    }
}

class Text{
    des_text(text,x,y,cor,font){
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text,x,y)
    }
}