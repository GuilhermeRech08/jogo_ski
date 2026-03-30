# 🎿 SKI RUSH

<p align="center">
  <img src="./img/background.png" width="700"/>
</p>

<p align="center">
  <b>Jogo 2D de ski multiplayer feito com JavaScript e HTML5 Canvas</b><br>
  Desvie de obstáculos, sobreviva e avance pelas fases ❄️
</p>

---

## 🚀 Sobre o jogo

**SKI RUSH** é um jogo 2D desenvolvido em JavaScript puro utilizando o **Canvas**, onde dois jogadores competem (ou cooperam) para sobreviver o maior tempo possível enquanto desviam de obstáculos.

O jogo possui sistema de fases progressivas, aumento de dificuldade e mecânicas como **invencibilidade temporária**, **vidas** e **pontuação dinâmica**.

---

## 🎮 Gameplay

* 2 jogadores simultâneos na mesma tela
* Obstáculos aparecem continuamente
* A velocidade aumenta conforme o progresso
* Sistema de fases com mudança de cenário
* O jogo termina quando ambos os jogadores perdem todas as vidas

---

## 🕹️ Controles

| Jogador | Teclas                     |
| ------- | -------------------------- |
| 🟥 P1   | `W` (subir) / `S` (descer) |
| 🟦 P2   | `↑` (subir) / `↓` (descer) |

---

## ❤️ Sistema de vidas

* Cada jogador começa com **5 vidas**
* Ao colidir com um obstáculo:

  * perde 1 vida
  * ganha **invencibilidade temporária**
* O HUD exibe as vidas com ícones de coração

---

## 🧠 Mecânicas do jogo

### ⚡ Invencibilidade

Após sofrer dano, o jogador fica temporariamente invulnerável (efeito visual piscando).

### 🧱 Colisão

Sistema de colisão baseado em bounding box (AABB).

### 🏁 Pontuação

* +10 pontos ao ultrapassar obstáculos
* Pontuação compartilhada entre os jogadores

### 🎯 Fases

| Fase       | Pontos necessários | Mudanças                                |
| ---------- | ------------------ | --------------------------------------- |
| 1          | 0                  | Velocidade base                         |
| 2          | 150                | Aumento de velocidade + novo background |
| 3          | 300                | Alta velocidade + novo cenário          |
| 🏆 Vitória | 500                | Fim do jogo                             |

---

## 🧱 Arquitetura do código

O jogo foi estruturado utilizando **programação orientada a objetos**:

### Classes principais:

* `Obj` → classe base para renderização
* `Carro` / `Carro2` → jogadores
* `CarroInimigo` → obstáculos
* `Background` → scroll infinito do cenário
* `Text` → renderização de textos

### Estados do jogo:

```id="k91d2a"
menu → jogando → gameover / vitoria
```

---

## 🛠️ Tecnologias utilizadas

<p>
  <img src="https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript"/>
  <img src="https://img.shields.io/badge/HTML5-Canvas-orange?style=for-the-badge&logo=html5"/>
</p>

---

## ▶️ Como executar

```bash id="m82l3p"
git clone https://github.com/GuilhermeRech08/jogo_ski.git
cd jogo_ski
```

Abra o arquivo:

```id="n73q4r"
index.html
```

no navegador.

---

## 📂 Estrutura do projeto

```id="p64s5t"
jogo_ski/
│
├── img/              # Sprites e backgrounds
├── index.html        # Entrada do jogo
├── script.js         # Lógica principal
└── style.css         # Estilo (se aplicável)
```

---

## 🖥️ Interface do jogo

* Menu inicial com instruções
* HUD com:

  * vidas dos jogadores ❤️
  * pontuação
  * fase atual
* Tela de:

  * Game Over
  * Vitória

---

## 🤝 Contribuição

Contribuições são bem-vindas!

```bash id="q55u6v"
git checkout -b feature/nova-feature
git commit -m "feat: nova feature"
git push origin feature/nova-feature
```

Abra um Pull Request 🚀

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

**Guilherme Rech**
🔗 https://github.com/GuilhermeRech08

---

<p align="center">
  Feito com 💻, lógica e um pouco de caos ❄️
</p>
