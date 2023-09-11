import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom"


export default function Comments() {

    const baseApi = 'https://jsonplaceholder.typicode.com/comments'
    const [comments, setComments] = useState<any>([])

    const getData = () => {
        axios.get(`${baseApi}`)
            .then((res) => {
                console.log(res.data)
                setComments([...res.data])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const navigate = useNavigate()
    const addComment = () => {
        navigate(`/add`)
    }

    const deleteComment = (id: number) => {
        axios.delete(`${baseApi}/${id}`)
            .then(() => {
                console.log("Post Deleted Successfully")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Box style={{ background: "linear-gradient(to right, #0b486b, #f56217)" }} className="text-center">
                <Typography variant="h3">COMMENTS</Typography>
                <Button onClick={addComment} variant="contained">Add Comment</Button>

                <Box className="container text-center d-flex flex-column align-items-center">
                    {comments.map((x: any, i: number) => {
                        return (
                            <Box className="border rounded-pill" style={{ backgroundColor: "lightgrey", margin: 20, padding: 20, width: 800 }}>

                                <Typography>
                                    <span className="fw-bold fs-5">Post Id </span>: {x.postId}
                                </Typography>
                                <Typography>
                                    <span className="fw-bold fs-5">Name </span>: {x.name}
                                </Typography>

                                <Typography>
                                    <span className="fw-bold fs-5">Email </span>: {x.email}
                                </Typography>

                                <Typography>
                                    <span className="fw-bold fs-5">Comment </span>: {x.body}
                                </Typography>
                                <EditIcon
                                    onClick={() => {
                                        navigate(`/add/${x.id}`);
                                    }}
                                    className="text-primary fs-2 m-2" />
                                <DeleteIcon
                                    onClick={() => { deleteComment(x.id) }}
                                    className="text-danger fs-2 m-2" />
                            </Box>
                        )
                    })}
                </Box>

            </Box >
        </>
    )
}
