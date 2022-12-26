import { randomUUID } from 'crypto';
import { NotificationNotFound } from '../errors/notification-error';

// ? Definindo a interface que vai ser usada na nossa classe
export interface NotificationProps {
  userId: string;
  content: string;
  tag: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt?: Date | null;
}

// ? Criando a entidade de notificação

export class Notification {
  private _id: string;
  private props: NotificationProps; // ? armazenar todos os atributos em um objeto com o tipo da interface criada

  // métodos de validação
  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  // construtor
  constructor(props: NotificationProps, id?: string) {
    this._id = id ?? randomUUID();
    // ? se o content não passar no método de validação de tamanho, irá dar erro

    const isContentLengthValid = this.validateContentLength(props.content);
    if (!isContentLengthValid) {
      throw new NotificationNotFound();
    }

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(), // ? Se for mandado nulo, fica com o valor da data atual
    };
  }

  // métodos getters e setters

  public getId(): string {
    return this._id;
  }

  public getUserId(): string {
    return this.props.userId;
  }

  public setUserId(userId: string) {
    this.props.userId = userId;
  }

  public getContent(): string {
    return this.props.content;
  }

  public setContent(content: string) {
    const isContentLengthValid = this.validateContentLength(content);
    if (!isContentLengthValid) {
      throw new NotificationNotFound();
    }
    this.props.content = content;
  }

  public getTag(): string {
    return this.props.tag;
  }

  public setTag(tag: string) {
    this.props.tag = tag;
  }

  public getReadAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public setCanceledAt() {
    this.props.canceledAt = new Date();
  }

  public getCanceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public setReadAt() {
    this.props.readAt = new Date();
  }

  public getCreatedAt(): Date | null | undefined {
    return this.props.createdAt;
  }
}
