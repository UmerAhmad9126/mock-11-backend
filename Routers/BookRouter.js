const express = require("express");
const { bookModel } = require("../Models/BookModel");
const { auth } = require("../Middleware/authMiddileware");


const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {

    let Qobj = {}
    const { author, category } = req.query;

    if (author) {
        Qobj.author = author
    }

    if (category) {
        Qobj.category = category
    }

    try {
        const book = await bookModel.find(Qobj);
        res.status(200).send(book);

    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ msg: error.message })
    }


});

bookRouter.get("/:id", async (req, res) => {

    const { id } = req.params;

    try {
        const book = await bookModel.findById({ _id: id });
        res.status(200).send(book);

    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ msg: error.message })
    }
});




// Protected Routes
bookRouter.use(auth);

bookRouter.post("/add", async (req, res) => {

    try {

        let note = new bookModel(req.body);
        await note.save();
        res.status(201).send({ msg: "A new Book  added successfully" })

    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ msg: error.message });
    }

});

bookRouter.patch("/update/:id", async (req, res) => {

    const { id } = req.params;
    const { payload } = req.body;
    // console.log('id:', id);
    // console.log('payload:', payload);

    try {

        await bookModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(204).send({ msg: "Update Successful" });

    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ msg: error.message });
    }
});


bookRouter.delete("/delete/:id", async (req, res) => {

    const { id } = req.params;

    try {

        await bookModel.findByIdAndDelete({ _id: id });
        res.status(202).send({ msg: "Delete Successful" });

    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ msg: error.message });
    }
});



module.exports = {
    bookRouter
}
