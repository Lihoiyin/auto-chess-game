// GLOBAL | Constants
const mapBorders = [[100, 1400], [0, 600]]
const riverBorder1 = [[698, 826], [0, 75]]
const riverBorder2 = [[698, 826], [150, 344]]
const riverBorder3 = [[698, 826], [420, 600]]

// GLOBAL | Elements
const $map = $('#map')

// GLOBAL | Game Loop Related
const LOOP_INTERVAL = 17
let gameLoop

// GLOBAL | Minions Related
const player1sInMap = []
const player2sInMap = []
let prevGenerateTime = Date.now();
const generateCd = 2000



//Game Control
const $starter = $('#starter')
const $reStarter = $('.play-again-btn')
const $start = $('#start')
const $win = $('#win')
const $lose = $('#lose')
const $selector = $('#selector')
const optionMinions = [{name:'Warrior', cost:1}, {name:'Archer', cost:1}, {name:'Knight', cost:6}, {name:'Titan', cost:5}, {name:'Tower', cost:4}, {name:'Mage', cost:4}]
const optionMagics = [{name:'Earthquake', cost:4},{name:'Freeze', cost:9}]
let selectionId
let prevEnergyTime = Date.now();
const energyCd = 1000
let p1Energy = 0
let p2Energy = 0
const p1EnergyRate = 1
const p2EnergyRate = 3

// Minion | Add To Map
let castle1
let castle2

const generateMinion = (event) => {
  if (event.clientX <= 638 && event.clientX >= 0 && event.clientY >= 0 && event.clientY <= 600){
  switch (selectionId) {
    case 'Warrior':
      if (p1Energy >= 1){
        new Warrior(event.clientX, event.clientY, true).addToMap()
        p2Energy -= 1
        $('#energy-message').text('    ')
      }else {
        $('#energy-message').text('Not enough Energy')
      }
      break
    case 'Archer':
      if (p1Energy >= 1){
        new Archer(event.clientX, event.clientY, true).addToMap()
        p1Energy -= 1
        $('#energy-message').text('    ')
      }else {
        $('#energy-message').text('Not enough Energy')
      }
      break
    case 'Knight':
      if (p1Energy >= 6){
        new Knight(event.clientX, event.clientY, true).addToMap()
        p1Energy -= 6
        $('#energy-message').text('    ')
      }else {
        $('#energy-message').text('Not enough Energy')
      }
      break

    case 'Titan':
      if (p1Energy >= 5){
        new Titan(event.clientX, event.clientY, true).addToMap()
        p1Energy -= 5
        $('#energy-message').text('    ')
      }else {
        $('#energy-message').text('Not enough Energy')
      }
      break
    case 'Mage':
      if (p1Energy >= 4){
        new Mage(event.clientX, event.clientY, true).addToMap()
        p1Energy -= 4
        $('#energy-message').text('    ')
      }else {
        $('#energy-message').text('Not enough Energy')
      }
      break;
    case 'Tower':
      if (p1Energy >= 4){
        new Tower(event.clientX, event.clientY, true).addToMap()
        p1Energy -= 4
        $('#energy-message').text('    ')
      }else {
        $('#energy-message').text('Not enough Energy')
      }
      break;

    default:
      break;

  }

  }else{
    $('#energy-message').text('Please put army inside your area')
  }
  switch (selectionId) {
    case 'Earthquake':
      if (p1Energy >= 4){
        new Earthquake(event.clientX, event.clientY, true).active()
        p1Energy -= 4
        $('#energy-message').text('    ')
      }else {
        $('#energy-message').text('Not enough Energy')
      }
        break;
        case 'Freeze':
      if (p1Energy >= 9){
        new Freeze(event.clientX, event.clientY, true).active()
        p1Energy -= 9
        $('#energy-message').text('    ')
      }else {
        $('#energy-message').text('Not enough Energy')
      }
      break;
    default:
      break;
  }
  optionMinions.forEach(element => {
    $(`#${element.name}`).css('border', '5px solid yellow')
  })
  optionMagics.forEach(element => {
    $(`#${element.name}`).css('border', '5px solid orange')
  })
}

const select = (event) =>{
  selectionId = event.target.id
    $map.one('click', generateMinion)
    $('.option-minions').css('border', '5px solid yellow')
    $('.option-magics').css('border', '5px solid orange')
    if (!event.target.id.includes('energy') && !$(event.target).hasClass('cost') && !$(event.target).hasClass('mini-name')&&!$(event.target).hasClass('mini-img') && !event.target.id.includes('selector')){
      $(event.target).css('border', '5px solid green')
    }
}

const bindings = () => {
  $selector.on('click', select)
}

const generateSelector = ()=>{
  for (let i=0; i<optionMinions.length; i++){
    $selector.append(`<button class='option-minions' id='${optionMinions[i].name}'><div class='cost'>${optionMinions[i].cost}</div><div class='mini-img'></div><div class='mini-name'>${optionMinions[i].name}</div></button>`)
  }
  for (let j=0; j<optionMagics.length; j++){
    $selector.append(`<button class='option-magics' id='${optionMagics[j].name}'><div class='cost'>${optionMagics[j].cost}</div><div class='mini-img'></div><div class='mini-name'>${optionMagics[j].name}</div></button>`)
  }
}

const starter = () => {
  startGameLoop()
  $map.css('display', 'block')
  $('#game-board').css('display', 'none')
  $start.css('display', 'none')
  $('#selector').css('display', 'flex')
}

const reStarter = ()=> {
    player1sInMap.length = 0
    player2sInMap.length = 0
    $map.children('div').remove()
    $selector.children().remove()
    $selector.remove()
    $('#game-board').css('display', 'none')
    $win.css('display', 'none')
    $lose.css('display', 'none')
    $map.css('display', 'block')
    init()
}


const genRand = (x, y, genList) => {
    switch (genList) {
    case 'Warrior':
      if (p2Energy >= 1){
        new Warrior(x, y, false).addToMap()
        p2Energy - 1
      }
      break
    case 'Archer':
      if (p2Energy >= 1){
        new Archer(x, y, false).addToMap()
        p2Energy - 1
      }
      break
    case 'Knight':
      if (p2Energy >= 6){
        new Knight(x, y, false).addToMap()
        p2Energy - 6
      }
      break

    case 'Titan':
      if (p2Energy >= 5){
        new Titan(x, y, false).addToMap()
        p2Energy - 5
      }
      break
    case 'Mage':
      if (p2Energy >= 4){
        new Mage(x, y, false).addToMap()
        p2Energy - 4
      }
    break
    default:
      break

  }
}
  const updateEnergy = () =>{
    if (p1Energy >= 0){
    let energyBar = Math.round((p1Energy / 10) * 180)
    $('#energy-num').text(`Energy :${p1Energy}`)
    $('#energy').css('width', `${energyBar}px`)
    }
  }
const startGameLoop = () => {
  gameLoop = setInterval(() => {
    $('.magic-select').remove()
    if (prevEnergyTime + energyCd < Date.now()) {
      p1Energy += p1EnergyRate
      p2Energy += p2EnergyRate
      if(p1Energy > 10){
        p1Energy = 10
      }
      if(p2Energy > 10){
        p2Energy = 10
      }
      prevEnergyTime = Date.now()
      updateEnergy()

    }


    if (prevGenerateTime + generateCd < Date.now()) {
      let randRoad = Math.floor(Math.random() * 2)
      let ranGen = Math.floor(Math.random() * 5)
      if(randRoad === 1){
        genRand(1140, 110, optionMinions[ranGen].name)
      }else{
        genRand(1140, 490, optionMinions[ranGen].name)
      }
      prevGenerateTime = Date.now()
    }


    // P1 Pawn Movement
    for (let i = 0; i < player1sInMap.length; i++) {
      player1sInMap[i].action()
    }

    // P2 Pawn Movement
    for (let j = 0; j < player2sInMap.length; j++) {
      player2sInMap[j].action()
    }

    // Remove Dead P1 Pawn
    for (let i = player1sInMap.length - 1; i >= 0; i--) {
      if (player1sInMap[i].hp <= 0) {
        player1sInMap[i].$elem.fadeOut(500);
        player1sInMap.splice(i, 1)
      }
    }

    // Remove Dead P2 Pawn
    for (let i = player2sInMap.length - 1; i >= 0; i--) {
      if (player2sInMap[i].hp <= 0) {
        player2sInMap[i].$elem.fadeOut(500);
        player2sInMap.splice(i, 1)
      }
    }

    if (castle1.hp <= 0) {
      $map.css('display','none')
      $lose.css('display', 'flex')
      $('#game-board').css('display', 'flex')
      $reStarter.on('click', reStarter)
      $('#selector').css('display', 'none')
      clearInterval(gameLoop)
    }
    if (castle2.hp <= 0) {
      $('#game-board').css('display', 'flex')
      $win.css('display', 'flex')
      $map.css('display','none')
      $('#selector').css('display', 'none')
      $reStarter.on('click', reStarter)
      clearInterval(gameLoop)
    }

  }, LOOP_INTERVAL);
}

const init = () => {
  bindings()
  generateSelector()
  $('body').append($selector)
  $selector.append("<div id='energy-board'><p id='energy-num'></p><div id='energy'></div><p id='energy-message'>   </p></div>")
  castle1 = new Castle(100, 225, true)
  castle1.addToMap()
  castle2 = new Castle(1250, 225, false)
  castle2.addToMap()
  $map.css('display', 'none')
  $('#start').css('display', 'flex')
  $('#game-board').css('display', 'block')
  $('#start').on('click', starter)
}

class Character {
  constructor(x, y, p1Turn) {
    // HTML reference and style
    this.$elem
    this.position = { x, y }
    this.dimension = { w: 0, h: 0 }

    // Character Attributes
    this.p1Pawn = p1Turn
    this.prevAttackTime = Date.now()
    this.attackCD
    this.type
    this.attackDmg
    this.hp
    this.speed
    this.attackRadius = 1
    this.activeRange = 400
    this.initHp
    this.isFreeze = false

    if (p1Turn) {
      player1sInMap.push(this)
    } else {
      player2sInMap.push(this)
    }
  }

  getCenterPoint() {
    return {
      x: this.position.x + (this.dimension.w / 2),
      y: this.position.y + (this.dimension.h / 2)
    }
  }

  getSide() {
    const { x: thisCX } = this.getCenterPoint()
    return thisCX <= 750 ? 'Left' : 'Right'
  }

  addToMap() {
    const color = this.p1Pawn ? '1' : '2'
    this.$elem = $(`<div class='pawn'</div>`)
      .css('left', this.position.x)
      .css('top', this.position.y)
      .css('width', this.dimension.w)
      .css('height', this.dimension.h)
      .css(`background-image`, `url(${this.type + color}.png)`)
      .css(`background-size`, 'cover')
      .appendTo($map)


    $(`<div class='hp'></div>`)
          .css('position', 'absolute')
          .css('top', '-10px')
          .css('width', `${this.dimension.w}px`)
          .css('height', '3px')
          .css('background-color', 'red')
          .appendTo(this.$elem)
  }

  calDistance(enemy) {
    let enemyPawnPosition = enemy.getCenterPoint()
    let thisPawnPosition = this.getCenterPoint()

    let xLong = Math.abs(enemyPawnPosition.x - thisPawnPosition.x)
    let yLong = Math.abs(enemyPawnPosition.y - thisPawnPosition.y)

    if (xLong === 0) {
      return yLong
    } else if (yLong === 0) {
      return xLong
    } else {
      return Math.sqrt((xLong ** 2) + (yLong ** 2))
    }
  }

  detectNearestInRangeEnemy() {
    let nearestEnemy = null
    let nearestEnemyDistance = null
    const enemies = this.p1Pawn ? player2sInMap : player1sInMap

    enemies.forEach((enemy) => {
      const distance = this.calDistance(enemy)
      const { y: thisCY } = this.getCenterPoint()
      const { y: enemyCY } = enemy.getCenterPoint()

      const enemyDetected = nearestEnemyDistance === null || distance < nearestEnemyDistance
      const onTheSamePlane = this.getSide() === enemy.getSide() || (thisCY === 110 && enemyCY == 110) || (thisCY === 495 && enemyCY == 495)

      if (enemyDetected && onTheSamePlane) {
        nearestEnemyDistance = distance
        nearestEnemy = enemy
      }
    })

    return nearestEnemyDistance != null && nearestEnemyDistance < this.activeRange ? {
      enemy: nearestEnemy,
      distance: nearestEnemyDistance
    } : false
  }

  chaseOrAttackEnemy(nearestInRangeEnemy) {
    const { enemy, distance } = nearestInRangeEnemy
    if (distance <= this.attackRadius + enemy.bodyRadius) {
      if (this.prevAttackTime + this.attackCD < Date.now()) {
        if (this.type === 'Titan' && (this.type === 'Tower' || this.type === 'Castle' )){
          enemy.hp -= this.attackDmg*2
        }else{
          enemy.hp -= this.attackDmg

        }
        enemy.updateHp()
        this.prevAttackTime = Date.now()
      }
    } else {
      const { x: thisX, y: thisY } = this.position
      const { x: enemyX, y: enemyY } = enemy.position

      let newX = thisX
      let newY = thisY

      if (thisX > enemyX) newX -= this.speed
      if (thisX < enemyX) newX += this.speed
      if (thisY > enemyY) newY -= this.speed
      if (thisY < enemyY) newY += this.speed

      this.$elem.css('left', newX).css('top', newY)
      this.position = { x: newX, y: newY }
    }
  }
  updateHp(){
    if (this.hp >= 0){
    let hpBar = Math.round((this.hp / this.initHp) * this.dimension.w)

    this.$elem.children('.hp').css('width', `${hpBar}px` )
    }
  }

  checkP1Pathing() {
    const { x: thisCX, y: thisCY } = this.getCenterPoint()
    const { x: thisX, y: thisY } = this.position
    const { w: thisW, h: thisH } = this.dimension

    let newX = thisX
    let newY = thisY

    if (thisX + thisW <= 697) {
      // pawn right side vs river left side
      // Move X to position
        newX += this.speed
      if (thisX + thisW + this.speed <= 697) {
        newX += this.speed
      } else {
        newX = 697 - thisW
      }

      // Move Y to position
      if (thisCY < 300) {
        if (thisCY - this.speed > 110) {
          newY -= this.speed
        } else if (thisCY + this.speed < 110) {
          newY += this.speed
        } else {
          newY = 110 - (thisW / 2)
        }
        if (thisCY === 110 && thisX + thisW === 697) newX += this.speed
      } else {
        if (thisCY - this.speed > 495) {
          newY -= this.speed
        } else if (thisCY + this.speed < 495) {
          newY += this.speed
        } else {
          newY = 495 - (thisW / 2)
        }
        if (thisCY === 495 && thisX + thisW === 697) newX += this.speed
      }
    } else if (thisX <= 826) {
      // in river section
      newX += this.speed
    } else {
      // right side
      if (thisCX - this.speed > 1300) {
        newX -= this.speed
      } else if (thisCX + this.speed < 1300) {
        newX += this.speed
      } else {
        newX = 1300 - (thisW / 2)
      }

      if (thisCY - this.speed > 300) {
        newY -= this.speed
      } else if (thisCY + this.speed < 300) {
        newY += this.speed
      } else {
        newY = 300 - (thisH / 2)
      }
    }

    this.$elem.css('left', newX).css('top', newY)
    this.position = { x: newX, y: newY }
  }

  checkP2Pathing() {
    const { x: thisCX, y: thisCY } = this.getCenterPoint()
    const { x: thisX, y: thisY } = this.position
    const { w: thisW, h: thisH } = this.dimension

    let newX = thisX
    let newY = thisY

    if (thisX >= 827) {
      // pawn left side vs right right side
      // Move X to position
      if (thisX - this.speed >= 827) {
        newX -= this.speed
      } else {
        newX = 827
      }

      // Move Y to position
      if (thisCY < 300) {
        if (thisCY - this.speed > 110) {
          newY -= this.speed
        } else if (thisCY + this.speed < 110) {
          newY += this.speed
        } else {
          newY = 110 - (thisW / 2)
        }
        if (thisCY === 110 && thisX === 827) newX -= this.speed
      } else {
        if (thisCY - this.speed > 495) {
          newY -= this.speed
        } else if (thisCY + this.speed < 495) {
          newY += this.speed
        } else {
          newY = 495 - (thisW / 2)
        }

        if (thisCY === 495 && thisX === 827) newX -= this.speed
      }
    } else if (thisX + thisW >= 698) {
      // in river section
      newX -= this.speed
    } else {
      // right side
      if (thisCX - this.speed > 170) {
        newX -= this.speed
      } else if (thisCX + this.speed < 170) {
        newX += this.speed
      } else {
        newX = 200 - (thisW / 2)
      }

      if (thisCY - this.speed > 300) {
        newY -= this.speed
      } else if (thisCY + this.speed < 300) {
        newY += this.speed
      } else {
        newY = 300 - (thisH / 2)
      }
    }

    this.$elem.css('left', newX).css('top', newY)
    this.position = { x: newX, y: newY }
  }

  action() {
    if(!this.isFreeze){
      this.$elem.css('background-color', this.color)
      const nearestInRangeEnemy = this.detectNearestInRangeEnemy()

      if (nearestInRangeEnemy) {
        this.chaseOrAttackEnemy(nearestInRangeEnemy)
      } else {
        if (this.p1Pawn) {
          this.checkP1Pathing()
        } else {
          this.checkP2Pathing()
        }
      }
    }
  }
}

class Warrior extends Character {
  constructor(x, y, p1Turn) {
    super(x, y, p1Turn)

    // HTML reference and style
    this.dimension = { w: 20, h: 20 }

    // Character Attributes
    this.attackCD = 1000
    this.type = 'warrior'
    this.attackDmg = 50
    this.hp = 700
    this.speed = 0.5
    this.bodyRadius = 15
    this.attackRadius = 10
    this.activeRange = 200
    this.initHp = 500
  }
}

class Archer extends Character {
  constructor(x, y, p1Turn) {
    super(x, y, p1Turn)

    // HTML reference and style
    this.dimension = { w: 20, h: 20 }

    // Character Attributes
    this.attackCD = 1000
    this.type = 'archer'
    this.attackDmg = 80
    this.hp = 100
    this.speed = 0.5
    this.bodyRadius = 15
    this.attackRadius = 100
    this.activeRange = 200
    this.initHp = 100
  }
}

class Castle extends Character {
  constructor(x, y, p1Turn) {
    super(x, y, p1Turn)

    // HTML reference and style
    this.dimension = { w: 150, h: 150 }

    // Character Attributes
    this.type = 'castle'
    this.attackCD = 1000
    this.attackDmg = 20
    this.hp = 8000
    this.speed = 0.5
    this.bodyRadius = 80
    this.attackRadius = 100
    this.activeRange = 200
    this.initHp = 8000
  }

  action(){

  }

}
class Knight extends Character {
  constructor(x, y, p1Turn) {
    super(x, y, p1Turn)

    // HTML reference and style
    this.dimension = { w: 30, h: 30 }

    // Character Attributes
    this.type = 'knight'
    this.attackCD = 500
    this.attackDmg = 100
    this.hp = 1200
    this.speed = 1.5
    this.bodyRadius = 20
    this.attackRadius = 15
    this.activeRange = 200
    this.initHp = 1200
  }
}

class Titan extends Character {
  constructor(x, y, p1Turn) {
    super(x, y, p1Turn)

    // HTML reference and style
    this.dimension = { w: 45, h: 45 }

    // Character Attributes
    this.type = 'titan'
    this.attackCD = 2000
    this.attackDmg = 200
    this.hp = 2000
    this.speed = 0.5
    this.bodyRadius = 28
    this.attackRadius = 22
    this.activeRange = 200
    this.initHp = 2000
  }
}

class Mage extends Character {
  constructor(x, y, p1Turn) {
    super(x, y, p1Turn)

    // HTML reference and style
    this.dimension = { w: 20, h: 20 }

    // Character Attributes
    this.type = 'mage'
    this.attackCD = 2000
    this.attackDmg = 500
    this.hp = 200
    this.speed = 0.5
    this.bodyRadius = 15
    this.attackRadius = 300
    this.activeRange = 300
    this.initHp = 200
  }
}
class Tower extends Character {
  constructor(x, y, p1Turn) {
    super(x, y, p1Turn)

    // HTML reference and style
    this.dimension = { w: 60, h: 60 }

    // Character Attributes
    this.type = 'tower'
    this.attackCD = 3000
    this.attackDmg = 600
    this.hp = 50
    this.speed = 0.5
    this.bodyRadius = 35
    this.attackRadius = 450
    this.activeRange = 450
    this.initHp = 50
  }
  action(){
    if(!this.isFreeze){
      this.$elem.css('background-color', this.color)
      const nearestInRangeEnemy = this.detectNearestInRangeEnemy()

      if (nearestInRangeEnemy.enemy) {
        const { enemy, distance } = nearestInRangeEnemy
        if (distance <= this.attackRadius + enemy.bodyRadius) {
          if (this.prevAttackTime + this.attackCD < Date.now()) {
            enemy.hp -= this.attackDmg
            enemy.updateHp()

            this.prevAttackTime = Date.now()
          }
        }
      }
    }
  }
}

class Magic {
  constructor(x, y, p1Turn) {
    this.x = x
    this.y = y
    this.p1Pawn = p1Turn
    this.activeRange = 150
  }


  calDistance(enemy) {

    let enemyPawnPosition = enemy.getCenterPoint()

    let xLong = Math.abs(enemyPawnPosition.x - this.x)
    let yLong = Math.abs(enemyPawnPosition.y - this.y)

    if (xLong === 0) {
      return yLong
    } else if (yLong === 0) {
      return xLong
    } else {
      return Math.sqrt((xLong ** 2) + (yLong ** 2))
    }
  }

  detectBeAffectedEnemy() {
    const enemies = this.p1Pawn ? player2sInMap : player1sInMap
    let beAffectedEnemy = []
    enemies.forEach((enemy) => {
      const distance = this.calDistance(enemy)
      if (distance <= this.activeRange){
        beAffectedEnemy.push(enemy)
      }
    })

    return beAffectedEnemy != null ? beAffectedEnemy : false
  }

}

class Earthquake extends Magic {
  constructor(x, y, p1Turn) {
    super(x, y, p1Turn)
    this.activeRange = 150
    this.dmg = 200
    this.type = 'earthquake'
  }

  active(){
    const beAffectedEnemy = this.detectBeAffectedEnemy()
    if (beAffectedEnemy){
      beAffectedEnemy.forEach(enemy => {
        enemy.hp -= 200
        enemy.updateHp()
      }
      )

    }
  }
}

class Freeze extends Magic {
  constructor(x, y, p1Turn) {
    super(x, y, p1Turn)
    this.activeRange = 150
    this.type = 'freeze'
  }

  active(){
    const beAffectedEnemy = this.detectBeAffectedEnemy()
    if (beAffectedEnemy){
      beAffectedEnemy.forEach(enemy => enemy.isFreeze = true)
    }
    setTimeout(() => {
      beAffectedEnemy.forEach(enemy => enemy.isFreeze = false)
    }, 8000);
  }
}

init()
