/* ---------- 배치 상수 (PDF 간격 반영) ---------- */
const bandH = 320;          // 레벨 기본 높이 (밴드 높이와 간격을 정확히 맞춤)
const leftBase = 140;       // 좌측 여백
const colW = 260;           // 열 폭(조금 넓힘)
const gapX = 40;            // 열 간격
const gapY = 40;             // 행 간격 (밴드 간격 완전 제거)

/* ---------- 데이터: PDF 구조 반영 ---------- */
/* L0: Home, PFS, Shop, My Page, Accessories
   L1: Smartphones, Tablets, Book&Laptops, Watches, Buds, Galaxy Accessories, Sub Menu
   L2: 각 허브 하위(All/S/Z/A/Compare/Acc...), Sub Menu 항목
   L3: PD 레벨(Flagship/Featured/Standard)
   L4: Buying/Cart */
const nodesMX = [
  // L0
  {id:'home', title:'Home', level:0, col:0, row:0, type:'main', status:'ok', ds:'v2.0', cluster:'global'},
  {id:'pfs',  title:'PFS',  level:0, col:1, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'home'},
  {id:'shop', title:'Shop', level:0, col:2, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'home'},
  {id:'mypage', title:'My Page', level:0, col:3, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'home'},
  {id:'top-acc', title:'Accessories<br>(Top)', level:0, col:4, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'home'},

  // L1 허브
  {id:'smartphones', title:'Smartphones', level:1, col:1, row:0, type:'category', status:'ok', ds:'v2.0', cluster:'smartphones', parent:'home'},
  {id:'tablets',     title:'Tablets',     level:1, col:3, row:0, type:'category', status:'ok', ds:'v2.0', cluster:'tablets', parent:'home'},
  {id:'book',        title:'Book &<br>Laptops', level:1, col:5, row:0, type:'category', status:'ok', ds:'v2.0', cluster:'book', parent:'home'},
  {id:'watch',       title:'Watches',     level:1, col:7, row:0, type:'category', status:'warn', ds:'v1.5', cluster:'watch', parent:'home'},
  {id:'buds',        title:'Buds',        level:1, col:9, row:0, type:'category', status:'ok', ds:'v2.0', cluster:'buds', parent:'home'},
  {id:'acc',         title:'Galaxy<br>Accessories', level:1, col:11, row:0, type:'category', status:'ok', ds:'v2.0', cluster:'acc', parent:'home'},
  {id:'submenu',     title:'Sub Menu',    level:1, col:13, row:0, type:'category', status:'ok', ds:'v2.0', cluster:'sub', parent:'home'},

  // L2 스마트폰
  {id:'sp-all',  title:'All',       level:2,col:1,row:0,parent:'smartphones',cluster:'smartphones',status:'ok',ds:'v2.0'},
  {id:'sp-s',    title:'Galaxy S',  level:2,col:2,row:0,parent:'smartphones',cluster:'smartphones',status:'ok',ds:'v2.0'},
  {id:'sp-z',    title:'Galaxy Z',  level:2,col:3,row:0,parent:'smartphones',cluster:'smartphones',status:'ok',ds:'v2.0'},
  {id:'sp-a',    title:'Galaxy A',  level:2,col:4,row:0,parent:'smartphones',cluster:'smartphones',status:'warn',ds:'v1.0'},
  {id:'sp-comp', title:'Compare',   level:2,col:5,row:0,parent:'smartphones',cluster:'smartphones',status:'ok',ds:'v2.0'},
  {id:'sp-acc',  title:'Accessories',level:2,col:6,row:0,parent:'smartphones',cluster:'smartphones',status:'ok',ds:'v2.0'},

  // L2 태블릿
  {id:'tb-all', title:'All',       level:2,col:3,row:1,parent:'tablets',cluster:'tablets',status:'ok',ds:'v2.0'},
  {id:'tb-s',   title:'Tab S',     level:2,col:4,row:1,parent:'tablets',cluster:'tablets',status:'ok',ds:'v2.0'},
  {id:'tb-a',   title:'Tab A',     level:2,col:5,row:1,parent:'tablets',cluster:'tablets',status:'warn',ds:'v1.5'},
  {id:'tb-comp',title:'Compare',   level:2,col:6,row:1,parent:'tablets',cluster:'tablets',status:'ok',ds:'v2.0'},
  {id:'tb-acc', title:'Accessories',level:2,col:7,row:1,parent:'tablets',cluster:'tablets',status:'ok',ds:'v2.0'},

  // L2 워치
  {id:'wt-all',    title:'All',          level:2,col:7,row:0,parent:'watch',cluster:'watch',status:'ok',ds:'v2.0'},
  {id:'wt-ultra',  title:'Watch Ultra',  level:2,col:8,row:0,parent:'watch',cluster:'watch',status:'ok',ds:'v2.0'},
  {id:'wt-watch',  title:'Watch',        level:2,col:9,row:0,parent:'watch',cluster:'watch',status:'ok',ds:'v2.0'},
  {id:'wt-classic',title:'Watch<br>Classic',level:2,col:10,row:0,parent:'watch',cluster:'watch',status:'ok',ds:'v2.0'},
  {id:'wt-comp',   title:'Compare',      level:2,col:11,row:0,parent:'watch',cluster:'watch',status:'ok',ds:'v2.0'},
  {id:'wt-acc',    title:'Accessories',  level:2,col:12,row:0,parent:'watch',cluster:'watch',status:'ok',ds:'v2.0'},

  // L2 버즈
  {id:'bd-all',  title:'All',     level:2,col:9,row:1,parent:'buds',cluster:'buds',status:'ok',ds:'v2.0'},
  {id:'bd-pro',  title:'Buds3 Pro',level:2,col:10,row:1,parent:'buds',cluster:'buds',status:'ok',ds:'v2.0'},
  {id:'bd-3',    title:'Buds3',   level:2,col:11,row:1,parent:'buds',cluster:'buds',status:'ok',ds:'v2.0'},
  {id:'bd-fe',   title:'Buds FE', level:2,col:12,row:1,parent:'buds',cluster:'buds',status:'ok',ds:'v2.0'},
  {id:'bd-comp', title:'Compare', level:2,col:13,row:1,parent:'buds',cluster:'buds',status:'ok',ds:'v2.0'},

  // L2 북/랩탑
  {id:'bk-all',  title:'All',        level:2,col:5,row:0,parent:'book',cluster:'book',status:'ok',ds:'v2.0'},
  {id:'bk-book', title:'Book',       level:2,col:6,row:0,parent:'book',cluster:'book',status:'ok',ds:'v2.0'},
  {id:'bk-360',  title:'Book 360',   level:2,col:7,row:0,parent:'book',cluster:'book',status:'ok',ds:'v2.0'},
  {id:'bk-chr',  title:'Chromebook', level:2,col:8,row:0,parent:'book',cluster:'book',status:'ok',ds:'v2.0'},
  {id:'bk-gpc',  title:'Copilot+PC', level:2,col:9,row:0,parent:'book',cluster:'book',status:'ok',ds:'v2.0'},
  {id:'bk-comp', title:'Compare',    level:2,col:10,row:0,parent:'book',cluster:'book',status:'ok',ds:'v2.0'},

  // L2 서브메뉴 묶음
  {id:'sm-discover', title:'Discover Mobile', level:2, col:13, row:0, parent:'submenu', cluster:'sub', status:'ok', ds:'v2.0'},
  {id:'sm-galaxyai', title:'Galaxy AI',       level:2, col:14, row:0, parent:'submenu', cluster:'sub', status:'ok', ds:'v2.0'},
  {id:'sm-oneui',    title:'One UI',          level:2, col:15, row:0, parent:'submenu', cluster:'sub', status:'ok', ds:'v2.0'},
  {id:'sm-health',   title:'Samsung Health',  level:2, col:16, row:0, parent:'submenu', cluster:'sub', status:'ok', ds:'v2.0'},
  {id:'sm-care',     title:'Samsung Care+',   level:2, col:17, row:0, parent:'submenu', cluster:'sub', status:'ok', ds:'v2.0'},
  {id:'sm-why',      title:'Why Galaxy',      level:2, col:18, row:0, parent:'submenu', cluster:'sub', status:'ok', ds:'v2.0'},
  {id:'sm-switch',   title:'Switch to Galaxy',level:2, col:19, row:0, parent:'submenu', cluster:'sub', status:'ok', ds:'v2.0'},
  {id:'sm-trade',    title:'Mobile Trade-in', level:2, col:20, row:0, parent:'submenu', cluster:'sub', status:'ok', ds:'v2.0'},

  // L3 PD 레벨 (주요만)
  {id:'pd-s-flag', title:'Flagship PD (S)',   level:3,col:2,row:0,parent:'sp-s',cluster:'smartphones',status:'ok',ds:'v2.0'},
  {id:'pd-z-feat', title:'Featured PD (Z)',   level:3,col:3,row:0,parent:'sp-z',cluster:'smartphones',status:'ok',ds:'v2.0'},
  {id:'pd-a-std',  title:'Standard PD (A)',   level:3,col:4,row:0,parent:'sp-a',cluster:'smartphones',status:'warn',ds:'v1.0'},
  {id:'pd-tab-flag',title:'Flagship PD (Tab S)',level:3,col:4,row:1,parent:'tb-s',cluster:'tablets',status:'ok',ds:'v2.0'},
  {id:'pd-watch-feat',title:'Featured PD (Watch)',level:3,col:8,row:0,parent:'wt-ultra',cluster:'watch',status:'ok',ds:'v2.0'},
  {id:'pd-buds-std', title:'Standard PD (Buds)',  level:3,col:11,row:1,parent:'bd-3',cluster:'buds',status:'ok',ds:'v2.0'},
  {id:'pd-book-feat',title:'Featured PD (Book)',  level:3,col:6,row:0,parent:'bk-book',cluster:'book',status:'ok',ds:'v2.0'},

  // L4 Buying/Cart
  {id:'buy-flag-s',  title:'Flagship Buying PD (S)', level:4,col:2,row:0,parent:'pd-s-flag',cluster:'smartphones',status:'ok',ds:'v2.0'},
  {id:'buy-simple-a',title:'Simple Buying PD (A)',   level:4,col:4,row:0,parent:'pd-a-std',cluster:'smartphones',status:'warn',ds:'v1.0'},
  {id:'buy-tab',     title:'Buying PD (Tab)',        level:4,col:4,row:1,parent:'pd-tab-flag',cluster:'tablets',status:'ok',ds:'v2.0'},
  {id:'buy-watch',   title:'Simple PD (Watch)',      level:4,col:8,row:0,parent:'pd-watch-feat',cluster:'watch',status:'ok',ds:'v2.0'},
     {id:'cart',        title:'Cart page',              level:4,col:5,row:1,parent:'buy-flag-s',cluster:'global',status:'ok',ds:'v2.0'},
];

// CEJ 시스템맵 데이터 (2번째 이미지 기반)
const nodesCEJ = [
  // L0: Home, PFS, PCD, PF, PD, Cart, Checkout
  {id:'cej-home', title:'Home', level:0, col:0, row:0, type:'main', status:'ok', ds:'v2.0', cluster:'global'},
  {id:'cej-pfs', title:'PFS', level:0, col:1, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'cej-home'},
  {id:'cej-pcd', title:'PCD', level:0, col:2, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'cej-home'},
  {id:'cej-pf', title:'PF', level:0, col:3, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'cej-home'},
  {id:'cej-pd', title:'PD', level:0, col:4, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'cej-home'},
  {id:'cej-cart', title:'Cart', level:0, col:5, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'cej-home'},
  {id:'cej-checkout', title:'Checkout', level:0, col:6, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'cej-home'},
  
  // PF - Compare (분기)
  {id:'cej-pf-compare', title:'PF - Compare', level:1, col:3, row:1, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'cej-pf'},
  
  // Flagship PD
  {id:'cej-flagship-pd', title:'Flagship PD', level:1, col:4, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'cej-pd'},
  
  // Flagship Buying PD
  {id:'cej-flagship-buying', title:'Flagship Buying PD', level:2, col:4, row:0, type:'page', status:'ok', ds:'v2.0', cluster:'global', parent:'cej-flagship-pd'},
];

// 현재 표시 데이터 세트 (기본: MX)
let nodes = [...nodesMX];
let isCEJMode = false; // CEJ(Customer Journey) 모드 여부

/* ---------- 엘리먼트 ---------- */
const stage = document.getElementById('stage');
const bands = document.getElementById('bands');
const linksLayer = document.getElementById('linksLayer');
const listTbody = document.querySelector('#table tbody');
const btnFull = document.getElementById('btnFull');
const detail = document.getElementById('detail');
const originalDetailParent = detail.parentElement;
const bottomArea = document.getElementById('bottomArea');
const originalBottomAreaParent = bottomArea.parentElement;
// 줌 컨트롤 원위치 복원을 위한 참조
const zoomControls = document.querySelector('.zoom-controls');
const originalZoomControlsParent = zoomControls ? zoomControls.parentElement : null;

/* 좌표 계산: 레벨/순서 기반 자동 배치 */
function xy(n){
  const levelIndex = n.level || 0;
  
  // CEJ 뷰인 경우 수평 타임라인 형태로 배치
  if (isCEJMode) {
  const inLevel = nodes.filter(x=>x.level===levelIndex);
  inLevel.sort((a,b)=>{
    const ac = (typeof a.col==='number')?a.col: Number.MAX_SAFE_INTEGER;
    const bc = (typeof b.col==='number')?b.col: Number.MAX_SAFE_INTEGER;
    if(ac!==bc) return ac-bc;
    return String(a.id).localeCompare(String(b.id));
  });
  const indexInLevel = inLevel.findIndex(x=>x.id===n.id);
    
    // CEJ 뷰에서는 수평으로 배치하고 레벨별로 세로 간격 조정
    const baseLeft = 140;
    const nodeWidth = 180; // CEJ 뷰에서는 노드를 조금 더 넓게
    const gap = 80; // CEJ 뷰에서는 간격을 더 넓게
    const cejBandH = 280; // CEJ 뷰에서는 레벨 간격을 늘림 (노드 겹침 방지)
    
  return {
      x: baseLeft + indexInLevel * (nodeWidth + gap),
      y: 120 + levelIndex * cejBandH // 타임라인 높이(40px) + 여백(80px) 추가 (타임라인과 노드 겹침 방지)
    };
  }
  
  // L3, L4 노드의 경우 부모 노드 위치를 고려하여 배치
  if(levelIndex >= 3 && n.parent) {
    const parentNode = nodes.find(x => x.id === n.parent);
    if(parentNode) {
      const parentPos = xy(parentNode);
      const siblings = nodes.filter(x => x.parent === n.parent && x.level === levelIndex);
      const siblingIndex = siblings.findIndex(x => x.id === n.id);
      
      // 부모 노드 아래에 수직으로 정렬하되, 형제 노드들 간에 간격 조정
      const nodeWidth = 150;
      const gap = 60; // L3, L4 노드 간 간격
      
             // cart 페이지는 buying PD 노드들 옆에 배치
       if (n.id === 'cart') {
         const buyingNodes = nodes.filter(x => x.level === 4 && x.id !== 'cart');
         if (buyingNodes.length > 0) {
           const maxBuyingX = Math.max(...buyingNodes.map(x => {
             const pos = xy(x);
             return pos.x;
           }));
           return {
             x: maxBuyingX + nodeWidth + gap,
             y: 40 + levelIndex * bandH
           };
         }
       }
      
      return {
        x: parentPos.x + (siblingIndex * (nodeWidth + gap)),
        y: 40 + levelIndex * bandH
      };
    }
  }
  
  // L0, L1, L2 노드의 경우 기존 로직 사용 (CEJ가 아니면)
  const inLevel = nodes.filter(x=>x.level===levelIndex);
  inLevel.sort((a,b)=>{
    const ac = (typeof a.col==='number')?a.col: Number.MAX_SAFE_INTEGER;
    const bc = (typeof b.col==='number')?b.col: Number.MAX_SAFE_INTEGER;
    if(ac!==bc) return ac-bc;
    return String(a.id).localeCompare(String(b.id));
  });
  const indexInLevel = inLevel.findIndex(x=>x.id===n.id);
  
  // 더 안정적인 초기 위치 계산
  const baseLeft = 140; // 기본 좌측 여백
  const nodeWidth = 150; // 노드 기본 폭 (줄임)
  const gap = 60; // 노드 간 간격
  
  return {
    x: baseLeft + indexInLevel * (nodeWidth + gap),
    y: 40 + levelIndex * bandH
  };
}

/* 밴드 동적 생성/업데이트(노드 실제 위치에 맞춰 높이 자동 조절) */
function updateBands(){
  bands.innerHTML = '';
  
  // CEJ 뷰: 레벨 밴드 숨기고 타임라인(스텝 바) 생성
  if (isCEJMode) {
    stage.classList.add('cej');
    const labels = ['Home page','PFS','PCD','PF','PD','Cart','Checkout'];
    const positions = labels.map((_, i)=> 140 + i * 260); // 좌측 시작 140, 스텝 간격 260px (노드와 맞춤)

    // 트랙
    const track = document.createElement('div');
    track.className = 'timeline-track';
    bands.appendChild(track);

    // 스텝 + 라벨
    positions.forEach((x, i)=>{
      const dot = document.createElement('div');
      dot.className = 'timeline-step';
      dot.style.left = (x - 6) + 'px'; // 12px 원 정렬
      bands.appendChild(dot);

      const lab = document.createElement('div');
      lab.className = 'timeline-label';
      lab.style.left = x + 'px';
      lab.textContent = labels[i];
      bands.appendChild(lab);
    });

    return; // 레벨 밴드 생성 스킵
  } else {
    stage.classList.remove('cej');
  }
  
  const levels = [0,1,2,3,4];
  
  // 각 레벨별로 노드들의 위치를 계산하여 밴드 생성
  levels.forEach(lv=>{
    const els = [...stage.querySelectorAll(`.node[data-level="${lv}"]`)]
                  .filter(e=>e.style.display!=='none');
    if(!els.length) return;
    
    // 고정 배치: 밴드 높이는 bandH, top은 lv*bandH
    const bandTop = lv * bandH;
    const bandHeightPx = bandH;

    const band = document.createElement('div');
    band.className = 'level-band';
    band.style.left = '0px';
    band.style.width = '100%';
    band.style.top = bandTop+'px';
    band.style.height = bandHeightPx+'px';
    
    const label = document.createElement('span');
    label.className = 'level-label';
    label.innerHTML = `L${lv}<br>${['Home/Global','카테고리 허브','제품군/세부','PD 상위','Buying/Cart'][lv]||''}`;
    band.appendChild(label);
    bands.appendChild(band);
  });
}

/* 렌더 */
function paint(){
  // 초기화
  stage.querySelectorAll('.node').forEach(e=>e.remove());
  linksLayer.innerHTML='';

  // zoom-container 확인 및 생성
  let zoomContainer = stage.querySelector('.zoom-container');
  if (!zoomContainer) {
    zoomContainer = document.createElement('div');
    zoomContainer.className = 'zoom-container';
    zoomContainer.style.position = 'absolute';
    zoomContainer.style.top = '0';
    zoomContainer.style.left = '0';
    zoomContainer.style.width = '100%';
    zoomContainer.style.height = '100%';
    zoomContainer.style.transformOrigin = 'top left';
    zoomContainer.style.background = 'radial-gradient(circle at 24px 24px, rgba(20,40,160,.03) 0 2px, transparent 2px 100%) 0 0/48px 48px';
    stage.appendChild(zoomContainer);
  }
  
  // bands와 linksLayer를 zoom-container로 이동
  if (bands.parentNode !== zoomContainer) {
    zoomContainer.appendChild(bands);
  }
  if (linksLayer.parentNode !== zoomContainer) {
    zoomContainer.appendChild(linksLayer);
  }

  // 노드 생성 (레벨별로 순서 조정)
  const clusterOrder = ['smartphones','tablets','book','watch','buds','acc','sub','global'];
  
  // L0, L1, L2 노드들을 먼저 생성
  const upperLevelNodes = nodes.filter(n => n.level < 3).sort((a,b)=>{
    if(a.level!==b.level) return a.level-b.level;
    const ai = clusterOrder.indexOf(a.cluster);
    const bi = clusterOrder.indexOf(b.cluster);
    if(ai!==bi) return ai-bi;
    return String(a.id).localeCompare(String(b.id));
  });
  
  // L3, L4 노드들을 부모 순서대로 정렬하여 생성
  const lowerLevelNodes = nodes.filter(n => n.level >= 3).sort((a,b)=>{
    if(a.level!==b.level) return a.level-b.level;
    // 같은 부모 내에서 순서 정렬
    if(a.parent === b.parent) {
      return String(a.id).localeCompare(String(b.id));
    }
    // 부모 순서로 정렬
    const aParent = nodes.find(p => p.id === a.parent);
    const bParent = nodes.find(p => p.id === b.parent);
    if(aParent && bParent) {
      const ai = clusterOrder.indexOf(aParent.cluster);
      const bi = clusterOrder.indexOf(bParent.cluster);
      if(ai!==bi) return ai-bi;
      return String(aParent.id).localeCompare(String(bParent.id));
    }
    return String(a.id).localeCompare(String(b.id));
  });
  
  // 저장된 위치 불러오기
  let savedPositions = {};
  try {
    const saved = localStorage.getItem('nodePositions');
    if(saved) {
      savedPositions = JSON.parse(saved);
    }
  } catch(err) {
    console.warn('저장된 위치 불러오기 실패:', err);
  }

  // 모든 노드를 순서대로 생성
  [...upperLevelNodes, ...lowerLevelNodes].forEach(n=>{
    const pos = xy(n);
    const el = document.createElement('div');
    el.className = 'node' + (n.type==='category'?' category':'') + (n.type==='main'?' main':'');
    
    // 저장된 위치가 있으면 사용, 없으면 기본 위치 사용
    if(savedPositions[n.id]) {
      el.style.left = savedPositions[n.id].left + 'px';
      el.style.top = savedPositions[n.id].top + 'px';
    } else {
      el.style.left = pos.x+'px';
      el.style.top = pos.y+'px';
    }
    
    el.dataset.id=n.id; el.dataset.level=n.level; el.dataset.cluster=n.cluster; el.title=n.title;
    // 아이콘 제거: 타이틀만 표시
    el.innerHTML = `
        <div class="title">${n.title}</div>
        <div class="badges">
          <span class="b ${n.ds?.startsWith('v2')?'v2':''}">${n.ds||'v—'}</span>
          <span class="b ${n.status==='ok'?'ok':n.status==='warn'?'warn':'err'}">${n.status==='ok'?'정상':n.status==='warn'?'업데이트':'확인'}</span>
        </div>
      <span class="tn">${generateRandomWireframe()}</span>`;
    
    // 저장된 tn 요소들 적용
    const tnEl = el.querySelector('.tn');
    applySavedTnElements(n.id, tnEl);
    el.addEventListener('click',()=>openDetail(n));
    makeDraggable(el, n);
    el.addEventListener('dblclick',()=>openTnEdit(n));
    zoomContainer.appendChild(el);
  });

    // 같은 레벨 내 겹침 해소 (매우 관대하게 - 수동 조정된 노드는 건드리지 않음)
  const MAX_ITERS = 5; // 반복 횟수 줄임
  for(let t=0;t<MAX_ITERS;t++){
    let moved=false;
    const cards=[...stage.querySelectorAll('.node')];
    for(let i=0;i<cards.length;i++){
      for(let j=i+1;j<cards.length;j++){
        const a=cards[i], b=cards[j];
        if(a.dataset.level!==b.dataset.level) continue;
        
        // 저장된 위치가 있는 노드는 겹침 해소에서 제외
        const aHasSavedPos = savedPositions[a.dataset.id];
        const bHasSavedPos = savedPositions[b.dataset.id];
        if(aHasSavedPos || bHasSavedPos) continue;
        
        const ra=a.getBoundingClientRect(), rb=b.getBoundingClientRect(), rs=stage.getBoundingClientRect();
        const A={x1:ra.left-rs.left, y1:ra.top-rs.top, x2:ra.right-rs.left, y2:ra.bottom-rs.top};
        const B={x1:rb.left-rs.left, y1:rb.top-rs.top, x2:rb.right-rs.left, y2:rb.bottom-rs.top};
        
        // 겹침 판단을 더 관대하게 (좌우로는 겹쳐도 괜찮음)
        const horizontalOverlap = !(A.x2+20 < B.x1 || B.x2+20 < A.x1);
        const verticalOverlap = !(A.y2+20 < B.y1 || B.y2+20 < A.y1);
        
        // 수직으로만 겹칠 때만 조정 (수평 겹침은 허용)
        if(horizontalOverlap && verticalOverlap){
          const shift = 80; // 간격 줄임
          (parseFloat(a.style.left) <= parseFloat(b.style.left))
            ? b.style.top = (parseFloat(b.style.top)+shift)+'px'
            : a.style.top = (parseFloat(a.style.top)+shift)+'px';
          moved=true;
        }
      }
    }
    if(!moved) break;
  }

  // 수동 조정 모드에서는 자동 최적화 비활성화
  // optimizeL1Spacing();
  
  // 내부 영역 크기 계산 및 레이어 확장
  const bottoms = [...stage.querySelectorAll('.node')].map(n=>n.offsetTop + n.offsetHeight);
  const rights = [...stage.querySelectorAll('.node')].map(n=>n.offsetLeft + n.offsetWidth);
  const maxBottom = Math.max(...bottoms, 1200);
  const maxRight = Math.max(...rights, stage.clientWidth);
  const innerH = Math.max(maxBottom + 300, stage.clientHeight); // 스테이지 높이보다 작지 않도록
  const innerW = Math.max(maxRight + 200, stage.clientWidth + 500); // 최소 500px 추가 여백
  // 스크롤 영역 변수 및 레이어 크기 반영
  stage.style.setProperty('--inner-h', innerH+'px');
  linksLayer.setAttribute('height', innerH);
  linksLayer.setAttribute('width', innerW);
  linksLayer.style.height = innerH+'px';
  linksLayer.style.width = innerW+'px';
  bands.style.height = innerH+'px';
  bands.style.width = innerW+'px';

  // 커넥터 (직각 경로)
  nodes.filter(n=>n.parent).forEach(n=>{
    const c = stage.querySelector(`.node[data-id="${n.id}"]`);
    const p = stage.querySelector(`.node[data-id="${n.parent}"]`);
    if(!c||!p) return;
    
    // 노드의 실제 위치 계산 (style.left, style.top 사용)
    const childLeft = parseFloat(c.style.left) || 0;
    const childTop = parseFloat(c.style.top) || 0;
    const parentLeft = parseFloat(p.style.left) || 0;
    const parentTop = parseFloat(p.style.top) || 0;
    
    // 노드 크기
    const childWidth = c.offsetWidth;
    const parentWidth = p.offsetWidth;
    const parentHeight = p.offsetHeight;
    
    // CEJ 뷰인 경우 수평 연결선 사용
    if (nodes === nodesCEJ) {
      // 연결점 계산 (수평 연결)
      const x1 = parentLeft + parentWidth; // 부모 노드 우측
      const y1 = parentTop + (parentHeight / 2); // 부모 노드 중앙
      const x2 = childLeft; // 자식 노드 좌측
      const y2 = childTop + (childWidth / 2); // 자식 노드 중앙
      
      // 수평 직선 경로
      const d = `M ${x1} ${y1} H ${x2}`;
      linksLayer.insertAdjacentHTML('beforeend', `<path d="${d}" fill="none" stroke="#cfd8e3" stroke-width="2"/>`);
    } else {
      // 기존 수직 연결선 로직
      const x1 = parentLeft + (parentWidth / 2); // 부모 노드 하단 중앙
      const y1 = parentTop + parentHeight; // 부모 노드 하단
      const x2 = childLeft + (childWidth / 2); // 자식 노드 상단 중앙
      const y2 = childTop; // 자식 노드 상단
      
      // 중간점 계산 (부모와 자식 사이의 중간)
      const midY = y1 + (y2 - y1) / 2;
      
      // 경로 생성 (직각 경로)
    const d = `M ${x1} ${y1} V ${midY} H ${x2} V ${y2}`;
    linksLayer.insertAdjacentHTML('beforeend', `<path d="${d}" fill="none" stroke="#cfd8e3" stroke-width="2"/>`);
    }
  });

  // 내부 높이 확보 (변수 유지)
  stage.style.setProperty('--inner-h', innerH+'px');

  // 밴드 업데이트
  updateBands();

  // 목록 뷰 데이터
  if(listTbody){
    listTbody.innerHTML = nodes.map(n=>`
      <tr>
        <td>L${n.level}</td><td>${n.title}</td><td>${n.cluster}</td>
        <td>${n.status==='ok'?'<span class="b ok">정상</span>':n.status==='warn'?'<span class="b warn">업데이트</span>':'<span class="b err">확인</span>'}</td>
        <td><span class="b ${n.ds?.startsWith('v2')?'v2':''}">${n.ds||''}</span></td>
        <td>A/B/C 에이전시</td>
      </tr>`).join('');
  }
}
paint();

/* ---------- 검색/필터/뷰 ---------- */
// 랜덤 와이어프레임 생성
function generateRandomWireframe(){
  const patterns = [
    // 기본 바 패턴
    '<span class="bar b1"></span><span class="bar b2"></span><span class="bar b3"></span><span class="kv"></span>',
    // 원형 요소 포함
    '<span class="bar b1"></span><span class="circle" style="top:20px;left:12px;"></span><span class="bar b2"></span><span class="kv"></span>',
    // 직사각형 요소 포함
    '<span class="bar b1"></span><span class="rect" style="top:24px;left:8px;"></span><span class="bar b3"></span><span class="kv"></span>',
    // 다양한 바 길이
    '<span class="bar b1"></span><span class="bar b4"></span><span class="bar b2"></span><span class="kv"></span>',
    // 원형과 직사각형 조합
    '<span class="circle" style="top:8px;left:12px;"></span><span class="bar b2"></span><span class="rect" style="top:32px;left:8px;"></span><span class="kv"></span>',
    // 바만 사용
    '<span class="bar b1"></span><span class="bar b3"></span><span class="bar b4"></span><span class="bar b2"></span>',
    // 키 비주얼 영역 강조
    '<span class="bar b1"></span><span class="bar b2"></span><span class="kv" style="height:20px;top:48px;"></span>',
    // 원형 요소들
    '<span class="circle" style="top:8px;left:8px;"></span><span class="circle" style="top:8px;right:8px;"></span><span class="bar b2"></span><span class="kv"></span>'
  ];
  
  // 랜덤하게 패턴 선택
  const randomIndex = Math.floor(Math.random() * patterns.length);
  return patterns[randomIndex];
}

// 수평/수직 드래그앤드롭 (수동 위치 조정 가능, 경계 제한 포함, 실시간 연결선)
function makeDraggable(el, node){
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  const onMouseDown = (e) => {
    if (e.button !== 0) return; // 좌클릭만 허용
    e.preventDefault();
    e.stopPropagation();

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseFloat(el.style.left) || 0;
    startTop  = parseFloat(el.style.top)  || 0;

    el.style.cursor = 'grabbing';
    el.style.zIndex = '10';

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, { once: true });
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newLeft = startLeft + deltaX;
    let newTop  = startTop  + deltaY;

    // 스테이지의 실제 스크롤 가능한 영역 크기 사용
    const stageScrollWidth  = stage.scrollWidth;
    const stageScrollHeight = stage.scrollHeight;
    const nodeWidth  = el.offsetWidth;
    const nodeHeight = el.offsetHeight;

    const maxLeft = stageScrollWidth  - nodeWidth  - 50; // 우측 여백 50
    const maxTop  = stageScrollHeight - nodeHeight - 50; // 하단 여백 50

    // 경계 제한 (약간의 음수 허용으로 가장자리로 스크롤 유도)
    newLeft = Math.max(-100, Math.min(newLeft, maxLeft));
    newTop  = Math.max(-100, Math.min(newTop,  maxTop));

    el.style.left = newLeft + 'px';
    el.style.top  = newTop  + 'px';

    // 연결선만 재그리기
    redrawLinksOnly();
  };

  const onMouseUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    el.style.cursor = 'grab';
    el.style.zIndex = '2';

    document.removeEventListener('mousemove', onMouseMove);
  };

  el.addEventListener('mousedown', onMouseDown);
  el.style.cursor = 'grab';
}

function redrawLinksOnly(){
  linksLayer.innerHTML='';
  nodes.filter(n=>n.parent).forEach(n=>{
    const c = stage.querySelector(`.node[data-id="${n.id}"]`);
    const p = stage.querySelector(`.node[data-id="${n.parent}"]`);
    if(!c||!p) return;
    
    // 노드의 실제 위치 계산 (style.left, style.top 사용)
    const childLeft = parseFloat(c.style.left) || 0;
    const childTop = parseFloat(c.style.top) || 0;
    const parentLeft = parseFloat(p.style.left) || 0;
    const parentTop = parseFloat(p.style.top) || 0;
    
    // 노드 크기
    const childWidth = c.offsetWidth;
    const childHeight = c.offsetHeight;
    const parentWidth = p.offsetWidth;
    const parentHeight = p.offsetHeight;
    
    // CEJ 뷰인 경우 수평 연결선 사용
    if (nodes === nodesCEJ) {
      // 연결점 계산 (수평 연결)
      const x1 = parentLeft + parentWidth; // 부모 노드 우측
      const y1 = parentTop + (parentHeight / 2); // 부모 노드 중앙
      const x2 = childLeft; // 자식 노드 좌측
      const y2 = childTop + (childHeight / 2); // 자식 노드 중앙
      
      // 수평 직선 경로
      const d = `M ${x1} ${y1} H ${x2}`;
      linksLayer.insertAdjacentHTML('beforeend', `<path d="${d}" fill="none" stroke="#cfd8e3" stroke-width="2"/>`);
    } else {
      // 기존 수직 연결선 로직
      const x1 = parentLeft + (parentWidth / 2); // 부모 노드 하단 중앙
      const y1 = parentTop + parentHeight; // 부모 노드 하단
      const x2 = childLeft + (childWidth / 2); // 자식 노드 상단 중앙
      const y2 = childTop; // 자식 노드 상단
      
      // 중간점 계산 (부모와 자식 사이의 중간)
      const midY = y1 + (y2 - y1) / 2;
      
      // 경로 생성 (직각 경로)
    const d = `M ${x1} ${y1} V ${midY} H ${x2} V ${y2}`;
    linksLayer.insertAdjacentHTML('beforeend', `<path d="${d}" fill="none" stroke="#cfd8e3" stroke-width="2"/>`);
    }
  });
}

function equalizeSpacingWithinLevel(level){
  const items = [...stage.querySelectorAll(`.node[data-level="${level}"]`)];
  if(items.length<=1) return;
  
  // L3, L4 노드의 경우 부모 노드 기준으로 재배치
  if(level >= 3) {
    // 부모별로 그룹화
    const parentGroups = {};
    items.forEach(el => {
      const nodeId = el.dataset.id;
      const node = nodes.find(n => n.id === nodeId);
      if(node && node.parent) {
        if(!parentGroups[node.parent]) {
          parentGroups[node.parent] = [];
        }
        parentGroups[node.parent].push(el);
      }
    });
    
    // 각 부모 그룹별로 처리
    Object.keys(parentGroups).forEach(parentId => {
      const groupItems = parentGroups[parentId];
      const parentEl = stage.querySelector(`.node[data-id="${parentId}"]`);
      
      if(parentEl && groupItems.length > 0) {
        const parentLeft = parseFloat(parentEl.style.left) || 0;
        const nodeWidth = 260;
        const gap = 80; // L3, L4 노드 간 간격을 더 넓게
        
        groupItems.forEach((el, idx) => {
          const newLeft = parentLeft + (idx * (nodeWidth + gap));
          el.style.left = Math.round(newLeft)+'px';
        });
      }
    });
    return;
  }
  
  // L0, L1, L2 노드의 경우 기존 로직 사용
  // 좌표 순으로 정렬
  items.sort((a,b)=>parseFloat(a.style.left)-parseFloat(b.style.left));
  
  // 최소 간격 설정 (더 보수적인 접근)
  const minGap = 60;
  const nodeWidth = 260; // 노드 기본 폭
  
  // 현재 위치를 기반으로 최소 간격만 보장하는 방식으로 수정
  let currentLeft = parseFloat(items[0].style.left) || 0;
  
  items.forEach((el, idx)=>{
    if(idx === 0) {
      // 첫 번째 노드는 현재 위치 유지
      el.style.left = Math.round(currentLeft)+'px';
    } else {
      // 이전 노드의 오른쪽 끝 + 최소 간격
      const prevEl = items[idx-1];
      const prevRight = parseFloat(prevEl.style.left) + prevEl.offsetWidth;
      const newLeft = Math.max(prevRight + minGap, parseFloat(el.style.left));
      el.style.left = Math.round(newLeft)+'px';
    }
  });
}

function redrawAllOverlays(){
  redrawLinksOnly();
  updateBands();
}

// L1 노드들 간격을 L2 하위 노드 분포에 따라 최적화하여 linksLayer 겹침 최소화
function optimizeL1Spacing(){
  const l1Nodes = nodes.filter(n=>n.level===1);
  if(l1Nodes.length < 2) return;
  
  // L1 노드들을 x 좌표 순으로 정렬
  l1Nodes.sort((a,b)=>{
    const aEl = stage.querySelector(`.node[data-id="${a.id}"]`);
    const bEl = stage.querySelector(`.node[data-id="${b.id}"]`);
    if(!aEl || !bEl) return 0;
    return parseFloat(aEl.style.left) - parseFloat(bEl.style.left);
  });
  
  // 각 L1 노드의 L2 하위 노드 범위 계산
  const l1Ranges = l1Nodes.map(l1Node => {
    const children = nodes.filter(n=>n.parent===l1Node.id && n.level===2);
    if(children.length === 0) return { min: 0, max: 0, width: 0 };
    
    const rects = children.map(c=>{
      const el = stage.querySelector(`.node[data-id="${c.id}"]`);
      return el? {left: el.offsetLeft, right: el.offsetLeft + el.offsetWidth} : null;
    }).filter(Boolean);
    
    if(rects.length === 0) return { min: 0, max: 0, width: 0 };
    
    const min = Math.min(...rects.map(r=>r.left));
    const max = Math.max(...rects.map(r=>r.right));
    return { min, max, width: max - min };
  });
  
  // L1 노드들 간격 조정
  for(let i = 0; i < l1Nodes.length - 1; i++){
    const currentL1 = l1Nodes[i];
    const nextL1 = l1Nodes[i + 1];
    const currentRange = l1Ranges[i];
    const nextRange = l1Ranges[i + 1];
    
    const currentEl = stage.querySelector(`.node[data-id="${currentL1.id}"]`);
    const nextEl = stage.querySelector(`.node[data-id="${nextL1.id}"]`);
    
    if(!currentEl || !nextEl) continue;
    
    // 현재 L1의 오른쪽 경계와 다음 L1의 왼쪽 경계 사이 간격 계산
    const currentRight = currentRange.max;
    const nextLeft = nextRange.min;
    
    // 최소 간격 보장 (노드 폭 + 여백)
    const minGap = 80; // L1 노드 폭 + 여백
    const currentGap = nextLeft - currentRight;
    
    if(currentGap < minGap){
      // 간격이 부족하면 다음 L1을 오른쪽으로 이동
      const neededShift = minGap - currentGap;
      const currentNextLeft = parseFloat(nextEl.style.left);
      nextEl.style.left = (currentNextLeft + neededShift) + 'px';
      
      // 다음 L1의 L2 하위 노드들도 함께 이동
      const nextChildren = nodes.filter(n=>n.parent===nextL1.id && n.level===2);
      nextChildren.forEach(child => {
        const childEl = stage.querySelector(`.node[data-id="${child.id}"]`);
        if(childEl){
          const currentLeft = parseFloat(childEl.style.left);
          childEl.style.left = (currentLeft + neededShift) + 'px';
        }
      });
    }
  }
}
function applyFilters(){
  stage.querySelectorAll('.node').forEach(n=>{
    const cluster = n.dataset.cluster;
    const level = n.dataset.level;
    const clusterOk = activeClusters.has('all') || activeClusters.has(cluster);
    const levelOk = activeLevels.has('all') || activeLevels.has(level);
    n.style.display = (clusterOk && levelOk)? 'grid':'none';
  });
  linksLayer.innerHTML='';
  updateBands();
}
document.querySelectorAll('.nav-item').forEach(i=>{
  i.addEventListener('click',()=>{
    const page = i.dataset.page;
    if (page === 'sitemap') return; // 현재 페이지면 무시
    
    // 다른 페이지로 이동
    if (page === 'dashboard') {
      window.location.href = 'dashboard.html';
    } else if (page === 'analytics') {
      window.location.href = 'analytics.html';
    } else if (page === 'content') {
      window.location.href = 'content.html';
    }
  });
});
// 사이드바 토글
const btnSidebarToggle = document.getElementById('btnSidebarToggle');
if(btnSidebarToggle){
  btnSidebarToggle.addEventListener('click',()=>{
    const container = document.querySelector('.container');
    container.classList.toggle('sidebar-collapsed');
    const icon = btnSidebarToggle.querySelector('i');
    icon.className = container.classList.contains('sidebar-collapsed')
      ? 'fa-solid fa-angles-right'
      : 'fa-solid fa-angles-left';
  });
}
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');

// 검색 자동완성 기능
function showSearchSuggestions(query) {
  if (!query.trim()) {
    searchSuggestions.style.display = 'none';
    return;
  }

  const suggestions = nodes.filter(node => 
    node.title.toLowerCase().includes(query.toLowerCase()) ||
    node.id.toLowerCase().includes(query.toLowerCase()) ||
    node.cluster.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8); // 최대 8개 제안

  if (suggestions.length === 0) {
    searchSuggestions.style.display = 'none';
    return;
  }

  searchSuggestions.innerHTML = suggestions.map(node => {
    const icon = node.type === 'main' ? 'fa-house' : 
                 node.type === 'category' ? 'fa-layer-group' : 'fa-file';
    const statusClass = node.status === 'ok' ? 'ok' : 
                       node.status === 'warn' ? 'warn' : 'err';
    const statusText = node.status === 'ok' ? '정상' : 
                      node.status === 'warn' ? '업데이트' : '확인';
    
    return `
      <div class="search-suggestion-item" data-node-id="${node.id}">
        <i class="fa-solid ${icon} icon"></i>
        <div class="title">${node.title}</div>
        <div class="cluster">${node.cluster}</div>
        <div class="status ${statusClass}">${statusText}</div>
      </div>
    `;
  }).join('');

  searchSuggestions.style.display = 'block';
}

// 검색 제안 클릭 이벤트
searchSuggestions.addEventListener('click', (e) => {
  const item = e.target.closest('.search-suggestion-item');
  if (item) {
    const nodeId = item.dataset.nodeId;
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      searchInput.value = node.title;
      searchSuggestions.style.display = 'none';
      
      // 해당 노드로 스크롤 및 하이라이트
      const nodeEl = stage.querySelector(`[data-id="${nodeId}"]`);
      if (nodeEl) {
        nodeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        nodeEl.style.outline = '3px solid var(--primary)';
        nodeEl.style.outlineOffset = '2px';
        setTimeout(() => {
          nodeEl.style.outline = 'none';
        }, 3000);
      }
    }
  }
});

// 검색 입력 이벤트
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  
  // 자동완성 표시
  showSearchSuggestions(q);
  
  // 기존 검색 하이라이트
  stage.querySelectorAll('.node').forEach(n => {
    const match = n.textContent.toLowerCase().includes(q);
    n.style.opacity = q ? (match ? '1' : '.22') : '1';
    n.style.outline = match ? '2px solid var(--accent)' : 'none';
  });
});

// 검색창 외부 클릭 시 자동완성 숨김
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-box')) {
    searchSuggestions.style.display = 'none';
  }
});

// 검색창 포커스 시 자동완성 표시
searchInput.addEventListener('focus', () => {
  if (searchInput.value.trim()) {
    showSearchSuggestions(searchInput.value);
  }
});
// 레벨 다중 선택 필터
const levelPills = document.querySelectorAll('.pill[data-level]');
let activeLevels = new Set(['all']);
levelPills.forEach(p=>{
  p.addEventListener('click',()=>{
    const lv = p.dataset.level;
    if(lv==='all'){
      activeLevels = new Set(['all']);
      levelPills.forEach(x=>x.classList.remove('multi','on'));
      p.classList.add('on');
    }else{
      if(activeLevels.has('all')){ activeLevels.delete('all'); document.querySelector('.pill[data-level="all"]').classList.remove('on'); }
      if(activeLevels.has(lv)){ activeLevels.delete(lv); p.classList.remove('multi'); }
      else{ activeLevels.add(lv); p.classList.add('multi'); }
      if(activeLevels.size===0){ activeLevels.add('all'); document.querySelector('.pill[data-level="all"]').classList.add('on'); }
    }
    applyFilters();
  });
});
// 카테고리 다중 선택 필터
const clusterPills = document.querySelectorAll('.pill[data-cluster]');
let activeClusters = new Set(['all']);
clusterPills.forEach(p=>{
  p.addEventListener('click',()=>{
    const c = p.dataset.cluster;
    if(c==='all'){
      activeClusters = new Set(['all']);
      clusterPills.forEach(x=>x.classList.remove('multi','on'));
      p.classList.add('on');
      // 전체 카테고리 선택 시 다른 카테고리 pills 비활성화
      disableOtherCategoryPills();
    }else{
      if(activeClusters.has('all')){ activeClusters.delete('all'); document.querySelector('.pill[data-cluster="all"]').classList.remove('on'); }
      if(activeClusters.has(c)){
        activeClusters.delete(c); p.classList.remove('multi');
      }else{
        activeClusters.add(c); p.classList.add('multi');
      }
      if(activeClusters.size===0){ activeClusters.add('all'); document.querySelector('.pill[data-cluster="all"]').classList.add('on'); }
    }
    // 필터 적용
    applyFilters();
  });
});

// 전체 카테고리 선택 시 다른 카테고리 pills 비활성화
function disableOtherCategoryPills(){
  const allPill = document.getElementById('allCategoryPill');
  if(!allPill) return;
  
  let nextElement = allPill.nextElementSibling;
  while(nextElement && nextElement.classList.contains('pill')){
    nextElement.style.pointerEvents = 'none';
    nextElement.style.opacity = '0.5';
    nextElement = nextElement.nextElementSibling;
  }
}
const listView = document.getElementById('listView');
document.querySelectorAll('.viewbtn').forEach(v=>{
  v.addEventListener('click',()=>{
    document.querySelectorAll('.viewbtn').forEach(x=>x.classList.remove('on')); v.classList.add('on');
    const mode = v.dataset.view;
    if(mode==='tree'){
      stage.style.display='block'; 
      listView.style.display='none'; 
      nodes = [...nodesMX];
      isCEJMode = false;
      paint(); 
    }
    if(mode==='list'){
      stage.style.display='none'; 
      listView.style.display='block'; 
    }

    if(mode==='cej'){
      stage.style.display='block'; 
      listView.style.display='none'; 
      nodes = [...nodesCEJ];
      isCEJMode = true;
      paint(); 
    }
  });
});

// 저장/초기화 기능
document.getElementById('btnSave').addEventListener('click',()=>{
  const nodePositions = {};
  stage.querySelectorAll('.node').forEach(el => {
    const nodeId = el.dataset.id;
    nodePositions[nodeId] = {
      left: parseFloat(el.style.left) || 0,
      top: parseFloat(el.style.top) || 0
    };
  });
  
  try {
    localStorage.setItem('nodePositions', JSON.stringify(nodePositions));
    alert('노드 위치가 저장되었습니다.');
  } catch(err) {
    console.error('저장 실패:', err);
    alert('저장에 실패했습니다.');
  }
});

document.getElementById('btnReset').addEventListener('click',()=>{
  if(confirm('모든 노드 위치를 초기화하시겠습니까?')) {
    localStorage.removeItem('nodePositions');
    location.reload();
  }
});

// 줌 기능 (브라우저 줌 방식)
let currentZoom = 1;
const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 2];

function updateZoom(zoom) {
  currentZoom = Math.max(0.5, Math.min(2, zoom));
  
  // stage 내부 컨테이너 생성 (줌 적용 대상)
  let zoomContainer = stage.querySelector('.zoom-container');
  if (!zoomContainer) {
    zoomContainer = document.createElement('div');
    zoomContainer.className = 'zoom-container';
    zoomContainer.style.position = 'absolute';
    zoomContainer.style.top = '0';
    zoomContainer.style.left = '0';
    zoomContainer.style.width = '100%';
    zoomContainer.style.height = '100%';
    zoomContainer.style.transformOrigin = 'top left';
    zoomContainer.style.background = 'radial-gradient(circle at 24px 24px, rgba(20,40,160,.03) 0 2px, transparent 2px 100%) 0 0/48px 48px';
    
    // stage 내부 요소들을 zoom-container로 이동
    const bands = stage.querySelector('#bands');
    const linksLayer = stage.querySelector('#linksLayer');
    const nodes = stage.querySelectorAll('.node');
    
    if (bands) zoomContainer.appendChild(bands);
    if (linksLayer) zoomContainer.appendChild(linksLayer);
    nodes.forEach(node => zoomContainer.appendChild(node));
    
    stage.appendChild(zoomContainer);
  }
  
  // zoom-container에만 줌 적용
  zoomContainer.style.transform = `scale(${currentZoom})`;
  
  // 줌 레벨 표시 업데이트
  document.getElementById('zoomLevel').textContent = Math.round(currentZoom * 100) + '%';
}

// 줌 인 버튼
document.getElementById('btnZoomIn').addEventListener('click', () => {
  const currentIndex = zoomLevels.indexOf(currentZoom);
  const nextIndex = Math.min(currentIndex + 1, zoomLevels.length - 1);
  updateZoom(zoomLevels[nextIndex]);
});

// 줌 아웃 버튼
document.getElementById('btnZoomOut').addEventListener('click', () => {
  const currentIndex = zoomLevels.indexOf(currentZoom);
  const nextIndex = Math.max(currentIndex - 1, 0);
  updateZoom(zoomLevels[nextIndex]);
});

// 줌 레벨 클릭 시 드롭다운 (간단한 구현)
document.getElementById('zoomLevel').addEventListener('click', () => {
  const zoom = prompt('줌 레벨을 입력하세요 (50-200):', Math.round(currentZoom * 100));
  if (zoom && !isNaN(zoom)) {
    const zoomValue = parseInt(zoom) / 100;
    updateZoom(zoomValue);
  }
});



document.getElementById('btnReload').addEventListener('click',()=>location.reload());



/* ---------- 상세 패널(배지/와이어프레임) ---------- */
const compsByCluster = {
  smartphones:['C004 Category HScroll','FT02 Feature Grid','PD01 Product Cards','BN01 Key Visual'],
  tablets:['C004 Category HScroll','FT02 Feature Grid','PD03 Spec Table','BN01 Key Visual'],
  watch:['C007 Filter Chips','PD01 Product Cards','FT05 Comparison','BN02 KV Carousel'],
  buds:['PD01 Product Cards','FT03 Benefit Icons','C010 Reviews'],
  book:['FT02 Feature Grid','PD01 Product Cards','C012 Tech Specs'],
  acc:['ACC01 Accessory Grid','ACC02 Compatibility'],
  sub:['LP01 Hero','LP02 Icon Grid'],
  global:['GN01 GNB','FT01 Hero','C013 Footer']
};
function renderWfThumb(cluster='smartphones'){
  const wrap = document.getElementById('wfThumb');
  // 로컬 스토리지에 저장된 사용자 이미지 우선 적용
  const saved = localStorage.getItem('wfThumbImage');
  if(saved){
    wrap.innerHTML = `<img src="${saved}" alt="uploaded"/>`;
    return;
  }
  wrap.innerHTML = `
    <div class="wf-h1"></div>
    <div class="wf-h2"></div>
    <div class="wf-hero"></div>
    <div class="wf-grid">
      <div class="card"><div class="img"></div><div class="bar s"></div><div class="bar xs"></div></div>
      <div class="card"><div class="img"></div><div class="bar s"></div><div class="bar xs"></div></div>
      <div class="card"><div class="img"></div><div class="bar s"></div><div class="bar xs"></div></div>
    </div>`;
}
function openDetail(n){
  document.getElementById('d-title').textContent = n.title;
  document.getElementById('d-id').textContent = n.id;
  document.getElementById('d-url').innerHTML = `<a href="#" onclick="return false;">https://www.samsung.com/kr/mx/${n.id}</a>`;
  document.getElementById('d-level').textContent = 'L'+n.level;
  document.getElementById('d-cluster').textContent = n.cluster;
  document.getElementById('d-ds').innerHTML = `<span class="status-badge ${n.ds?.startsWith('v2')?'sb-ok':'sb-warn'}">${n.ds}</span>`;
  const st = n.status==='ok'?'sb-ok':n.status==='warn'?'sb-warn':'sb-err';
  document.getElementById('d-status').innerHTML = `<span class="status-badge ${st}">${n.status==='ok'?'정상':n.status==='warn'?'업데이트 필요':'관리자 확인'}</span>`;
  document.getElementById('d-owner').textContent = 'MX 사업부 · A/B/C 에이전시';
  // 컴포넌트 배지
  const bag = document.getElementById('compBadges');
  bag.innerHTML = (compsByCluster[n.cluster]||compsByCluster.global).map(t=>`<span class="chip">${t}</span>`).join('');
  // 상하위 관계
  const rel = document.getElementById('relNav');
  const parent = nodes.find(x=>x.id===n.parent);
  const children = nodes.filter(x=>x.parent===n.id);
  rel.innerHTML = `
    ${parent?`<a class="chip" href="#" data-go="${parent.id}">▲ ${parent.title}</a>`:''}
    ${children.map(c=>`<a class=\"chip\" href=\"#\" data-go=\"${c.id}\">▼ ${c.title}</a>`).join(' ')}
  `;
  rel.querySelectorAll('a[data-go]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      e.preventDefault();
      const id = a.getAttribute('data-go');
      const target = nodes.find(x=>x.id===id);
      if(target){ openDetail(target); }
    });
  });
  // 와이어프레임 썸네일
  renderWfThumb(n.cluster);
  

  
  detail.classList.add('open');
}
document.getElementById('btnClose').addEventListener('click',()=>detail.classList.remove('open'));





// wf-thumb 이미지 업로드/초기화/저장
function triggerWfUpload(ev){
  if(ev) ev.stopPropagation();
  const inp = document.getElementById('wfInput');
  inp.value = '';
  inp.click();
}
document.addEventListener('change',(e)=>{
  if(e.target && e.target.id==='wfInput' && e.target.files && e.target.files[0]){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = ()=>{
      const wrap = document.getElementById('wfThumb');
      const dataUrl = reader.result;
      wrap.innerHTML = `<img src="${dataUrl}" alt="uploaded"/>`;
      try{ localStorage.setItem('wfThumbImage', dataUrl); }catch(err){ console.warn('이미지 저장 실패', err); }
    };
    reader.readAsDataURL(file);
  }
});
// Version Info 토글 → visualization-area 다크 테마 전환
const verToggle = document.getElementById('verToggle');
const vizArea = document.querySelector('.visualization-area');
if(verToggle){
  verToggle.addEventListener('change',()=>{
    const pills = document.getElementById('verPills');
    if(verToggle.checked){ vizArea.classList.add('dark'); applyDsTheming(); pills.classList.remove('disabled'); }
    else{ vizArea.classList.remove('dark'); clearDsTheming(); pills.classList.add('disabled'); }
  });
  // 초기 상태: off → 비활성화
  document.getElementById('verPills').classList.add('disabled');
}

// DS 기반 노드 배경색 적용/해제 (다크 테마 전용)
function applyDsTheming(){
  if(!document.querySelector('.visualization-area').classList.contains('dark')) return;
  stage.querySelectorAll('.node').forEach(el=>{
    const id = el.dataset.id;
    const node = nodes.find(n=>n.id===id);
    const ds = node?.ds || '';
    let bg = '#0f1a36';
    if(/^v2/i.test(ds)) bg = '#0a1f3f';     // v2.x: 더 파란 톤
    else if(/^v1/i.test(ds)) bg = '#2a1a0f'; // v1.x: 브라운 톤
    el.style.backgroundColor = bg;
  });
}
function clearDsTheming(){
  stage.querySelectorAll('.node').forEach(el=>{ el.style.backgroundColor=''; });
}

// Version 필터/정렬
const verPills = document.getElementById('verPills');
if(verPills){
  verPills.addEventListener('click',(e)=>{
    const target = e.target.closest('.ver-pill');
    if(!target) return;
    verPills.querySelectorAll('.ver-pill').forEach(p=>p.classList.remove('on'));
    target.classList.add('on');
    const key = target.dataset.ver;
    if(key==='all'){
      // 전체 초기화: 현재의 레벨/카테고리 필터만 반영하여 표시 상태 재계산
      applyFilters();
      applyDsTheming();
      return;
    }
    // 필터: 표시 조건
    stage.querySelectorAll('.node').forEach(el=>{
      const node = nodes.find(n=>n.id===el.dataset.id);
      const ds = node?.ds || '';
      let ok = true;
      if(key==='v20') ok = /^v2\.0$/i.test(ds);
      else if(key==='v15') ok = /^v1\.5$/i.test(ds);
      else if(key==='v10') ok = /^v1\.0$/i.test(ds);
      // 기존 레벨/클러스터 필터와 함께 동작하도록 display를 조합
      if(ok){
        // 유지: 다른 필터가 숨겼다면 건드리지 않음
        if(el.style.display==='none') return;
        el.style.display = 'grid';
      }else{
        el.style.display = 'none';
      }
    });
    linksLayer.innerHTML='';
    updateBands();
    applyDsTheming();
  });
}

// 사업부 선택 → 데이터세트 전환 (MX: 실제 데이터, 그 외: 더미 데이터)
const bizSelect = document.getElementById('bizSelect');
if(bizSelect){
  bizSelect.addEventListener('change',()=>{
    const v = bizSelect.value;
          if(v==='' || v==='mx'){
        nodes = [...nodesMX];
        updateCategoryPills(['smartphones','tablets','book','watch','buds','acc','sub']);
      }else{
        // 간단 더미: 상위 1개 + 카테고리 3개 + 하위 6개 정도
        const baseId = v.toUpperCase();
        // 사업부별 카테고리 매핑
        const categoryMap = {
          'vd': ['tv','audio','appliance','kitchen','aircare'],
          'da': ['refrigerator','washer','dryer','dishwasher','oven'],
          'acc': ['cases','covers','chargers','cables','stands']
        };
        const categories = categoryMap[v] || ['category1','category2','category3'];
        nodes = [
          {id:`${v}-home`, title:`${baseId} Home`, level:0, col:0, row:0, type:'main', status:'ok', ds:'v2.0', cluster:'global'},
          {id:`${v}-hub-1`, title:`${baseId} Hub A`, level:1, col:1, row:0, type:'category', status:'ok', ds:'v2.0', cluster:categories[0], parent:`${v}-home`},
          {id:`${v}-hub-2`, title:`${baseId} Hub B`, level:1, col:3, row:0, type:'category', status:'warn', ds:'v1.5', cluster:categories[1], parent:`${v}-home`},
          {id:`${v}-hub-3`, title:`${baseId} Hub C`, level:1, col:5, row:0, type:'category', status:'ok', ds:'v2.0', cluster:categories[2], parent:`${v}-home`},
          {id:`${v}-p1`, title:'Page 1', level:2, col:1, row:0, parent:`${v}-hub-1`, cluster:categories[0], status:'ok', ds:'v2.0'},
          {id:`${v}-p2`, title:'Page 2', level:2, col:2, row:0, parent:`${v}-hub-1`, cluster:categories[0], status:'warn', ds:'v1.0'},
          {id:`${v}-p3`, title:'Page 3', level:2, col:3, row:0, parent:`${v}-hub-2`, cluster:categories[1], status:'ok', ds:'v2.0'},
          {id:`${v}-p4`, title:'Page 4', level:2, col:4, row:0, parent:`${v}-hub-2`, cluster:categories[1], status:'ok', ds:'v2.0'},
          {id:`${v}-p5`, title:'Page 5', level:2, col:5, row:0, parent:`${v}-hub-3`, cluster:categories[2], status:'ok', ds:'v2.0'},
          {id:`${v}-p6`, title:'Page 6', level:2, col:6, row:0, parent:`${v}-hub-3`, cluster:categories[2], status:'warn', ds:'v1.5'},
        ];
        updateCategoryPills(categories);
      }
    // 재페인트 및 필터/커넥터 갱신
    paint();
    applyFilters();
    applyDsTheming();
  });
}

// 카테고리 필터 pills 동적 업데이트
function updateCategoryPills(categories){
  // controls 영역에서 카테고리 선택 pills를 찾기
  const controls = document.querySelector('.controls');
  if(!controls) return;
  
  // "카테고리 선택" 텍스트 다음에 있는 pills들을 찾기
  const categoryTitle = Array.from(controls.children).find(el => 
    el.tagName === 'SPAN' && el.textContent === '카테고리 선택'
  );
  if(!categoryTitle) return;
  
  // 카테고리 선택 제목 다음부터 끝까지의 pills 찾기 (전체 카테고리 제외)
  let nextElement = categoryTitle.nextElementSibling;
  const pillsToRemove = [];
  
  while(nextElement) {
    if(nextElement.classList.contains('pill') && nextElement.dataset.cluster !== 'all') {
      pillsToRemove.push(nextElement);
    }
    nextElement = nextElement.nextElementSibling;
  }
  
  // 기존 카테고리 pills 제거 (전체 카테고리 제외)
  pillsToRemove.forEach(pill => pill.remove());
  
  // 새로운 카테고리 pills 추가 (전체 카테고리 다음에)
  const allCategoryPill = categoryTitle.nextElementSibling;
  categories.forEach(category => {
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.setAttribute('data-cluster', category);
    pill.textContent = getCategoryDisplayName(category);
    pill.addEventListener('click', function(){
      const c = this.dataset.cluster;
      if(activeClusters.has('all')){ 
        activeClusters.delete('all'); 
        document.querySelector('.pill[data-cluster="all"]').classList.remove('on'); 
      }
      if(activeClusters.has(c)){
        activeClusters.delete(c); 
        this.classList.remove('multi'); 
      }else{
        activeClusters.add(c); 
        this.classList.add('multi'); 
      }
      if(activeClusters.size===0){ 
        activeClusters.add('all'); 
        document.querySelector('.pill[data-cluster="all"]').classList.add('on'); 
      }
      applyFilters();
    });
    allCategoryPill.parentNode.insertBefore(pill, allCategoryPill.nextSibling);
  });
}

// 카테고리 표시명 변환
function getCategoryDisplayName(category){
  const nameMap = {
    'smartphones': '스마트폰', 'tablets': '태블릿', 'book': 'Book/PC', 'watch': '워치', 'buds': '버즈', 'acc': '액세서리', 'sub': '서브메뉴',
    'tv': 'TV', 'audio': '오디오', 'appliance': '가전', 'kitchen': '주방', 'aircare': '공기청정',
    'refrigerator': '냉장고', 'washer': '세탁기', 'dryer': '건조기', 'dishwasher': '식기세척기', 'oven': '오븐',
    'cases': '케이스', 'covers': '커버', 'chargers': '충전기', 'cables': '케이블', 'stands': '거치대'
  };
  return nameMap[category] || category;
}

function resetWfThumb(ev){
  if(ev) ev.stopPropagation();
  localStorage.removeItem('wfThumbImage');
  renderWfThumb();
}
function downloadWfThumb(ev){
  if(ev) ev.stopPropagation();
  const saved = localStorage.getItem('wfThumbImage');
  if(!saved){ alert('저장된 이미지가 없습니다. 먼저 업로드하세요.'); return; }
  const a = document.createElement('a');
  a.href = saved;
  a.download = 'wf-thumb.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* ---------- 와이어프레임 모달 ---------- */
const modal = document.getElementById('modal'), mBody=document.getElementById('m-body'), mTitle=document.getElementById('m-title');
document.getElementById('m-close').addEventListener('click',()=>modal.classList.remove('show'));
document.getElementById('btnWire').addEventListener('click',()=>modal.classList.add('show'));
function openWire(n){
  mTitle.textContent = `${n.title} · Wireframe`;
  mBody.innerHTML = `
    <div class="wf-skel">
      <div class="skel-bar" style="width:40%"></div>
      <div class="skel-bar" style="width:65%"></div>
      <div class="skel-img"></div>
      <div class="skel-grid">
        <div class="wf-skel"><div class="skel-img" style="height:90px"></div><div class="skel-bar" style="width:70%"></div><div class="skel-bar" style="width:50%"></div></div>
        <div class="wf-skel"><div class="skel-img" style="height:90px"></div><div class="skel-bar" style="width:70%"></div><div class="skel-bar" style="width:50%"></div></div>
        <div class="wf-skel"><div class="skel-img" style="height:90px"></div><div class="skel-bar" style="width:70%"></div><div class="skel-bar" style="width:50%"></div></div>
      </div>
      <div class="skel-bar" style="width:92%"></div>
      <div class="skel-bar" style="width:84%"></div>
      <div class="skel-bar" style="width:76%"></div>
    </div>`;
  modal.classList.add('show');
}

/* ---------- 와이어프레임 썸네일 편집 모달 ---------- */
let currentEditingNode = null;
let currentTnElements = [];

// 편집 모달 HTML 추가
const tnEditModalHTML = `
<div class="tn-edit-modal" id="tnEditModal">
  <div class="tn-edit-container">
    <div class="tn-edit-header">
      <h3 id="tnEditTitle">와이어프레임 썸네일 편집</h3>
      <button class="tn-edit-close" id="tnEditClose">&times;</button>
    </div>
    <div class="tn-edit-body">
      <div class="tn-edit-controls">
        <div class="tn-edit-section">
          <h4>요소 추가</h4>
          <div class="tn-edit-buttons">
            <button class="tn-edit-btn add" data-type="bar">바</button>
            <button class="tn-edit-btn add" data-type="circle">원</button>
            <button class="tn-edit-btn add" data-type="rect">사각형</button>
            <button class="tn-edit-btn add" data-type="kv">키비주얼</button>
          </div>
        </div>
        
        <div class="tn-edit-section">
          <h4>요소 목록</h4>
          <div class="tn-elements-list" id="tnElementsList"></div>
        </div>
        
        <div class="tn-edit-section">
          <h4>도구</h4>
          <div class="tn-edit-buttons">
            <button class="tn-edit-btn" id="tnResetBtn">초기화</button>
            <button class="tn-edit-btn danger" id="tnDeleteBtn">선택 삭제</button>
          </div>
        </div>
        
        <div class="tn-edit-actions">
          <button class="tn-edit-action-btn secondary" id="tnCancelBtn">취소</button>
          <button class="tn-edit-action-btn primary" id="tnSaveBtn">저장</button>
        </div>
      </div>
      
      <div class="tn-preview-container">
        <h4>미리보기</h4>
        <div class="tn-preview" id="tnPreview"></div>
        <p style="text-align:center;font-size:12px;color:#6b7280;margin-top:10px">
          요소를 클릭하여 선택하고 드래그하여 이동하세요.<br>
          모서리의 핸들을 드래그하여 크기를 조정하세요.
        </p>
      </div>
    </div>
  </div>
</div>`;

// 모달 HTML을 body에 추가
document.body.insertAdjacentHTML('beforeend', tnEditModalHTML);

// 모달 요소들
const tnEditModal = document.getElementById('tnEditModal');
const tnEditTitle = document.getElementById('tnEditTitle');
const tnEditClose = document.getElementById('tnEditClose');
const tnPreview = document.getElementById('tnPreview');
const tnElementsList = document.getElementById('tnElementsList');
const tnResetBtn = document.getElementById('tnResetBtn');
const tnDeleteBtn = document.getElementById('tnDeleteBtn');
const tnCancelBtn = document.getElementById('tnCancelBtn');
const tnSaveBtn = document.getElementById('tnSaveBtn');

// 모달 닫기
tnEditClose.addEventListener('click', () => tnEditModal.classList.remove('show'));
tnCancelBtn.addEventListener('click', () => tnEditModal.classList.remove('show'));

// 와이어프레임 썸네일 편집 모달 열기
function openTnEdit(node) {
  currentEditingNode = node;
  tnEditTitle.textContent = `${node.title} · 와이어프레임 썸네일 편집`;
  
  // 현재 노드의 tn 요소들을 파싱하여 편집 가능한 형태로 변환
  const nodeEl = stage.querySelector(`[data-id="${node.id}"]`);
  const tnEl = nodeEl.querySelector('.tn');
  currentTnElements = parseTnElements(tnEl.innerHTML);
  
  // 편집 UI 업데이트
  updateTnElementsList();
  
  // 미리보기 업데이트
  updateTnPreview();
  
  tnEditModal.classList.add('show');
}

// tn 요소들을 파싱하여 편집 가능한 형태로 변환
function parseTnElements(html) {
  const elements = [];
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  tempDiv.querySelectorAll('span').forEach((el, index) => {
    // tn(94x141) → 편집기(300x450) 좌표로 역변환
    const editWidth = 300, editHeight = 450;
    const tnWidth = 94, tnHeight = 141;
    const scaleX = editWidth / tnWidth;
    const scaleY = editHeight / tnHeight;

    const type = el.className.includes('bar') ? 'bar' : 
                 el.className.includes('circle') ? 'circle' : 
                 el.className.includes('rect') ? 'rect' : 
                 el.className.includes('kv') ? 'kv' : 'bar';

    const topTn = parseInt(el.style.top) || 0;
    const leftTn = parseInt(el.style.left) || 0;
    const heightTn = parseInt(el.style.height) || 4;
    const widthRaw = parseInt(el.style.width) || 100; // % 또는 px

    const element = {
      id: index,
      type,
      className: el.className,
      style: el.style.cssText,
      top: Math.round(topTn * scaleY),
      left: Math.round(leftTn * scaleX),
      // bar/kv: % 유지, 나머지(px)는 편집기 크기로 스케일
      width: (type === 'bar' || type === 'kv') ? widthRaw : Math.round(widthRaw * scaleX),
      height: Math.round(heightTn * scaleY)
    };
    elements.push(element);
  });
  
  return elements;
}

// 요소 목록 업데이트
function updateTnElementsList() {
  tnElementsList.innerHTML = currentTnElements.map((el, index) => `
    <div class="tn-element-item" data-index="${index}" onclick="selectTnElement(${index})">
      <div class="element-info">
        <div class="element-icon" style="border-radius: ${el.type === 'circle' ? '50%' : '2px'};"></div>
        <span>${el.type === 'bar' ? '바' : el.type === 'circle' ? '원' : el.type === 'rect' ? '사각형' : '키비주얼'}</span>
      </div>
      <button class="tn-edit-btn danger" onclick="removeTnElement(${index}); event.stopPropagation();" style="padding: 2px 6px; font-size: 10px;">×</button>
    </div>
  `).join('');
}

// 요소 선택
function selectTnElement(index) {
  // 모든 요소 선택 해제
  document.querySelectorAll('.tn-element-item').forEach(item => item.classList.remove('selected'));
  document.querySelectorAll('.tn-preview-element').forEach(el => el.classList.remove('selected'));
  
  // 선택된 요소 하이라이트
  document.querySelector(`.tn-element-item[data-index="${index}"]`).classList.add('selected');
  document.querySelector(`.tn-preview-element[data-index="${index}"]`).classList.add('selected');
  
  currentSelectedElement = index;
}

// 요소 추가
document.querySelectorAll('.tn-edit-btn.add').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    const newElement = {
      id: currentTnElements.length,
      type: type,
      className: type === 'bar' ? 'bar' : 
                type === 'circle' ? 'circle' : 
                type === 'rect' ? 'rect' : 
                type === 'kv' ? 'kv' : 'bar',
      style: '',
      top: 20 + currentTnElements.length * 30,
      left: 14,
      width: type === 'circle' ? 12 : type === 'rect' ? 16 : 100,
      height: type === 'circle' ? 12 : type === 'rect' ? 8 : 4
    };
    
    currentTnElements.push(newElement);
    updateTnElementsList();
    updateTnPreview();
  });
});

// 요소 삭제
function removeTnElement(index) {
  currentTnElements.splice(index, 1);
  updateTnElementsList();
  updateTnPreview();
}

// 드래그 앤 드롭 변수들
let isDragging = false;
let isResizing = false;
let currentSelectedElement = null;
let dragStartX = 0;
let dragStartY = 0;
let elementStartLeft = 0;
let elementStartTop = 0;
let resizeHandle = null;

// 미리보기 업데이트 (드래그 가능한 요소들로)
function updateTnPreview() {
  tnPreview.innerHTML = currentTnElements.map((el, index) => {
    const widthCss = (el.type === 'bar' || el.type === 'kv') ? `${el.width}%` : `${el.width}px`;
    const style = `position:absolute;top:${el.top}px;left:${el.left}px;width:${widthCss};height:${el.height}px;background:#d8dee9;border-radius:${el.type === 'circle' ? '50%' : el.type === 'rect' ? '2px' : '3px'};`;
    return `
      <div class="tn-preview-element tn-resizable" data-index="${index}" style="${style}">
        <div class="handle n" data-handle="n"></div>
        <div class="handle s" data-handle="s"></div>
        <div class="handle w" data-handle="w"></div>
        <div class="handle e" data-handle="e"></div>
        <div class="handle nw" data-handle="nw"></div>
        <div class="handle ne" data-handle="ne"></div>
        <div class="handle sw" data-handle="sw"></div>
        <div class="handle se" data-handle="se"></div>
      </div>
    `;
  }).join('');
  
  // 드래그 이벤트 리스너 추가
  setupDragAndDrop();
}

// 드래그 앤 드롭 설정
function setupDragAndDrop() {
  const elements = tnPreview.querySelectorAll('.tn-preview-element');
  const handles = tnPreview.querySelectorAll('.tn-resizable .handle');
  
  // 기존 이벤트 리스너 제거
  elements.forEach(element => {
    element.removeEventListener('mousedown', startDrag);
    element.addEventListener('mousedown', startDrag);
  });
  
  handles.forEach(handle => {
    handle.removeEventListener('mousedown', startResize);
    handle.addEventListener('mousedown', startResize);
  });
}

// 드래그 시작
function startDrag(e) {
  if (e.target.classList.contains('resize-handle')) return;
  
  e.preventDefault();
  isDragging = true;
  currentSelectedElement = parseInt(e.currentTarget.dataset.index);
  
  // 선택 상태 업데이트
  selectTnElement(currentSelectedElement);
  
  const rect = tnPreview.getBoundingClientRect();
  dragStartX = e.clientX - rect.left;
  dragStartY = e.clientY - rect.top;
  elementStartLeft = currentTnElements[currentSelectedElement].left;
  elementStartTop = currentTnElements[currentSelectedElement].top;
  
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
}

// 드래그 중
function onDrag(e) {
  if (!isDragging) return;
  
  const rect = tnPreview.getBoundingClientRect();
  const deltaX = e.clientX - rect.left - dragStartX;
  const deltaY = e.clientY - rect.top - dragStartY;
  
  // 데드존 적용 (3px 이하의 움직임은 무시)
  if (Math.abs(deltaX) < 3 && Math.abs(deltaY) < 3) return;
  
  const newLeft = Math.max(0, Math.min(300 - currentTnElements[currentSelectedElement].width, elementStartLeft + deltaX));
  const newTop = Math.max(0, Math.min(450 - currentTnElements[currentSelectedElement].height, elementStartTop + deltaY));
  
  currentTnElements[currentSelectedElement].left = newLeft;
  currentTnElements[currentSelectedElement].top = newTop;
  
  updateTnPreview();
}

// 드래그 종료
function stopDrag() {
  isDragging = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
}

// 리사이즈 시작
function startResize(e) {
  e.preventDefault();
  e.stopPropagation();
  
  isResizing = true;
  resizeHandle = e.target.dataset.handle; // nw, ne, sw, se
  currentSelectedElement = parseInt(e.target.parentElement.dataset.index);
  
  const rect = tnPreview.getBoundingClientRect();
  dragStartX = e.clientX - rect.left;
  dragStartY = e.clientY - rect.top;
  elementStartLeft = currentTnElements[currentSelectedElement].left;
  elementStartTop = currentTnElements[currentSelectedElement].top;
  const startWidth = currentTnElements[currentSelectedElement].width;
  const startHeight = currentTnElements[currentSelectedElement].height;
  
  document.addEventListener('mousemove', onResize);
  document.addEventListener('mouseup', stopResize);
}

// 안정화 리사이즈 유틸과 핸들러 (클램프/스냅/스케일 보정 + rAF)
const MIN_W = 8, MIN_H = 8;
const MAX_W = 4096, MAX_H = 4096;
const GRID_SNAP = 2;
function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }
function snap(v,step=GRID_SNAP){ return Math.round(v/step)*step; }
function getPreviewScale(previewEl){
  const st = window.getComputedStyle(previewEl);
  const tr = st.transform; if(!tr || tr==='none') return 1;
  const m = tr.match(/matrix\(([^)]+)\)/); if(m){ const a=parseFloat(m[1].split(',')[0]); return isNaN(a)?1:a; }
  return 1;
}

let _resizeRAF = null;
function onResize(e){
  if(!isResizing) return;
  const rect = tnPreview.getBoundingClientRect();
  const scale = getPreviewScale(tnPreview);
  const SENSITIVITY = 0.25; // 더 낮은 감도로 부드럽게
  const dx = ((e.clientX - rect.left - dragStartX) / scale) * SENSITIVITY;
  const dy = ((e.clientY - rect.top - dragStartY) / scale) * SENSITIVITY;
  if(Math.abs(dx) < 0.8 && Math.abs(dy) < 0.8) return;

  if(!_resizeRAF){
    _resizeRAF = requestAnimationFrame(()=>{
      _resizeRAF = null;
      const el = currentTnElements[currentSelectedElement];
      const startW = el.width; const startH = el.height;
      let left = elementStartLeft, top = elementStartTop, width = startW, height = startH;

      let dLeft=0, dTop=0, dW=0, dH=0;
      const applyAxis=(axis,val)=>{
        if(axis==='x'){
          if(resizeHandle.includes('w')){ dLeft = val; dW = -val; }
          if(resizeHandle.includes('e')){ dW = val; }
        }else{
          if(resizeHandle.includes('n')){ dTop = val; dH = -val; }
          if(resizeHandle.includes('s')){ dH = val; }
        }
      };

      let dxUse = dx, dyUse = dy; // 추후 Shift 고정비율 확장 가능
      if(resizeHandle.includes('e')||resizeHandle.includes('w')) applyAxis('x', dxUse);
      if(resizeHandle.includes('n')||resizeHandle.includes('s')) applyAxis('y', dyUse);

      // 단위 처리: bar/kv = width% , 그 외(px)
      const PREVIEW_W = 300, PREVIEW_H = 450;
      const isPercentWidth = (el.type === 'bar' || el.type === 'kv');
      const deltaWUnit = isPercentWidth ? (dW / PREVIEW_W) * 100 : dW;
      const SNAP_PX = 1, SNAP_PERCENT = 0.5;
      let newW = isPercentWidth
        ? snap(clamp(width + deltaWUnit, 1, 100), SNAP_PERCENT)
        : snap(clamp(width + deltaWUnit, MIN_W, MAX_W), SNAP_PX);
      let newH = snap(clamp(height + dH, MIN_H, MAX_H), SNAP_PX);

      // 왼쪽 핸들일 때 left는 dLeft(px)만큼 이동 (단위 혼합 방지)
      let newLeft = left;
      if (resizeHandle.includes('w')) {
        newLeft = snap(left + dLeft, SNAP_PX);
      }
      // 위쪽 핸들일 때 top은 dTop(px)만큼 이동
      let newTop  = resizeHandle.includes('n') ? snap(top + dTop, SNAP_PX) : top;

      // 경계 (편집기 300x450) + 최대 크기 제한
      const pixelWidth = isPercentWidth ? (newW * PREVIEW_W / 100) : newW;
      newLeft = clamp(newLeft, 0, PREVIEW_W - pixelWidth);
      newTop  = clamp(newTop, 0, PREVIEW_H - newH);
      
      // 최대 크기 제한 (요소가 너무 커지지 않도록)
      newW = Math.min(newW, isPercentWidth ? 100 : 280);
      newH = Math.min(newH, 400);

      el.left = newLeft; el.top = newTop; el.width = newW; el.height = newH;
      updateTnPreview();
    });
  }
}

// 리사이즈 종료
function stopResize() {
  isResizing = false;
  resizeHandle = null;
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', stopResize);
}

// 초기화 버튼
tnResetBtn.addEventListener('click', () => {
  currentTnElements = [
    {id: 0, type: 'bar', className: 'bar b1', style: '', top: 16, left: 14, width: 100, height: 4},
    {id: 1, type: 'bar', className: 'bar b2', style: '', top: 28, left: 14, width: 60, height: 4},
    {id: 2, type: 'bar', className: 'bar b3', style: '', top: 40, left: 14, width: 80, height: 4},
    {id: 3, type: 'kv', className: 'kv', style: '', top: 64, left: 14, width: 100, height: 20}
  ];
  updateTnElementsList();
  updateTnPreview();
});

// 선택 삭제 버튼
tnDeleteBtn.addEventListener('click', () => {
  if (currentSelectedElement !== null) {
    removeTnElement(currentSelectedElement);
    currentSelectedElement = null;
  }
});

// 저장 버튼
tnSaveBtn.addEventListener('click', () => {
  if (!currentEditingNode) return;
  
  // 노드의 tn 요소 업데이트
  const nodeEl = stage.querySelector(`[data-id="${currentEditingNode.id}"]`);
  const tnEl = nodeEl.querySelector('.tn');
  
  // 편집기 크기와 실제 tn 크기의 비율 계산
  const editWidth = 300;
  const editHeight = 450;
  const tnWidth = 94;
  const tnHeight = 141;
  const scaleX = tnWidth / editWidth;
  const scaleY = tnHeight / editHeight;
  
  // 새로운 HTML 생성 (좌표와 크기를 실제 tn 크기에 맞춰 변환)
  const newHtml = currentTnElements.map(el => {
    const scaledTop = Math.round(el.top * scaleY);
    const scaledLeft = Math.round(el.left * scaleX);
    const scaledWidth = el.type === 'circle' || el.type === 'rect' ? 
      Math.round(el.width * scaleX) : el.width; // bar와 kv는 % 유지
    const scaledHeight = Math.round(el.height * scaleY);
    
    const style = `position:absolute;top:${scaledTop}px;left:${scaledLeft}px;width:${scaledWidth}${el.type === 'circle' || el.type === 'rect' ? 'px' : '%'};height:${scaledHeight}px;background:#d8dee9;border-radius:${el.type === 'circle' ? '50%' : el.type === 'rect' ? '2px' : '3px'};`;
    return `<span class="${el.className}" style="${style}"></span>`;
  }).join('');
  
  tnEl.innerHTML = newHtml;
  
  // 로컬 스토리지에 저장
  const savedTnElements = JSON.parse(localStorage.getItem('tnElements') || '{}');
  savedTnElements[currentEditingNode.id] = currentTnElements;
  localStorage.setItem('tnElements', JSON.stringify(savedTnElements));
  
  tnEditModal.classList.remove('show');
  alert('와이어프레임 썸네일이 저장되었습니다.');
});

// 저장된 tn 요소들 로드
function loadSavedTnElements() {
  const savedTnElements = JSON.parse(localStorage.getItem('tnElements') || '{}');
  return savedTnElements;
}

// 노드 생성 시 저장된 tn 요소들 적용
function applySavedTnElements(nodeId, tnEl) {
  const savedTnElements = loadSavedTnElements();
  if (savedTnElements[nodeId]) {
    const elements = savedTnElements[nodeId];
    
    // 편집기 크기와 실제 tn 크기의 비율 계산
    const editWidth = 300;
    const editHeight = 450;
    const tnWidth = 94;
    const tnHeight = 141;
    const scaleX = tnWidth / editWidth;
    const scaleY = tnHeight / editHeight;
    
    const newHtml = elements.map(el => {
      const scaledTop = Math.round(el.top * scaleY);
      const scaledLeft = Math.round(el.left * scaleX);
      const scaledWidth = el.type === 'circle' || el.type === 'rect' ? 
        Math.round(el.width * scaleX) : el.width; // bar와 kv는 % 유지
      const scaledHeight = Math.round(el.height * scaleY);
      
      const style = `position:absolute;top:${scaledTop}px;left:${scaledLeft}px;width:${scaledWidth}${el.type === 'circle' || el.type === 'rect' ? 'px' : '%'};height:${scaledHeight}px;background:#d8dee9;border-radius:${el.type === 'circle' ? '50%' : el.type === 'rect' ? '2px' : '3px'};`;
      return `<span class="${el.className}" style="${style}"></span>`;
    }).join('');
    
    tnEl.innerHTML = newHtml;
  }
}

/* ---------- 전체화면(사이드바 보이게) ---------- */
btnFull.addEventListener('click', async ()=>{
  if(!document.fullscreenElement){
    await stage.requestFullscreen();
    // 상세 패널을 stage 내부로 옮김 (fullscreen에서도 보이도록)
    if(detail.parentElement!==stage){ stage.appendChild(detail); detail.classList.add('fs'); }
    // bottom-area도 stage 내부로 이동하여 하단 고정
    if(bottomArea.parentElement!==stage){ stage.appendChild(bottomArea); }
    // 줌 컨트롤도 stage 내부로 이동하여 전체화면에 표시
    if(zoomControls && zoomControls.parentElement!==stage){ stage.appendChild(zoomControls); }
    btnFull.innerHTML = '<i class="fa-solid fa-compress"></i> 전체화면 종료';
  }else{
    await document.exitFullscreen();
    // 상세 패널 원위치 복귀
    if(detail.parentElement===stage){ originalDetailParent.appendChild(detail); detail.classList.remove('fs'); }
    // bottom-area 원위치 복귀
    if(bottomArea.parentElement===stage){ originalBottomAreaParent.appendChild(bottomArea); }
    // 줌 컨트롤 원위치 복귀 (stage 앞쪽에 배치)
    if(zoomControls && zoomControls.parentElement===stage && originalZoomControlsParent){ originalZoomControlsParent.insertBefore(zoomControls, stage); }
    btnFull.innerHTML = '<i class="fa-solid fa-expand"></i> 전체화면';
  }
});
document.addEventListener('fullscreenchange',()=>{
  if(document.fullscreenElement===stage){
    if(detail.parentElement!==stage){ stage.appendChild(detail); detail.classList.add('fs'); }
    if(bottomArea.parentElement!==stage){ stage.appendChild(bottomArea); }
    // 전체화면에서도 줌 컨트롤 유지
    if(zoomControls && zoomControls.parentElement!==stage){ stage.appendChild(zoomControls); }
    // 전체화면에서는 viewport 하단에 고정
    bottomArea.classList.add('fixed-bottom');
    // 상단바 표시
    let topbar = document.getElementById('fsTopbar');
    if(!topbar){
      topbar = document.createElement('div');
      topbar.id = 'fsTopbar';
      topbar.className = 'fs-topbar';
      topbar.textContent = 'S.COM - Sitemap';
      document.body.appendChild(topbar);
    }
    topbar.style.display = 'flex';
  }else{
    if(detail.parentElement===stage){ originalDetailParent.appendChild(detail); detail.classList.remove('fs'); }
    if(bottomArea.parentElement===stage){ originalBottomAreaParent.appendChild(bottomArea); }
    if(zoomControls && zoomControls.parentElement===stage && originalZoomControlsParent){ originalZoomControlsParent.insertBefore(zoomControls, stage); }
    bottomArea.classList.remove('fixed-bottom');
    const topbar = document.getElementById('fsTopbar');
    if(topbar){ topbar.style.display = 'none'; }
    btnFull.innerHTML = '<i class="fa-solid fa-expand"></i> 전체화면';
  }
});

/* ---------- 다운로드 기능 ---------- */
function downloadFile(type) {
  const currentTitle = document.getElementById('d-title').textContent;
  const fileName = `${currentTitle}_${type.toUpperCase()}.${type === 'xd' ? 'xd' : type === 'sketch' ? 'sketch' : 'zeplin'}`;
  
  // 더미 파일 내용 생성
  let content = '';
  let mimeType = '';
  
  switch(type) {
    case 'xd':
      content = `Adobe XD 파일 - ${currentTitle}\n\n이 파일은 ${currentTitle} 페이지의 와이어프레임을 포함합니다.\n\n생성일: ${new Date().toLocaleDateString('ko-KR')}\n버전: 1.0`;
      mimeType = 'application/octet-stream';
      break;
    case 'sketch':
      content = `Sketch 파일 - ${currentTitle}\n\n이 파일은 ${currentTitle} 페이지의 디자인을 포함합니다.\n\n생성일: ${new Date().toLocaleDateString('ko-KR')}\n버전: 1.0`;
      mimeType = 'application/octet-stream';
      break;
    case 'zeplin':
      content = `Zeplin 파일 - ${currentTitle}\n\n이 파일은 ${currentTitle} 페이지의 스펙을 포함합니다.\n\n생성일: ${new Date().toLocaleDateString('ko-KR')}\n버전: 1.0`;
      mimeType = 'application/octet-stream';
      break;
  }
  
  // 파일 다운로드
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // 다운로드 완료 알림
  const btn = event.target.closest('.download-btn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> 완료';
  btn.style.background = '#e8fff7';
  btn.style.color = '#047857';
  btn.style.borderColor = '#bbf7d0';
  
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 2000);
}

/* ---------- 접근성 ---------- */
document.addEventListener('keydown',(e)=>{
  if(e.key==='Escape'){ detail.classList.remove('open'); modal.classList.remove('show'); }
  if((e.key==='f' || e.key==='F') && document.activeElement.closest('#stage')) btnFull.click();
});