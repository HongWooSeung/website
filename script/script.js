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

// 하이라이트 왼쪽 버튼
highBtnL.onclick = function() {
    if (isAnimating) return; // 애니메이션 중 클릭 방지
    let targetIdx = (curImgOrd === 0) ? 21 : curImgOrd - 1;
    highImgs[targetIdx].click();
};

// 하이라이트 오른쪽 버튼
highBtnR.onclick = function() {
    if (isAnimating) return;
    let targetIdx = (curImgOrd === 21) ? 0 : curImgOrd + 1;
    highImgs[targetIdx].click();
};

function getNextSiblingWidth(imgElement) {
    // 1. 바로 다음 형제 요소(태그)를 찾음
    const nextSibling = imgElement.nextElementSibling;

    // 2. 형제 요소가 존재하는지 확인 후 너비 반환
    if (nextSibling) {
        return nextSibling.offsetWidth; 
    } else {
        console.error("다음 형제 요소가 없습니다.");
        return 0;
    }
}

highImgs.forEach((img, index) => {
    img.onclick = function() {
        if (isAnimating) return; 
        isAnimating = true;

        const itemWidth = img.getBoundingClientRect().width+30; // 슬라이드 한 칸의 너비
		const itemWidth_s = getNextSiblingWidth(img)+30;
        let diff = index - curImgOrd;

		if (diff > 5) diff -= 22;
		else if (diff < -5) diff += 22;

        if (diff === 0) {
            isAnimating = false;
            return;
        }

        // [핵심] 이미지와 텍스트 모두에게 애니메이션 적용
        const moveX = - (itemWidth + itemWidth_s * (diff-1));
		const moveX_txt = -(diff * 500); 
        
        highImgsWrap.style.transition = "transform 0.5s ease-in-out";
        highTextWrap.style.transition = "transform 0.5s ease-in-out";
        
        highImgsWrap.style.transform = `translateX(${moveX}px)`;
        highTextWrap.style.transform = `translateX(${moveX_txt}px)`;

        // 커지고 작아지는 클래스 부여
        highImgs.forEach(c => c.classList.remove('select'));
        this.classList.add('select');

        // 애니메이션이 끝난 후 (0.5초 뒤) DOM 순서 재배치
        setTimeout(() => {
            // 트랜지션 제거 (리셋할 때 움직임이 보이지 않게)
            highImgsWrap.style.transition = "none";
            highTextWrap.style.transition = "none";

            // 실제 DOM 요소 순서 변경
            if (diff > 0) {
                for (let i = 0; i < diff; i++) {
                    moveForward(highImgsWrap);
                    moveForward(highTextWrap);
                }
            } else {
                for (let i = 0; i < Math.abs(diff); i++) {
                    moveBackward(highImgsWrap);
                    moveBackward(highTextWrap);
                }
            }

            // 위치를 0으로 리셋해도 이미 DOM 순서가 바뀌었으므로 화면은 유지됨
            highImgsWrap.style.transform = `translateX(0)`;
            highTextWrap.style.transform = `translateX(0)`;
            
            curImgOrd = index;
            isAnimating = false;
        }, 500);

        lasttxOrd = culT(index);
    };
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

/*
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
}, { passive: false }); */

$(document).ready(function(){
	//원스크롤
	// 변수명 통일: .wrap을 가리키는 $wrap
    const $wrap = $('.wrap'); 
    
    let currentPage = 0;
    let offsetArray = [];
    let isScrolling = false;

    // 1. 개발자님의 논리: 남은 높이를 계산해 이동 지점을 제한하는 함수
    function setPosition() {
        offsetArray = [];
        const winHeight = $(window).height();
        const wrapHeight = $wrap.outerHeight(); // 전체 wrap의 높이
        const $eachPages = $wrap.find('.container');
		const finalTop = wrapHeight - winHeight;
		
        
        $eachPages.each(function(i) {
            const currentTop = $(this).offset().top;
            // [중요 로직] 남은 높이가 화면 높이보다 작으면 바닥에 도달한 것
            const remainingHeight = wrapHeight - currentTop;
			
            if (remainingHeight <= winHeight) {
                // 더 내려가면 공백이 보이므로, '전체높이 - 화면높이'를 마지막 좌표로 고정
                offsetArray.push(finalTop);
                
                // 더 이상의 페이지 인덱스는 의미 없으므로 여기서 중단 (return false)
                return false; 
            } else {
                // 아직 내려갈 공간이 충분하면 해당 페이지의 top을 저장
                offsetArray.push(currentTop);
            }
        });
    }
	
	console.log(offsetArray);

    $(window).on('resize', function() {
        setPosition();
        // 리사이즈 시 현재 인덱스 위치 유지
        if (offsetArray[currentPage] !== undefined) {
            $('html, body').scrollTop(offsetArray[currentPage]);
        }
    }).trigger('resize');

    // 2. 휠 이벤트 (offsetArray.length 기준으로 작동)
    window.addEventListener('wheel', function(e) {
        const totalValidPages = offsetArray.length; // 유효한 좌표 개수
        const delta = e.deltaY;
		
		console.log('a');

        // 위/아래 경계선에서 브라우저 기본 스크롤 허용
        if (delta > 0 && currentPage >= totalValidPages - 1) return;
        if (delta < 0 && currentPage <= 0) return;

		console.log('b');
		
        e.preventDefault(); 
        if (isScrolling) return;

        if (delta > 0) currentPage++;
        else currentPage--;

        isScrolling = true;

        $('html, body').stop().animate({
            scrollTop: offsetArray[currentPage]
        }, 600, function() {
            isScrolling = false;
        });
    }, { passive: false });
});





