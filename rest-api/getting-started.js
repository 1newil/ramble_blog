const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://hexyield:Mcdowell$92@cluster0.m7yx9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
}
