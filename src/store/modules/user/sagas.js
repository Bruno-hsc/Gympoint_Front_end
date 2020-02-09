import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

// aqui criamos o saga, ele recebe a action e dentro vem o payload
export function* updateProfile({ payload }) {
  try {
    // pegamos o nome a senha e todo o restante colocamos dentro de uma var
    // chamada res
    const { name, email, avatar_id, ...rest } = payload.data;

    // o  Object.assign serve para unir 2 objts
    // entao criamos um obj que contem nome e email que sao os dados que vao
    // em todas as requisiçoes
    // se tiver alguma coisa dentro do campo oldPassword que quer dizer que o
    // user quer preencher uma nova senha ai sim inclui todo o restante das inf
    // com a var rest, se nao coloca um obj fazio
    const profile = Object.assign({name,email,avatar_id}, rest.oldPassword ? rest : {});// eslint-disable-line


    // o profile é o que vamos usar para afzer a chamada a api. Vai pegar altomati
    // camente o user logado na rota user e as inf vai ser o que ta contido em pro
    // file
    const response = yield call(api.put, 'users', profile);

    // se deu tudo certo vamos disparar o toasty
    toast.success('The profile has been updated');

    // put na action, aaqui passamos o response.data que são os novos dados
    // do perfil para atualizar dentro da nossa pagina
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Error updating profile');

    yield put(updateProfileFailure());
  }
}

export default all([
  // quando a cation ...PROFILE_REQUEST for disparada vai execultar um saga
  // updateProfile
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);
