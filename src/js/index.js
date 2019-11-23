// Example of DOM Manipulation with Pure JavaScript

// update books function
const update_books = () => {
  // console.log(search_text);
  search_text = document.getElementById("book_search").value
  // search_text = search_text
  if(search_text != ""){
    $.ajax({
      url:'https://www.googleapis.com/books/v1/volumes?q='+search_text+'&maxResults=30&key=' + API_KEY,
      success: function(json){
        var htmlcontent = "";
        if(json.totalItems == 0){
          htmlcontent = "<p>No Books Found</p>"
        }else{
          for (i = 0; i < json.items.length; i++){
            // console.log(json.items[i])
            let book_object = json.items[i]
            let author = "No Authors Found"
            if("authors" in book_object.volumeInfo){
              if(book_object.volumeInfo.authors.length > 0){
                author = json.items[i].volumeInfo.authors[0]
              }
            }
            let imageLink = ""
            if("imageLinks" in book_object.volumeInfo){
              imageLink = book_object.volumeInfo.imageLinks.thumbnail
            }
            let publisher = "No Publishers Found"
            if("publisher" in book_object.volumeInfo){
              publisher = book_object.volumeInfo.publisher
            }
            let title = book_object.volumeInfo.title
            let info = book_object.volumeInfo.infoLink

            htmlcontent += create_cards(imageLink, title, author, publisher, info)
          }
        }
        document.getElementById("books").innerHTML =  htmlcontent;
      },
      error: function(request, message){
        document.getElementById("books").innerHTML =  "<p> API connection error </p>";
      }
    });
  }else {
    document.getElementById("books").innerHTML =  "<p> Blank Search Query </p>";
  }
}


const create_cards = (img, title, author, publisher, moreInfo) => {
  return "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'><div class='card' style='width: 18rem;'>"+
    "<img class='img-thumbnail' src='"+img+"' alt='Thumbnail Not Found'>"+
    "<div class='card-body'>"+
      "<h7 class='card-title'>"+title+"+</h7>"+
      "<p class='card-text'>By: "+author+"</p><p class='card-text'>Published By: "+publisher+"</p>"+
      "<a href="+moreInfo+" class='btn btn-primary'>See the Book</a>"+
    "</div>"+
  "</div></div>"
}
