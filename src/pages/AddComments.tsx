import { Box, Typography, Input, TextField, Button } from '@mui/material'
import axios from "axios"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"


export default function AddComments() {

    const baseApi = 'https://jsonplaceholder.typicode.com/comments'

    const [model, setModel] = useState<any>({})

    const addComment = () => {
        axios.post(baseApi, model)
            .then((res) => {
                console.log("Comment Added Successfully" + res.data)
                setModel({ ...res.data })
            })
    }

    const params = useParams()

    const getDataById = () => {
        axios.get(`${baseApi}/${params.id}`)
            .then((res) => {
                setModel({ ...res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const updateComment = () => {
        axios.put(`${baseApi}/${params.id}`, model)
            .then((res) => {
                console.log("Post Updated Successfully ==>", res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getDataById()
    }, [])




    return (
        <>
            <Box style={{ height: "100vh", background: "linear-gradient(90deg, #fcff9e 0%, #c67700 100% )" }} className=" d-flex flex-column justify-content-center text-center ">
                <Typography className="pb-5 fw-bold" variant='h3'>
                    {params.id ? "Edit Comment" : "Add Comment"}
                </Typography>

                <Box>
                    <TextField
                        value={model.name}
                        onChange={(e: any) => {
                            setModel({ ...model, name: e.target.value })
                        }}
                        className="w-25 p-2 my-3" id="outlined-basic" placeholder='Name' variant="outlined" />
                </Box>
                <Box>
                    <TextField
                        value={model.email}
                        onChange={(e: any) => {
                            setModel({ ...model, email: e.target.value })
                        }}
                        className="w-25 p-2" id="outlined-basic" placeholder="Email" variant="outlined" />
                </Box>
                <Box>
                    <TextField
                        value={model.body}
                        onChange={(e: any) => {
                            setModel({ ...model, body: e.target.value })
                        }}
                        className="w-25 p-2"
                        id="outlined-multiline-static"
                        placeholder="Comments"
                        multiline
                        rows={4}
                    />
                </Box>
                <Box>
                    {params.id ? (
                        <Button onClick={updateComment} variant="contained">Update</Button>
                    ) : (
                        <Button onClick={addComment} variant="contained">Submit</Button>
                    )}
                </Box>
            </Box>

        </>
    )
}
