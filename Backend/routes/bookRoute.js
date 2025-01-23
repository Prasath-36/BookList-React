import express from 'express'
import {Book} from '../models/bookModel.js'

const router= express.Router()

//Saving a new book
router.post('/',async (request,response)=>{
    try{
        if(
            !request.body.title || 
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'Enter all required fields : title, author, publishYear'
            })
        }
        const newBook={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        }

        const book=await Book.create(newBook)
        return response.status(201).send(book)
    }   
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

//get all books from database
router.get('/',async (request,response)=>{
    try{
        const books=await Book.find({})
        return response.status(200).json({
            count:books.length,
            data:books
        })
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

//Getting one book from db by id
router.get('/:id',async (request,response)=>{
    try{

        const {id}=request.params
        const book=await Book.findById(id)
        return response.status(200).json(book)
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

//update a book
router.put('/:id',async (request,response)=>{
    try{
        if(!request.body.title || 
            !request.body.author ||
            !request.body.publishYear){
                return response.status(400).send({
                    message: 'Enter all required Fields : title,author,publishYear'
                })
            }
            const {id}=request.params
            const result=await Book.findByIdAndUpdate(id,request.body)
            if(!result){
                return response.status(404).json({
                    message:'Book not Found'
                })

            }
            return response.status(200).send({
                message:'Book Updated Successfully'
            })
    }catch(error){
        console.log(error.message)
        response.status(500).send({
            message: error.message
        })
    }
})

//deleting book
router.delete('/:id',async(request,response)=>{
    try{
        const {id}=request.params
        const result=await Book.findByIdAndDelete(id)

        if(!result){
            return response.status(404).json({
                message:'Book not Found'
            }) 
        }
        return response.status(200).send({
            message:'Book Deleted Successfully'
        })
    }catch(error){
        console.log(error.message)
        response.status(500).send({
            message: error.message
        })
    }
})

export default router
