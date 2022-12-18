import { Notification } from './notification';

describe('Notification object', () => {
  // Testando se a validação do tamanho do content funciona (content maior que 4 e menor que 241)

  it('should not be able to create a notification content with less than 5 chars', () => {
    // ? Criando uma notificação com um conteúdo válido
    const notification = new Notification({
      userId: 'userId',
      content: 'maiorQue5',
      tag: 'tag',
    });

    expect(() => {
      // ? Transformando o conteúdo em um tamanho inválido (menor que 5 chars)
      notification.setContent('test');
    }).toThrowError(); // ? Esperando que mostre erro
  });

  it('should not be able to create a notification content with more than 240 chars', () => {
    // ? Criando uma notificação com um conteúdo válido
    const notification = new Notification({
      userId: 'userId',
      content: 'menorQue240',
      tag: 'tag',
    });

    expect(() => {
      // ? Transformando o conteúdo em um tamanho inválido (maior que 240 chars)
      notification.setContent('a'.repeat(250));
    }).toThrowError(); // ? Esperando que mostre erro
  });
});
