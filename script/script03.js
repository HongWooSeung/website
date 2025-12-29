document.addEventListener('DOMContentLoaded', function() {
    // 1. 요소 선택
    const buttons = document.querySelectorAll('.s5 .inner .history .button li');
    const images = document.querySelectorAll('.s5 .inner .history .hisimg img');

    // 초기 상태: 첫 번째 버튼 활성화
    buttons[0].classList.add('active');

    // 2. 버튼 클릭 이벤트 리스너 추가
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // 링크 클릭 시 페이지 상단 이동 방지

            // 3. 모든 버튼에서 'active' 클래스 제거 및 클릭한 버튼에 추가
            buttons.forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            // 4. 모든 이미지 숨기기
            images.forEach(img => {
                img.style.display = 'none';
                img.style.opacity = '0';
            });

            // 5. 클릭한 순서(index)에 맞는 이미지만 보이기
            images[index].style.display = 'block';
            // 약간의 시차를 두어 fade 효과 적용
            setTimeout(() => {
                images[index].style.opacity = '1';
            }, 10);
        });
    });
});