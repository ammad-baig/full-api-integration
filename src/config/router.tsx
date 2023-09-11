import { BrowserRouter, Routes, Route } from "react-router-dom";
import Comments from "../pages/comments";
import AddComments from "../pages/AddComments";


export default function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Comments />} />
                    <Route path="/add" element={<AddComments />} />
                    <Route path="/add/:id" element={<AddComments />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
