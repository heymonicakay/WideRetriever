import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Retriever } from "./components/Retriever"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Retriever />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)