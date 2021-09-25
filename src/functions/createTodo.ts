import { v4 as uuidV4 } from 'uuid';
import dayjs from 'dayjs';

import { document } from "../utils/dynamodbClient";

interface IRequest {
  user_id: string;
  title: string;
  deadline: string;
}

export const handle = async (event) => {
  const { user_id, title, deadline } = JSON.parse(event.body) as IRequest

  const id = uuidV4();

  await document.put({
    TableName: 'todos',
    Item: {
      id,
      user_id,
      title,
      done: false,
      deadline: dayjs(deadline).format('YYYY-MM-DD HH:mm:ss'),
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Criado com sucesso!',
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}
