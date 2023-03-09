import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req,
  res
) {
  let { db } = await connectToDatabase();

  const quizes = await db.collection("authen").find().toArray();
  // var myobj = { username: name, password: "Highway 37" };
  if(req.method === "POST"){
    db.collection("authen").insertOne(JSON.parse(req.body), function(err, res) {
      if (err) throw err;
      db.close();
  });
  }
  else if(req.method === "GET"){
    db.collection("authen").find({}).toArray((err, res) => {
      if (err) throw err;
      return JSON.stringify(res);
    });
  }
  else if(req.method === "PUT"){
    db.collection("authen").updateOne({ "_id" : new ObjectId(JSON.parse(req.body).filter) }, {$set : JSON.parse(req.body).body}, function(err, res) {
      if (err) throw err;
      db.close();
    });
  }
  else if(req.method === "DELETE"){
    db.collection("authen").deleteOne({ "_id" : new ObjectId(req.body) }, function(err, res) {
      if (err) console.log(err);
      db.close();
    });
  }

  // db.collection("authen").deleteMany({ username : null }, function(err, res) {
  //   if (err) throw err;
  //   db.close();
  // });

  res.status(200).json({ quizes });
}