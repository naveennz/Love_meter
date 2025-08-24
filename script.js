// navigation
const pages = ["page1","page2","page3","page4","page5"].map(id=>document.getElementById(id));
function show(n){
  pages.forEach((p,i)=>p.classList.toggle('active', i===n-1));
  window.scrollTo({top:0,behavior:"smooth"});
}

// Page1 meter animation
(function(){
  const fill = document.getElementById('fill');
  const bar = document.getElementById('bar');
  const pct = document.getElementById('pct');
  let t = 0;
  const timer = setInterval(()=>{
    t = Math.min(100, t + 2);
    const y = 400 - (t/100)*330;
    fill.setAttribute('y', y);
    bar.style.width = t + "%";
    pct.textContent = t + "%";
    if(t>=100) clearInterval(timer);
  }, 50);
  document.getElementById('go1').addEventListener('click', ()=>show(2));
})();

// Page2 evasive no
(function(){
  const arena = document.getElementById('arena');
  const no = document.getElementById('noBtn');
  const yes = document.getElementById('yesBtn');
  function moveNo(){
    const pad = 10;
    const aw = arena.clientWidth, ah = arena.clientHeight;
    const bw = no.offsetWidth, bh = no.offsetHeight;
    const x = Math.random()*(aw - bw - pad*2) + pad;
    const y = Math.random()*(ah - bh - pad*2) + pad;
    no.style.left = x + "px";
    no.style.top  = y + "px";
    no.style.transform = "translate(0,0)";
  }
  ['mouseenter','mousemove','touchstart'].forEach(ev=>{
    no.addEventListener(ev, moveNo, {passive:true});
  });
  arena.addEventListener('mousemove', (e)=>{
    const r = no.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width/2);
    const dy = e.clientY - (r.top + r.height/2);
    if (Math.hypot(dx,dy) < 120) moveNo();
  });
  yes.addEventListener('click', ()=>show(3));
  no.addEventListener('click', e=>{e.preventDefault(); moveNo();});
})();

// Page3 answers → Page4
document.querySelectorAll('#page3 [data-answer]').forEach(btn=>{
  btn.addEventListener('click', ()=>show(4));
});

// Page4 okay → Page5
document.getElementById('okayBtn').addEventListener('click', ()=>show(5));

// Page5 flip cards
(function(){
  let chosen = false;
  const grid = document.getElementById('cardGrid');
  grid.addEventListener('click', e=>{
    const card = e.target.closest('.flip');
    if(!card || chosen || card.classList.contains('flipped')) return;
    chosen = true;
    card.classList.add('flipped');
    grid.querySelectorAll('.flip').forEach(el=>{
      if(el!==card) el.classList.add('disabled');
    });
  });
})();

// restart
function resetFlow(){
  show(1);
  document.querySelectorAll('.flip').forEach(el=>{
    el.classList.remove('flipped','disabled');
  });
}
document.getElementById('restart').addEventListener('click', e=>{
  e.preventDefault(); resetFlow();
});
