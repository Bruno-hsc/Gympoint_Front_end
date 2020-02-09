/*
-> useState: é o hook que vai pertencer a uma functio pra criar estados sem
 escrever ela no formato de classe.

 -> useEffect: é o hook que sobreponhe os metados de ciclo de vida que tinhamos
 anteriormente na aplicação que era os didMount etc.

-> useMemo: é usado para fazer algum tipo de calculo mais complexo, chamar
functions, retornar valor etc. coisas que nao precisa ser chamas todas as vezes
que o componente renderiza, so quando alguma inf altera. Por exp: mostrar quantos
itens add ao local storage, essa inf so vai precisar ser atualizada quando a inf
de tech altera.

-> useCallback: é como se fosse um useMemo mas no lugar de retornar um unico
valor ele retorna uma function. Serve para functions como a handleAdd que é uma
function, vamos usar ele no lugar para nao chamar uma function de dentro de outra.
usando ela, a function handleAdd so vai ser recriada quando houver alteração nas
vars newTech e tech.

-> useSelector : recebe uma function que recebe o estado inteiro e retorna a
info que queremos do estado. Allows you to extract data from the Redux store
state, using a selector function.

-> useDispach : para disparar as actions
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // agora criamos estados dentro da propria function. Para cada tipo de informa-
  // ção dentro de um componente vamos ter um estado separado.
  // Para cada estado temos um useState separado.
  // O useState retorna um array, vamos fazer a desestruturação, a 1 posição
  // retorna desse array retorna o stado em si, nesse caso será a nossa lista
  // de tecnologia. A segunda posição é uma function que serve para atualizar
  // as inf do estado.
  //  useState(['ReactJS', 'React Native']); estamos dizendo que esse estado vai
  // iniciar com reactJS e react native
  // A function setTech vai atualizar o estado, antes tinha o this.setState que
  // servia para atualizar todos os estados de uma so vez, agora vamos atualizar
  // um estado por vez
  const [tech, setTech] = useState([]);

  // criando um estado para armazenar o valor de um imput
  const [newTech, setNewTech] = useState('');

  // toda vez que add uma nova tech atualiza o estado e renderiza novamente.
  // como vamos usar o useCallback precisa passar o array de depndencias.
  const handleAdd = useCallback(() => {
    // lembrando o stado é imutavel, por isso copiamos tudo ... para criar um
    // novo estado.
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  // aqui ele vai execultar apenas uma vez passando um array fazil diferente do
  // exp abaixo, passando tech ele fica monitorando o tech e alterando sempre
  // que tem modificações. Assim o hook vai execultar so uma vez, so quando o
  // componente montar em tela. Esse hook execulta uma unica vez buscando as inf
  // no local storage e mostrando em tela, ou seja, se atualizar a pagina ele
  // vai continuar buscando as inf.
  useEffect(() => {
    // buscar as tech no local storage
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }

    /* se quiser remover um eventListener
    return ()=> {
      document.removeEventListener()
    }
    */
  }, []);

  // tech.length é o valor que queremos ',' as dependencias, ou seja, de acordo
  // com quais valores que vao alterar, queremos recalcular esse valor.
  // OU SEJA, a var techsize so vai ser alterada se o valor da var tech for
  // modificada
  const techSize = useMemo(() => tech.length, [tech]);

  // useEffect que esta no lugar dos metados de ciclo de vida
  // 1 param é a function que vai ser execultada, 2 param quando ele vai ser
  // execultada, ele é um array de dependecias que fica monitorando altera-
  // çoes em certas variaveis. EXP: passando }, [tech]) como segundo param
  // a function do 1 param será execultada toda vez que o valor de tech for
  // alterado
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>You have {techSize} technologies</strong> <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </>
  );
}

export default App;
