let untyped = '';
let typed = '';
let score ='';
let typecount ='';

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typenumber = document.getElementById('typecount');

const textLists = [
    'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// random text
const createText = () => {
  // crear
  typed = '';
  typedfield.textContent = typed;
  // random
    let random = Math.floor(Math.random()* textLists.length);
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

// key
const keyPress = e => {
  if (e.key !== untyped.substring(0,1)) {
    wrap.classList.add('mistyped');
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  score++;
  typecount++;
  typenumber.textContent = typecount;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

// new text
if(untyped === '') {
  createText();
 }
};

// rank
const rankCheck = score => {
  let text = '';
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// finish
const gameOver = id => {
  clearInterval(id);
  wrap.textContent = 'タイムアップ！';
  setTimeout(() => {
  const result = confirm(rankCheck(score));
  if(result == true) {
    window.location.reload();
  }
},10);
};

// timer
const timer = () => {
  let time = count.textContent;
  const id = setInterval(() => {
    time--;
    count.textContent = time;
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

start.addEventListener('click', () => {
  timer();
  createText();
  start.style.display = 'none';
  document.addEventListener('keypress', keyPress);
});
untypedfield.textContent = 'スタートボタンで開始';