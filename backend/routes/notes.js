const express = require('express');     //importing express
const router = express.Router();
const getuser = require('../middleware/getuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//1st Route
//Get all Notes using: GET "api/notes/fetchallnotes". Login required.
router.get('/fetchallnotes', getuser, async (req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);

    } catch (error) {
        console.error(error.message);   
        res.status(500).send("Internal Server Error"); 
    }
   
})



//2nd Route
//Add a new Notes using: POST "api/notes/addnote". Login required.
router.post('/addnote', getuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),      /*Copy from express validator website*/
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
    ], 
    async (req, res)=>{
    try {
        const {title, description, tag} = req.body;

        /* ..........Copy from  express validator website.......... */
        //if error then return bad request and error message as well.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Saving new note of user
        const note = new Notes ({
            title, description, tag, user: req.user.id
        })    
        const saveNote = await note.save();     //.save returns promise.
        res.json(saveNote);


    } catch (error) {
        console.error(error.message);   
        res.status(500).send("Internal Server Error"); 
    }
})



//3rd Route
//Update an existing Notes using: PUT "api/notes/uppdatenote". Login required.
//router.put('/uppdatenote/:id',........ updating with particular user id
router.put('/uppdatenote/:id', getuser, async (req, res)=>{
    const {title, description, tag} = req.body;
    try {
        const newNote = {};     //Create a new note object.

        //Updating title, description, tag with new one.
        if(title) {newNote.title = title;}
        if(description) {newNote.description = description;}
        if(tag) {newNote.tag = tag;}

        //Find the new note to be updated and update it.
        let note =await Notes.findById(req.params.id);       // this is id which that particular user want to update his details.
        if(!note){
            return res.status(404).send("Not Found");
        }

        //Prevent some logged in person to access other person notes.   
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed, This is not your note");
        }    

        //If any of above condition meet then that particular statement of if will execute otherwise 
        //that normal function will execute.
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});


    } catch (error) {
        console.error(error.message);   
        res.status(500).send("Internal Server Error"); 
    }
})




//4th Route
//Delete an existing Notes using: DELETE "api/notes/deletenote". Login required.
router.delete('/deletenote/:id', getuser, async (req, res)=>{
    
    try {
    
        //Find the new note to be deleted and delete it.
        let note =await Notes.findById(req.params.id);       // this is id which that particular user want to update his details.
        if(!note){
        return res.status(404).send("Not Found");
        }

        //Prevent some logged in person to access other person notes.   
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed, This is not your note to be deleting");
        } 

        //If any of above condition meet then that particular statement of if will execute otherwise 
        //that normal function will execute.
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});


    } catch (error) {
        console.error(error.message);   
        res.status(500).send("Internal Server Error"); 
    }

})



module.exports = router;