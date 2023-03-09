import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, 'Please add a title'],
        maxlength: [40,'Title cannot be more than 40 characters']
    },
    description:  {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [200, 'Title cannot be more than 200 words']
    },
    genre: {
        type: String,
        required: [true, 'Please select a genre'],
    },
    questions: [{
        question: String, options: Array, answer: String
    }]
}, { collection : 'quizes'})

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
