export const getBookInfo = async (searchquery) => {
    const responsePromise=fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchquery}&maxResults=40`);//$start-index=
    const response = await responsePromise;
    const jsonResponse = await response.json();
    return jsonResponse;
}