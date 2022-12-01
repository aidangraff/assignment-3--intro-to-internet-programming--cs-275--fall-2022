function artists(json) {
    let album = document.querySelector(`.carousel-slides`);
    let theAlbums = ``;
    let leftArrow = document.querySelectorAll(`a`)[0];
    let rightArrow = document.querySelectorAll(`a`)[1];
    let slide = document.getElementsByClassName(`carousel-slides`)[0];
    let width = 0;
   

    for(let i = 0; i < json.length; i++) {
        theAlbums += `<div class = "all-carousel-slides">`;
        theAlbums += `<p><a></a></p>`; //CSS a:nth-child was effecting line 14 and 18 in js file when I only wanted
        theAlbums += `<p><a></a></p>`; //it to effect the html arrows .So I added empty anchors to prevent that 
        theAlbums += `<a href = "${json[i].url}">${json[i].artist}</a>`;
        theAlbums += `<p>${json[i].album}</p>`;
        theAlbums += `<img src = "${json[i].cover_image.path}" alt = "${json[i].cover_image.alt_content}" width = "${json[i].cover_image.width}" height = "${json[i].cover_image.height}">`;
        theAlbums += `<p>${json[i].review.content}</p>`;
        theAlbums += `<a href ="${json[i].review.url}">-${json[i].review.source}</a>`;
        theAlbums += `</div>`;
    }
    

    album.innerHTML = theAlbums;    



    leftArrow.addEventListener(`click`, () => {
        width -= 680;
        slide.style.transform = `translate(`+ width +`px)`;
    }
    );
    
    rightArrow.addEventListener(`click`, () => {
        width += 680;
        slide.style.transform = `translate(`+ width +`px)`;
    }
    );

    document.addEventListener(`keydown`, (e) => {
    {
        if (e.key === `ArrowRight`) {
            rightArrow.click();
        }
        if (e.key === `ArrowLeft`) {
            leftArrow.click();
        }
    }});
    
}

window.onload = () => {
    let body = document.querySelector(`body`);
    let script = document.createElement(`script`);
    let rightRectangle = document.createElement(`div`);
    rightRectangle.classList.add(`right-rectangle`);
    let leftRectangle = document.createElement(`div`);
    leftRectangle.classList.add(`left-rectangle`);
    let cover = document.getElementsByClassName(`carousel`)[0];

    script.setAttribute(`src`, `json/data.json`);
    body.append(script);
    cover.appendChild(rightRectangle);
    cover.appendChild(leftRectangle);
};


