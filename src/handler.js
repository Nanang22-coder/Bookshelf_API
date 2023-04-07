import {nanoid} from "nanoid"
import books from "./dataBooks.js"

//HANDLER MENAMBAHKAN DATA
const addbook = (request, h) => {
  const{name,year,author,summary,publisher,pageCount,readPage,reading} = request.query
  console.log(request.query)
  const[id,p,r,insertedAt,y] = [nanoid(16),parseInt(pageCount),parseInt(readPage),new Date().toISOString(),parseInt(year)]
  const finished = p === r
  const read = () => {
   let r = reading.toLowerCase()
   if(r === "true") return true
   return false
    
  }

   const data = {
    "id": id,
    "name": name,
    "year": y,
    "author": author,
    "summary":summary,
    "publisher": publisher,
    "pageCount": p,
    "readPage": r,
    "finished": finished,
    "reading": read(),
    "insertedAt": insertedAt,
    "updatedAt": insertedAt
}
//JIKA NAME = undefined
    if(name === undefined) {
      return h.response({
    "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
}).code(400)}
// JIKA READPAGE LEBIH BESAR DARI PAGECOUNT
   if(r > p) {
     return h.response({
    "status": "fail",
    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}).code(400)
   } else {
     books.push(data)
     console.log("daftar buku terbaru",books)
    return h.response(
{
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookId": id
    }
}
      
      ).code(201)
  
}}
//HANDLER MENGAMBIL DATA
const getbooks = (request,h) => {
  
  
  return h.response({
    "status": "success",
    "data": {
        "books": books
      
   } }).code(200)
  
  }
  //MENAMPILKAN BOOK DENGAN ID
  const getById = (request, h) => {
    const{bookid} = request.params
    const dataId = books.filter((m) => m["id"] === bookid)
    console.log(bookid,dataId)
    if(dataId.length !== 0) return h.response({
    "status": "success",
    "data": {
        "book": dataId[0]
        
     }} )
    return h.response({
    "status": "fail",
    "message": "Buku tidak ditemukan"
})
  }
  //UPATE DATA PUT
const update = (request,h) => {
    const{bookid} = request.params
    const dataId = books.filter((m) => m["id"] === bookid)
// JIKA ID TIDAK DI TEMUKAN
   if(dataId.length === 0) {
     return h.response({
    "status": "fail",
    "message": "Gagal memperbarui buku. Id tidak ditemukan"
}).code(404)
   }
    
    const{name,year,author,summary,publisher,pageCount,readPage,reading} = request.query
    const[p,r,updatedAt,y,insertedAt] = [parseInt(pageCount),parseInt(readPage),new Date().toISOString(),parseInt(year),dataId[0]["insertedAt"]]
    const finished = p === r
    //MENCARI NILAI BOOLEAN READING
    const read = () => {
   if(reading !== undefined ) {
   let r = reading.toLowerCase()
     if(r === "true") return true
  } return false
   }
    
    //DATA REQUEST
    const dataUpdate = {
    "id": bookid,
    "name": name,
    "year": y,
    "author": author,
    "summary":summary,
    "publisher": publisher,
    "pageCount": p,
    "readPage": r,
    "finished": finished,
    "reading": read(),
    "insertedAt": insertedAt,
    "updatedAt": updatedAt
}
//JIKA NAME = UNDEFINED
  if(name === undefined) {
    return h.response({
    "status": "fail",
    "message": "Gagal memperbaruhi buku. Mohon isi nama buku"
}).code(400)}
// JIKA READPAGE LEBIH BESAR DARI PAGECOUNT
   if(r > p) {
     return h.response({
    "status": "fail",
    "message": "Gagal memperbaruhi buku. readPage tidak boleh lebih besar dari pageCount"
}).code(400)}

   else {
     //MENCARI INDEX DATA BUKU YG AKAN DI GANTI
     const indexBooks = () => {
      let index
      books.forEach((v,i) => {
      if(v["id"] === bookid)  index = i
 })
   return index
 }
    books[indexBooks()] = dataUpdate
    console.log("daftar buku setelah update" ,books)
    return h.response({
    "status": "success",
    "message": "Buku berhasil diperbarui"
}).code(200)
   }
  }
  //MENGHAPUS BOOK
  const deleteBook = (request,h) => {
    const {bookid} = request.params
    //MENCARI INDEX BOOKS
    const indexBooks = () => {
      let index
      books.forEach((v,i) => {
      if(v["id"] === bookid)  index = i
 })
   return index
 }
 
 if(indexBooks() !== undefined){
   books.splice(indexBooks(),1)
   console.log("daftar buku setelah di hapus ",books)
    return h.response({
    "status": "success",
    "message": "Buku berhasil dihapus"
})
  }
 else {
   return h.response({
    "status": "fail",
    "message": " gagal dihapus. Id tidak ditemukan"
})
 } 
    
  }
  
  export {addbook,getbooks,getById,update,deleteBook}