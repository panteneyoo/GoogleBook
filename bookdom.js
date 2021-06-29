import {getBookInfo} from "./bookapi.js";
import {createElementWithText, extractBookInfo, createBookCard} from "./book.js";

const search = document.getElementById("searchbtn");

search.addEventListener("click", async (event) => {
    event.preventDefault();
    const query = document.getElementById("searchinput").value;
    const bookInfo = await getBookInfo(query);
    const display = document.getElementById("display"); 
    const count = document.getElementById("count");

    count.innerHTML = "";
    display.innerHTML = "";

    if (bookInfo.totalItems > 0){
        createElementWithText(
            "p",
            `About ${String(bookInfo.totalItems)} results found matched to the book`,
            count
        );
        const bookList = extractBookInfo(bookInfo.items);
        //console.log(bookList);
        for (let i=0; i<(bookInfo.totalItems>40 ? 40: bookInfo.totalItems); i++){
            //console.log(bookList[i]);
            createBookCard(bookList[i], display, i);
        }
    }else {
        createElementWithText(
            "p",
            "Sorry, we could not find any book with provided keywords, please try again",
            count
        )
    }
    console.log("search finished");
});

const btnArr = document.getElementsByClassName(".display__modal--btn");
const modalbtnArr = [...btnArr];


modalbtnArr.map((button, index) => button.addEventListener("click", (event)=>{
    document.getElementById(`publishmodal${index}`).style.display = "block";
    }));



