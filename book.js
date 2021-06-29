//Data cleansing book attributes
export const extractBookInfo = (response) => {
    const BookArr = response.map((iteminfo) => {
        const book = {
            title: iteminfo.volumeInfo.title || "",
            subtitle: iteminfo.volumeInfo.subtitle || "",
            image: (iteminfo.volumeInfo.imageLinks || {thumbnail:0}).thumbnail || "",
            author: (iteminfo.volumeInfo.authors || ["N/A"]).join(","),
            category: (iteminfo.volumeInfo.categories || ["N/A"]).join(","),
            language: iteminfo.volumeInfo.language || "N/A",
            description: iteminfo.volumeInfo.description || "N/A",
            publisher: iteminfo.volumeInfo.publisher || "N/A",
            publishedtime: iteminfo.volumeInfo.publishedDate || "N/A",
            rating:iteminfo.volumeInfo.averageRating || 0,
            ratingcount: iteminfo.volumeInfo.ratingsCount || 0,
            pages: iteminfo.volumeInfo.pageCount || "N/A",
            country: iteminfo.saleInfo.country || "N/A",
            preview: iteminfo.volumeInfo.previewLink,
            id: iteminfo.volumeInfo.industryIdentifiers || ["N/A"]
        }
        return book;
    });
    return BookArr;
}


//Generating htmls for books
export const createElementWithText = (type, text, parent) => {
    const newElement = document.createElement(type);
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
    parent.appendChild(newElement);
}

const CreateRatingBar = (book) => {
    var starhtml = `<span>Rating: </span>
    `;
    if(book.rating > 0) {
        const rating = String(book.rating);
        for (let i=0; i<Number(rating[0]); i++){
            starhtml += 
            `<span class="fa fa-star"></span>
            `;
        }
        if(rating.length > 1){
            starhtml += 
            `<span class="fa fa-star-half"></span>
            `;
        }
    }
    starhtml += `<span> (${book.ratingcount} reviews)</span>`
    return (`<div class="ratings">` + starhtml + `</div>`);
}

const CreatePubishModal = (book, index) => {

    const id = book.id.map((entry) => `${entry.type}-${entry.identifier}`).join(" ");

    return `<div>
            <button class="display__modal--btn" id="publishbtn${index}">Publication Info</button>
            <div id="publishmodal${index}" class="display__modal">
                <div class="display__modal--content">
                <span id="class${index}" class="close">&times;</span>
                <p>Total Page: ${book.pages}</p>
                <p>Language: ${book.language}</p>
                <p>Published Country: ${book.country}</p>
                <p>Publisher: ${book.publisher}</p>
                <p>Published Time: ${book.publishedtime}</p>
            <p>Publication ID: ${id}</p>
        </div>
    </div></div>`;
}

export const createBookCard = (book, parent, index) => {
    parent.innerHTML += 
    (`<div class="display__bookcard">
        <div class="display__bookcard--image">
            <h3>${book.title}</h3>
            <p>${book.subtitle}</p>
            <a href=${book.preview}><img src=${book.image} alt="Book Cover image missing"/></a>`+ CreatePubishModal(book, index) +`
        </div>
        <div class="display__bookcard--info">
            <p>Author: ${book.author}</p>` + CreateRatingBar(book) + `
            <p>Catergory: ${book.category}</p> 
            <p>Description:</p>
            <p class="display__bookcard--description">${book.description}</p>
        </div>
    </div>`);
    //console.log(CreateRatingBar(book));
}