'use strict';

// SELECTING HTML ELEMENTS

const toplistGrid = document.querySelector('.toplist__grid');

const toHtml = (array) => {
    array.forEach(obj => {
        const html = `<div class="toplist__card">
        <div>
        <img src=${obj.image} alt="title-img" class="toplist__card__img">
        </div>
        <h3 class="toplist__card__title">${obj.name}</h3>
        <div class="toplist__card__details">
            <div class="toplist__card__rank toplist__flex">
                <span>Rank:</span>
                <span>${obj.rank}</span>
            </div>
            <div class="toplist__card__score toplist__flex">
                <span>Score</span>
                <span>${obj.score}</span>
            </div>
            <div class="toplist__card__genre toplist__flex">
                <span>Genres</span>
                <span>${obj.genre}</span>
            </div>
            <div class="toplist__card__episodes toplist__flex">
                <span>Episodes</span>
                <span>${obj.episodes}</span>
            </div>
        </div>
    </div>`;
    toplistGrid.insertAdjacentHTML('beforeend', html);
    })
}


const createLink = () => {
    const id = 5114;
    // const link = `https://api.jikan.moe/v4/anime/${id}/full`
    const link = `https://api.jikan.moe/v4/top/anime`
    return link
}

const getAnimes = async ()=> {
    const link = createLink();
    const response = await fetch(link);
    const json = await response.json();
    const infoArr = getInfo(json.data);
    toHtml(infoArr);
}

const getInfo = (json) => {
    console.log(json);
    const infoArray = [];
    json.forEach(el => {
        const infoObj = {};
        infoObj.name = el.title;
        infoObj.rank = el.rank;
        infoObj.score = el.score;
        infoObj.episodes = el.episodes;
        infoObj.genre = getGenre(el.genres);
        infoObj.image = el.images.webp.large_image_url;

        infoArray.push(infoObj);
    })
    return infoArray;
}

const getGenre = (array) => {
    const genreArr = [];
    array.forEach((el,i) => {
        if(i < 3) genreArr.push(el.name);
    })
    return genreArr;
}

getAnimes();