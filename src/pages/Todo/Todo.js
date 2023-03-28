/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FcPlus } from 'react-icons/fc';
import { BiPen } from 'react-icons/bi';
import { TiTrash } from 'react-icons/ti';

import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

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

const AdditionInput = css`
    box-sizing: border-box;
    outline: none;
    border: none;
    border-bottom: 1px solid white;
    padding: 0px 50px 0px 10px;
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
    background-color: #eee;
`;

const AddButton = css`
    position: absolute;
    transform: translate(-50%);
    top: 20%;
    right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
    border: none;
    background-color: #ffffff00;
    transition: all 1s ease;
    cursor: pointer;
    &:hover {
        transform: translate(-50%) rotate(180deg) scale(1.5);

    }
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

const TodoContent = css`
    width: 85%;
    height: 40px;
`;

const ItemGroup = css`
    display: flex;
    align-items: center;
    height:40%;
`;

const ItemButton = css`
    display: flex;
    align-items: center;
    border: none;
    height: 100%;
    color: #999;
    background-color: #ffffff00;
    cursor: pointer;
    &:hover {
        color: #121221;
    }
`;


const Todo = () => {

    const [input, setInput] = useState({
        id: 0,
        content: '',
    });

    const [todoList, setTodoList] = useState([]);
    const todoId = useRef(1);

    const onChange = (e) => {
        setInput({
            ...input,
            content: e.target.value
        });
    }

    const onKeyUp = (e) => {
        if(e.keyCode === 13) {
            onClick();
        }

    }

    const onClick = () => {
        const todo = {
            ...input,
            id: todoId.current++
        }
        setTodoList([...todoList, todo]);
        setInput({...input, content:''});
    }

    const onRemove = (id) => {
        setTodoList(todoList.filter(
            todo => {
                return todo.id !== id;
            }
        ))
    }

    return (
        <div css={TodoContainer}>
            <div css={TodoAddition}>
                <input css={AdditionInput} type="text" placeholder="Add your new Todo" onChange={onChange} onKeyUp={onKeyUp} value={input.content}/>
                <button css={AddButton} onClick={onClick}><FcPlus /></button>
            </div>
            {todoList.map(
                todo => {
                    return (
                        <div css={TodoList} key={todo.id}> 
                            <div css={TodoContent}>{todo.content}</div>
                            <div css={ItemGroup}>
                                <button css={ItemButton}><BiPen/></button>
                                <button css={ItemButton} onClick={() => onRemove(todo.id)}><TiTrash/></button>
                            </div>
                        </div>
                  
                    );
                }
            )}
        </div>
    );
};

export default Todo;