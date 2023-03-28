/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React, { useEffect, useRef, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import { BiPen } from 'react-icons/bi';
import { TiTrash } from 'react-icons/ti';

const TodoContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    width: 100%;
`;

const TodoAddition = css`
    position: sticky;
    top: 0px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-radius: 7px;
    padding: 10px;
    width: 600px;
    height: 60px;

    background-color: #eee;
`;

const TodoAddButton = css`
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 0;
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
    background-color: #ffffff00;
    transition: all 1s ease;
    cursor: pointer;
    &:hover {
        transform: translateY(-50%) rotate(180deg) scale(1.5);
    }
`;

const AdditionInput = css`
    box-sizing: border-box;
    outline: none;
    border: none;
    border-bottom: 3px solid white;
    padding: 0px 50px 0px 10px;
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
    background-color: #eee;
`;

const TodoList = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    border-radius: 7px;
    padding: 10px;
    width: 600px;

    background-color: #fafafa;

`;

const TodoContent =css`
    width: 85%;
    height: 40px;
`;

const ItemGroup =css`
    display: flex;
    align-items: center;
    height: 40px;
`;

const ItemButton=css`
    display: flex;
    align-items: center;
    border: none;
    height: 100%;
    color: #999;
    background-color: #ffffff00;
    cursor: pointer;
    &:hover{
        color: #121212;
    }
`;

const Todo = () => {

    const[isOpen, setIsOpen] = useState(false);

    const[modifyTodo, setModifyTodo] = useState ({
        id: 0,
        content: ''
    });

    const [input, setInput] = useState({
        id: 0,
        content :''
    });

    const[todoList, setTodoList] = useState([]);
    const todoId = useRef(1);

    const onChange = (e) => {

        setInput({
            ...input,
            content: e.target.value
        });
    }

    const onKeyUp = (e) => {
        if(e.keyCode === 13){
            onAdd();
        }
    }

    const onAdd = () => {
        const todo ={
            ...input,
            id: todoId.current++
        }
        setTodoList([...todoList, todo]);
        setInput({...input, content:''});
    }

    const onRemove = (id) => {
        setTodoList(todoList.filter(
            todo => {
                return todo.id !==id;
            }
        ))
    }   

    const updateTodo = (modifyTodo) => {
        setTodoList(
            todoList.map(
                todo => {
                    if(todo.id === modifyTodo.id){
                        todo.content = modifyTodo.content;
                    }
                    return todo;
                }
            )
        )
    }

    const openModal = (id) => {   
        setModifyTodo(todoList.filter(
            todo => todo.id === id
        )[0]);

        setIsOpen(true);
    }

    const modalContainer = css`
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        background-color: #000000aa;
        
    `;

    const modalBox = css`
        border-radius: 7px;
        width: 350px;
        height: 200px;
        background-color: #fafafa;
        overflow: hidden;

    `;

    const modalHeader = css`
        display: flex;
        justify-content: center;
        align-items: center;

        border-bottom: 1px solid #dbdbdb;
        height: 40px;
    `;

    const modalTitle = css`
        font-size: 18px;
        font-weight: 600;
    `;

    const modalMain = css`
        display: flex;
        justify-content: center;
        align-items: center;

        border-bottom: 1px solid #dbdbdb;
        height: 120px;
    `;

    const modalInput = css`
        border: none;
        outline: none;
        border-bottom: 2px solid green;
        width: 90%;
        height: 30px;
        background-color: #fafafa;
    `;

    const modalFooter = css`
        display: flex;
        justify-content: center;
        align-items: center;

        height: 40px;
    `;

    const modalButton = css`
        border: none;
        background-color: #ffffff00;
        width: 50%;
        height: 100%;
        font-weight: 600;
        cursor: pointer;

        &:first-of-type {
            border-right:1px solid #dbdbdb ;
        }
        &:hover {
            background-color: #eee;
        }
        &:active {
            background-color: #dbdbdb;
        }
    `;  


    const Modal = (props) => {

        const modalRef = useRef();
        const [modalContent, setModalContent] = useState('');
        
        useEffect(
            () => {
                setModalContent(props.todo.content);

                const handler = (e) =>{
                   if(!modalRef.current.contains(e.target)){
                        props.setIsOpen(false);
                   }
                }
                document.addEventListener('mousedown', handler);
                return () => {
                    document.removeEventListener("mousedown", handler);
                } 
            }, []

        );

        

        const closeModal = () => {
            props.setIsOpen(false);
        }

        const contentChange = (e) => {
            setModalContent(e.target.value);
        }

        const onSubmit = () => {
            props.updateTodo({
                id: props.todo.id,
                content: modalContent
            });
            closeModal();

        }

        return (
            <div css={modalContainer}>
                <div css={modalBox}  ref={modalRef}> 
                    <header css={modalHeader}>
                        <h1 css={modalTitle}>{props.title}</h1>
                    </header>
                    <main css={modalMain}>
                        <input type="text" css={modalInput} onChange={contentChange} defaultValue={props.todo.content} />
                    </main>
                    <footer css={modalFooter}>
                        <button css={modalButton} onClick={onSubmit}>확인</button>
                        <button css={modalButton} onClick={closeModal}>취소</button>
                    </footer>
                </div>
            </div>
        );
    } 

     
    return(
        <>
        
        
        <div css = {TodoContainer}>
            <div css={TodoAddition}>
                <input css={AdditionInput} type="text" placeholder="Add your new Todo" onChange={onChange} onKeyUp={onKeyUp} value={input.content}/>
                <button css = {TodoAddButton} onClick={onAdd}><FcPlus/></button>
            </div>
            {todoList.map(
                todo => {
                    return(
                        <div css={TodoList} key={todo.id}>
                            <div css={TodoContent}>{todo.content}</div>
                            <div css={ItemGroup}>
                                <button css={ItemButton} onClick={() => openModal(todo.id)}><BiPen/></button>
                                <button css={ItemButton} onClick={() => onRemove(todo.id)}><TiTrash/></button>
                            </div>
                        </div>
                    );
                }
            )}
        </div>
        {isOpen ? (<Modal title={'Edit Todo'} todo={modifyTodo} setIsOpen ={setIsOpen} updateTodo={updateTodo} />) : ''}

        </>
    );
}

export default Todo;