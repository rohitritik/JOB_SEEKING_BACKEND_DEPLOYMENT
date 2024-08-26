import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// not use configenv in ; semicolon
app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});  

// app.get('/',()=>{
//     console.log(`<h1>This is home page</h1>`)
// })

// app.get('/login',()=>{
//     console.log(`This is login page`)
// }); 