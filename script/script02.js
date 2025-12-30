document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalAuthor = document.getElementById("modalAuthor");
    const modalDesc = document.getElementById("modalDesc");
    const closeBtn = document.querySelector(".close-btn");

    document.querySelectorAll('.conimg').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 1. 요소 찾기
            const detailElement = this.querySelector('.detail-text');
            
            // 2. 정보 가져오기 
            // 만약 data-large-img 속성이 있으면 그걸 쓰고, 없으면 일반 img src를 씁니다 (비상용)
            const largeImgSrc = detailElement.getAttribute('data-large-img') || this.querySelector('img').src;
            const title = this.querySelector('h3').innerText;
            const author = this.querySelector('h6').innerText;
            const detailDesc = detailElement ? detailElement.innerHTML : "설명이 없습니다.";

            // 3. 모달에 정보 넣기
            modalImg.src = largeImgSrc; // ★ 여기서 고화질 이미지가 들어갑니다.
            modalTitle.innerText = title;
            modalAuthor.innerText = author;
            modalDesc.innerHTML = detailDesc; 

            // 4. 모달 보이기
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    });

    // 닫기 버튼
    if(closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    // 배경 클릭 시 닫기
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
});




