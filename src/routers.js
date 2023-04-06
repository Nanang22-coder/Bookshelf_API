import {addbook,getbooks,getById,update,deleteBook} from "./handler.js"


const routes = [{
  
   method : "POST",
   path : "/books",
   handler: addbook
  },
  {
   method : "GET",
   path : "/books",
   handler: getbooks
  },
  {
  method : "GET",
   path : "/books/{bookid}",
   handler: getById
  },
   {
  method : "PUT",
   path : "/books/{bookid}",
   handler: update
  },
  {
    method : "DELETE",
   path : "/books/{bookid}",
   handler: deleteBook
  }
  
  ]
  

  
  export default routes
ubah