#!/bin/sh

echo "⏳ Aguardando o PostgreSQL ficar disponível..."

until nc -z db 5432; do
  sleep 1
done

echo "✅ Banco de dados disponível! Iniciando aplicação..."
exec "$@"