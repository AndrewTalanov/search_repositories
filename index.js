"use strict";

function draw(array) {

    let linksHTML = '';

    if (array.length) {
        array.forEach(el => {
            linksHTML += `<div class="list-element">
                            <img src="${el.owner.avatar_url}" alt="Аватар аккаунта">
                            <div class="element-info">
                                <p>Ссылка на репозиторий: <a href=${el.html_url} target="_blank">${el.name}</a></p>
                                <p>Имя аккаунта: ${el.owner.login}</p>
                                <p>Используемый язык: ${el.language ?? 'Не используется'}</p>
                            </div>
                        </div>`;
        });
    } else {
        linksHTML = '<p class="list-empty">Ничего не найдено<p>';
    }

    document.querySelector('.message').innerHTML = '';
    list.innerHTML = linksHTML;
}

const list = document.querySelector('.list');

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const searchString = document.querySelector('input').value;
    const countLinks = 10;

    if (searchString.length < 3) {
        document.querySelector('.message').innerHTML = 'Введите не менее 3х символов';
        return;
    }

    document.querySelector('.message').innerHTML = 'Загрузка...';
    const url = `https://api.github.com/search/repositories?q=${searchString}&per_page=${countLinks}`;

    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            draw(response.items);
        })
        .catch(error => console.log(error));
});


