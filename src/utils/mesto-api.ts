
import {getResponse} from './utils';

export type MestoApiConfig = {
  address: string,
  token: string,
  groupId: string
}

export type UserData = {
  about: string,
  avatar: string,
  cohort: string,
  name: string,
  _id: string,
}


export type CardData = {
  createdAt: string,
  likes: Array<UserData>
  link: string,
  name: string,
  owner: UserData
  _id: string,
}

export type CardSendData = {
  name: string, 
  link: string
}

export type UserInfoData = {
  name: string,
  about: string,
}

export type UserAvatarData = {
  avatar: string,
}

class MestoApi {
  _address: string;
  _token: string;
  _groupId: string;

  constructor({ address, token, groupId }: MestoApiConfig) {
    this._token = token;
    this._groupId = groupId;
    this._address = address;
  }

  getCardList():Promise<Array<CardData>> {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
      .then(getResponse)
  }

  addCard(data : CardSendData): Promise<CardData> {
    return fetch(`${this._address}/${this._groupId}/cards/`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(getResponse)
  }

  removeCard(cardID: string): Promise<{message: string}> {
    return fetch(`${this._address}/${this._groupId}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
      .then(getResponse) 
  }

  getUserInfo():Promise<UserData> {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
      .then(getResponse)
  }

  setUserInfo(data: UserInfoData): Promise<UserData> {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(getResponse) 
  }

  setUserAvatar(data: UserAvatarData): Promise<UserData> {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(getResponse)
      
  }

  changeLikeCardStatus(cardID: string, like: boolean):Promise<CardData> {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardID}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    })
      .then(getResponse)
  }
}



export default MestoApi;
