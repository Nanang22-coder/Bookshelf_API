import http from "http"

http.createServer(async (req,res) => {
res.writeHead(200,{"Content-Type" : "text/html"})
if(req.url === "/" && req.method === "GET") {
  let datas = ""
  let id = ""
//membuat fungsi response
function response(link,m = "GET") {

return fetch(link,{method:m}).then(d => d.json()).then(data => {
  datas += JSON.stringify(data)
  
})
}
//membuat fungsi get id
function getId(){
  fetch("http://localhost:9000/books").then(d => d.json()).then(da => {
    id += da.data.books[0].id
    console.log(da.data.books[0].id)
    
  })
}

//MENGAMBIL DATA 
datas += "---------- MENGAMBIL DATA --------------- "
await response("http://localhost:9000/books")
// KETIKA POST BERHASIL
datas += "---------- KETIKA POST BERHASIL -------------"
await response("http://localhost:9000/books?name=agrils&pageCount=100&readPage=30&reading=true&year=45&author=jhondhoe&summary=lorenipsun&publisher=dicoding","POST"   )
getId()
// KETIKA POST NAME GAK DI ISI
datas += "---------- KETIKA POST NAME GAK DI ISI -------------"
await response("http://localhost:9000/books?pageCount=100&readPage=30&reading=true&year=45&author=jhondhoe&summary=lorenipsun&publisher=dicoding","POST"   )

// KETIKA POST readPage > pageCount 
datas += "---------- KETIKA POST readPage > pageCount -------------"
await response("http://localhost:9000/books?name:agus&pageCount=80&readPage=110&reading=true&year=45&author=jhondhoe&summary=lorenipsun&publisher=dicoding","POST"   )
// KETIKA GET ID TIDAK DI TEMUKAN
datas += "---------- KETIKA GET ID TIDAK DI TEMUKAN --------------- "
await response("http://localhost:9000/books/random")
// KETIKA GET ID  DI TEMUKAN
datas += "---------- KETIKA GET ID DI TEMUKAN --------------- "
await response(`http://localhost:9000/books/${id}`)
// KETIKA PUT ID TIDAK DITEMUKAN
datas += "---------- KETIKA PUT ID TIDAK DITEMUKAN --------------- "
await response(`http://localhost:9000/books/random`,"PUT")
// KETIKA PUT ID  DITEMUKAN
datas += "---------- KETIKA PUT ID  DITEMUKAN --------------- "
await response(`http://localhost:9000/books/${id}?name=agrilsupdate&pageCount=100&readPage=30&reading=true&year=45&author=jhondhoe&summary=lorenipsun&publisher=dicoding"`,"PUT")
// KETIKA PUT NAME TIDAK DI ISI
datas += "---------- KETIKA NAME TIDAK DI ISI --------------- "
await response(`http://localhost:9000/books/${id}?pageCount=100&readPage=30&reading=true&year=45&author=jhondhoe&summary=lorenipsun&publisher=dicoding"`,"PUT")
// KETIKA PUT readPage > pageCount
datas += "---------- KETIKA PUT readPage > pageCount --------------- "
await response(`http://localhost:9000/books/${id}?name=agrilsupdate&pageCount=100&readPage=130&reading=true&year=45&author=jhondhoe&summary=lorenipsun&publisher=dicoding"`,"PUT")
// KETIKA DELETE ID TIDAK DITEMUKAN
datas += "---------- KETIKA KETIKA DELETE ID TIDAK DITEMUKAN --------------- "
await response(`http://localhost:9000/books/random`,"DELETE")
// KETIKA DELETE ID  DITEMUKAN
datas += "---------- KETIKA DELETE ID  DITEMUKAN --------------- "
await response(`http://localhost:9000/books/${id}`,"DELETE")


res.end(datas)
}
}).listen(7000,() => console.log("running in http://localhost:7000/"))