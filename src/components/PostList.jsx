import React, { useEffect, useState } from 'react'
import {
    Table,
    Button,
    ButtonGroup,
} from "react-bootstrap";

import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../store/postSlice';
import { deletePosts } from '../store/postSlice';
import { getPost } from '../store/postSlice'
import { Link,useNavigate } from 'react-router-dom';


import Loading from './Loading';

const PostList = () => {

    const navigate =useNavigate()
    const dispatch = useDispatch()
    const { records, loading, error } = useSelector((state) => state.postSlice)
    let [selectedItem, setSelect] = useState([]);


    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])


    const deleteHandler = (el) => {
        if (window.confirm(`Are you sure you want to delete ${el.title}???`)) {
            dispatch(deletePosts(el.id))
        }
    }

    const addToSelect = (id, i) => {

        if (!selectedItem.includes(id)) {
            setSelect([...selectedItem, id])
        } else {
            setSelect(selectedItem.filter((item) => item !== id))
        }


    }
    const deleteSelectedItem = async () => {
        if (window.confirm(`Are you sure you want to delete`)) {
            selectedItem.forEach((item) => {
                dispatch(deletePosts(item))
                setSelect([])
            })
        }
    }
    const posts = records.map((el, i) => {
        return (
            <tr className='ani' key={el.id} title={el.description}
                style={{ background: selectedItem.includes(el.id) ? "#aaa" : "transparent" }}

            >
                <td onClick={() => { addToSelect(el.id, i) }} >{i + 1}</td>
                <td ><Link to={`post/${el.id}/detiles`}>{el.title}</Link></td>
                <td >
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="success">Edit</Button>
                        <Button variant="danger" onClick={() => { deleteHandler(el) }} >Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>)
        
    })


    return (
        <Loading error={error} loading={loading}>
            <Button
                variant="danger"
                style={{ display: selectedItem.length > 0 ? "block" : "none" }}
                onClick={deleteSelectedItem}
            >Delete Selected</Button>
            <Table className='ani' striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{ width: "70%" }}>Title</th>
                        <th style={{ width: "10%" }}>{records.length}</th>
                    </tr>
                </thead>
                <tbody>
                    {posts}
                </tbody>
            </Table>
        </Loading>
    )
}

export default PostList
