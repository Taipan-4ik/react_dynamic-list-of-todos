/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [eyeWasPressed, setEyeWasPressed] = useState(false);
  const [choisedTodo, setChoisedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(fetchedTodos => {
      setTodos(fetchedTodos);
      setVisibleTodos(fetchedTodos);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setVisibleTodos={setVisibleTodos} />
            </div>

            <div className="block">
              {!visibleTodos.length && <Loader />}
              <TodoList
                eyeWasPressed={eyeWasPressed}
                visibleTodos={visibleTodos}
                setEyeWasPressed={setEyeWasPressed}
                setChoisedTodo={setChoisedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {eyeWasPressed && (
        <TodoModal
          setEyeWasPressed={setEyeWasPressed}
          choisedTodo={choisedTodo}
          setChoisedTodo={setChoisedTodo}
        />
      )}
    </>
  );
};
