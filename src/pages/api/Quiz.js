import dbConnect from 'utils/dbConnect';
import Quiz from '../../../models/Quiz';
import mongoose from 'mongoose';

// mongoose.createConnection(process.env.MONGODB_URI);

dbConnect();

export default async (req, res) => {
    const { method } = req;
    switch(method) {
        case 'GET':
            try{
                if (req.query.id === undefined ){
                    const quizes = await Quiz.find({}).then((data) => {
                        res.json(data);
                });
                }
                else{
                    const quizes = await Quiz.findById(req.query.id).then((data) => {
                            res.json(data);
                    });
                }
                
            }catch(error) {
               console.log({ data : 'loading'}, error); 
            }
            break;
            case 'POST':
                try{
                    const quiz = new Quiz(JSON.parse(req.body));
                        const createdQuiz = quiz.save().then((data) => {
                        console.log('posted');
                        res.json(data);
                        })
                }catch(error) {
                    console.log('could not post', error)
                }
                break;
            case 'PUT':
                try{
                    const doc = await Quiz.findOneAndUpdate({ '_id' : mongoose.Types.ObjectId(req.query.filter) }, JSON.parse(req.body)).then((data) => {
                        res.json(data);
                    })
                }catch(error) {
                    console.log('failed to update', error)
                }
                break;
                case 'DELETE':
                    try{
                        const deleted = await Quiz.deleteOne({ '_id' : mongoose.Types.ObjectId(req.query.id)}).then((data) => {
                            res.json(data);
                        });
                    }catch(error) {
                        console.log('there was an error in deleting', error)
                    }
                    break;
            default:
                res.json({ success: false });
                break;
    }
}