const wrapper = document.getElementById('sliderWrapper');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const circles = document.querySelectorAll('.eclipse-container .circle');
const intImg = document.querySelector('.intro-container');
const intBtn = document.getElementById('introNextBtn');

//하이라이트 부분 변수
const highImgsWrap = document.querySelector('.highlights .highimgs');
const highImgs = document.querySelectorAll('.highlights .highimgs .nonselect');
const highBtnL = document.getElementById('highLeft');
const highBtnR = document.getElementById('highRight');
const highTextWrap = document.querySelector('.highlights .hightext');
const highTexts = document.querySelectorAll('.highlights .hightext .text');

let curImgOrd = 4;
let moveNext = true;
let firstDiv = highImgsWrap.firstElementChild;
let lasttxOrd = 0;
let isAnimating = false;

function culT(i){
	if(i >= 4) return (i - 4);
	else return (i + 7);
}

//하이라이트 왼쪽 버튼
highBtnL.onclick = function() {
	if(curImgOrd == 0) highImgs[10].click();
	else highImgs[curImgOrd-1].click();
};

//하이라이트 오른쪽 버튼
highBtnR.onclick = function() {
	if(curImgOrd == 10) highImgs[0].click();
	else highImgs[curImgOrd+1].click();
};


highImgs.forEach((img, index) => {
    img.onclick = function() {
		
		
		const itemWidth = this.offsetWidth; // 클릭한 이미지의 너비
		
		// 1. 애니메이션 설정
        highTextWrap.style.transition = "transform 0.5s ease-in-out";
		
		// 2. 이동해야 할 거리(diff) 계산
        // curImgOrd는 현재 맨 앞에 있는 요소의 데이터 인덱스라고 가정합니다.
        let diff = index - curImgOrd;

        // 무한 루프 방식(Carousel)에서 최단 거리 보정 (요소가 11개일 때)
        // 예: 0에서 10으로 갈 때 10칸 이동 대신 뒤로 1칸 이동하게 함
        if (diff > 5) diff -= 11;
        if (diff < -5) diff += 11;

        if (diff === 0) return;
        
        // 3. 왼쪽으로 밀기
        highTextWrap.style.transform = `translateX(${-500 * diff}px)`;
		
		// 4. 선택 표시 업데이트
        highImgs.forEach(c => c.classList.remove('select'));
        this.classList.add('select');

        if (diff > 0) {
			// 정방향 이동: 첫 번째 요소를 뒤로 보냄
			for (let i = 0; i < diff; i++) {
				moveForward(highImgsWrap);
			}
		}else {
			// 역방향 이동: 마지막 요소를 앞으로 보냄
			for (let i = 0; i < Math.abs(diff); i++) {
				moveBackward(highImgsWrap);
			}
		}
		
		if (isAnimating) return;

        // 5. 애니메이션 종료 후 처리
        setTimeout(() => {
            // 트랜지션 일시 정지
            highTextWrap.style.transition = "none";
            
            // 3. 이동 로직 실행
			if (diff > 0) {
				// 정방향 이동: 첫 번째 요소를 뒤로 보냄
				for (let i = 0; i < diff; i++) {
					moveForward(highTextWrap);
				}
			} else {
				// 역방향 이동: 마지막 요소를 앞으로 보냄
				for (let i = 0; i < Math.abs(diff); i++) {
					moveBackward(highTextWrap);
				}
			}

            // 위치 리셋 (0으로 되돌려도 DOM 순서가 바뀌어서 이미지는 유지됨)
            highTextWrap.style.transform = `translateX(0)`;
            
            isAnimating = false;
        }, 500);
        // 4. 현재 인덱스 업데이트
        curImgOrd = index;
        lasttxOrd = culT(index); // 필요 시 유지
    }
});

// 공통 이동 함수 (가독성과 재사용성을 위해 분리)
function moveForward(parent) {
    const first = parent.firstElementChild;
    if (first) parent.appendChild(first);
}

function moveBackward(parent) {
    const first = parent.firstElementChild;
    const last = parent.lastElementChild;
    if (first && last) parent.insertBefore(last, first);
}


const triggerEvent = new Event('click');


let currentIndex = 0;
const totalSlides = slides.length;

function updateSlider() {
    // 이동 거리를 % 단위로 계산 (가장 정확함)
    const offset = -currentIndex * 100;
    wrapper.style.transform = `translateX(${offset}%)`;
}

nextBtn.addEventListener('click', () => {
    // 마지막 장이면 첫 번째로, 아니면 다음 장으로
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    // 첫 번째 장이면 마지막 장으로, 아니면 이전 장으로
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalSlides - 1;
    }
    updateSlider();
});

// 상기까지 마우스 클릭 시 이동

//introduce의 원 오브젝트 눌렀을 때 동작
circles.forEach((circle, index) => {
    circle.onclick = function() {
        // console.log(`${index + 1}번째 원이 클릭되었습니다!`);
        circles.forEach(c => c.classList.remove('click'));
        this.classList.add('click');
        intImg.style.transform = `translateX(-${25 * index}%)`;
    };
});
//introduce의 원 오브젝트 눌렀을 때 동작

let imgOrd = 0;

intBtn.addEventListener('click', () => {
    imgOrd++;
    if(imgOrd >= 4){
        imgOrd = 0;
    }
    circles[imgOrd].click();
});



(function() {
    window.addEventListener('DOMContentLoaded', () => {
        const wrapper = document.getElementById('sliderWrapper');
        const slides = document.querySelectorAll('.slide');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const container = document.querySelector('.slider-container');

        if (!wrapper || slides.length === 0) return;

        // 1. 무한 루프를 위해 첫 번째와 마지막 슬라이드를 복사(Clone)
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);

        wrapper.appendChild(firstClone); // 끝에 첫 번째 복사본 추가
        wrapper.insertBefore(lastClone, slides[0]); // 앞에 마지막 복사본 추가

        const allSlides = document.querySelectorAll('.slide');
        const slideCount = allSlides.length;
        
        let currentIndex = 1; // 복사본이 앞에 하나 있으므로 1번부터 시작
        let isTransitioning = false; // 애니메이션 중 클릭 방지

        // 기본 스타일 설정 (CSS 수정 대신 JS로 주입)
        wrapper.style.transition = "none"; 
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        container.style.height = window.innerHeight + "px";

        function move(index, speed = "1.2s") {
            if (isTransitioning) return;
            isTransitioning = true;

            wrapper.style.transition = `transform ${speed} cubic-bezier(0.45, 0.05, 0.55, 0.95)`;
            currentIndex = index;
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // 애니메이션이 끝난 후 눈속임 처리
        wrapper.addEventListener('transitionend', () => {
            isTransitioning = false;
            wrapper.style.transition = "none";

            if (currentIndex === slideCount - 1) {
                // 마지막(복사본)에 도달하면 진짜 1번으로 순간이동
                currentIndex = 1;
                wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            } else if (currentIndex === 0) {
                // 처음(복사본)에 도달하면 진짜 마지막으로 순간이동
                currentIndex = slideCount - 2;
                wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        });

        function next() { move(currentIndex + 1); }
        function prev() { move(currentIndex - 1); }

        // let autoTimer = setInterval(next, 2500);

        // function resetTimer() {
        //     clearInterval(autoTimer);
        //     autoTimer = setInterval(next, 2500);
        // }

        // 1. 함수 정의 (기존 유지)
        function next() { move(currentIndex + 1); }
        function prev() { move(currentIndex - 1); }

        // 2. 타이머 설정 및 속도 조절
        const NORMAL_INTERVAL = 2000; // 이후 페이지 대기 시간 (3초)
        const FIRST_INTERVAL = 700;  // 첫 페이지 대기 시간 (1초)
        let autoTimer = null;
        let isFirstTime = true;       // 첫 실행 여부 확인 변수

        // 타이머 시작 함수
        function startTimer() {
            if (isFirstTime) {
                // [첫 실행] 브라우저 로드 후 0.7초 뒤에 첫 번째 이동
                autoTimer = setTimeout(() => {
                    next();
                    isFirstTime = false; // 첫 실행 완료
                    startTimer();        // 이후부터는 NORMAL_INTERVAL로 반복 시작
                }, FIRST_INTERVAL);
            } else {
                // [반복 실행] 2초마다 다음 슬라이드로 이동
                autoTimer = setInterval(next, NORMAL_INTERVAL);
            }
        }

        // 리셋 함수 (사용자가 조작했을 때 타이머 재설정)
        function resetTimer() {
            clearTimeout(autoTimer);
            clearInterval(autoTimer);
            isFirstTime = false; // 사용자가 건드리면 더 이상 "첫 실행"이 아님
            startTimer();
        }

        // 초기 타이머 실행
        startTimer();

        // 3. 이벤트 연결 (중복 제거된 버전)
        nextBtn.onclick = (e) => { e.preventDefault(); next(); resetTimer(); };
        prevBtn.onclick = (e) => { e.preventDefault(); prev(); resetTimer(); };

        container.onmouseenter = () => {
            clearTimeout(autoTimer);
            clearInterval(autoTimer);
        };
        container.onmouseleave = () => resetTimer();

        window.addEventListener('resize', () => {
            container.style.height = window.innerHeight + "px";
        });
    });
})();

//여기까지 슬라이더 무한 재생


const wrap = document.querySelector('.wrap');
const containers = document.querySelectorAll('.container');
let page = 0;
const lastPage = containers.length - 1;
let isMoving = false;
const footerHeight = 352; // 푸터의 실제 높이


function movePage(index) {
    if (isMoving) return;

    if (index < 0) index = 0;
    if (index > lastPage + 1) index = lastPage + 1;

    page = index;
    isMoving = true;

    // 현재 적용된 zoom 배율(scale)을 가져옵니다.
    const baseWidth = 1920;
    const currentScale = window.innerWidth / baseWidth;

    let targetTop = 0;

    if (page === 0) {
        targetTop = 0;
    } else if (page <= lastPage) {
        // 일반 섹션 이동
        targetTop = containers[page].offsetTop;
    } else {
        // [푸터 이동 - zoom 보정형]
        // 1. 푸터의 실제 바닥 위치를 잡습니다.
        const footerElement = document.querySelector('footer');
        const footerBottom = footerElement.offsetTop + footerElement.offsetHeight;
        
        // 2. 현재 브라우저의 화면 높이를 가져옵니다.
        // zoom이 걸려있으면 window.innerHeight가 실제보다 크게 인식될 수 있으므로
        // 이를 현재 배율로 나누어 '보정된 화면 높이'를 구합니다.
        const scaledViewHeight = window.innerHeight / currentScale;
        
        targetTop = footerBottom - scaledViewHeight;
    }

    // 이동 실행 (소수점 오차 방지)
    wrap.style.top = `-${targetTop}px`;

    setTimeout(() => {
        isMoving = false;
    }, 600);
}


// 휠 이벤트
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isMoving) return;

    if (e.deltaY > 0) {
        if (page <= lastPage) movePage(page + 1);
    } else if (e.deltaY < 0) {
        if (page > 0) movePage(page - 1);
    }
}, { passive: false });



// ★ Top 버튼 클릭 이벤트 추가
document.querySelector('.top a').addEventListener('click', (e) => {
    e.preventDefault(); // 기본 앵커 기능 차단
    movePage(0); // 0페이지(최상단)로 이동 함수 호출
});



window.addEventListener('keydown', (e) => {
    // 이동 중일 때는 키 입력을 무시합니다.
    if (isMoving) return;

    // 우리가 제어할 키 리스트
    const keys = ['PageDown', 'PageUp', 'End', 'Home', 'ArrowDown', 'ArrowUp'];
    
    if (keys.includes(e.key)) {
        // 브라우저의 기본 덜컥거리는 스크롤 기능을 막습니다.
        e.preventDefault();
    }

    switch (e.key) {
        case 'PageDown':
        case 'ArrowDown':
            // 다음 페이지로 이동 (푸터 인덱스인 lastPage + 1까지 허용)
            if (page < lastPage + 1) movePage(page + 1);
            break;

        case 'PageUp':
        case 'ArrowUp':
            // 이전 페이지로 이동
            if (page > 0) movePage(page - 1);
            break;

        case 'Home':
            // 최상단(0)으로 이동
            movePage(0);
            break;

        case 'End':
            // 맨 아래(푸터 인덱스)로 이동
            movePage(lastPage + 1);
            break;
    }
}, { passive: false });





