const express= require("express")

const { v4: uuidv4 } = require('uuid');

const dns=require("dns")

const fs = require("fs")

const product=require("./products")

const app=express()
app.use(express.json())

function showIPaddress(req,res,next){
let websit=req.body.website_name
// console.log(websit)

dns.lookup(websit, (err, address) => {
    // console.log(address);
    return res.send(address)
  });

}


function AddProduct(req,res,next){

let get_product=req.body.products
let products_add={
    id:uuidv4(),
    products:get_product
}

product.push(products_add)
// console.log(product)

fs.writeFile("products.json", JSON.stringify(product), err => {
     
    // Checking for errors
    if (err) throw err; 
   
    console.log(product); // Success
});
res.send("Add Successfully")


}


function getAllproduct(req,res,body){


    fs.readFile("products.json", function(err, data) {
      
        // Check for errors
        if (err) throw err;
       
        // Converting to JSON
        const product = JSON.parse(data);
          
        // console.log(users); // Print users 
        res.send(product)
    });
}

app.post("/getmeip",showIPaddress)

app.post("/products/create",AddProduct)

app.get("/products",getAllproduct)



app.listen(3001,()=>{
    console.log("Server is running at http://localhost:3001")
})