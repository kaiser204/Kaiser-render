const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const DB = "./db.json";

function readDB(){
  return JSON.parse(fs.readFileSync(DB));
}

function saveDB(data){
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

// LOGIN ADMIN
app.post("/login", (req,res)=>{
  const {user,pass} = req.body;

  if(user==="admin" && pass==="1234"){
    res.json({success:true});
  } else {
    res.json({success:false});
  }
});

// PRODUTOS
app.get("/products",(req,res)=>{
  res.json(readDB().products);
});

app.post("/products",(req,res)=>{
  const db = readDB();
  db.products.push(req.body);
  saveDB(db);
  res.json({ok:true});
});

// PEDIDOS
app.post("/order",(req,res)=>{
  const db = readDB();
  db.orders.push(req.body);
  saveDB(db);
  res.json({ok:true});
});

// PAGAMENTO SIMULADO
app.post("/pay",(req,res)=>{
  res.json({
    mpesa:"858417039",
    emola:"867351644",
    message:"Pagamento iniciado"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log("Servidor online na porta " + PORT));