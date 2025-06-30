#!/bin/bash

# Script para verificar el estado de los servicios Docker del backend LTI ATS

echo "🔍 Verificando servicios Docker del LTI ATS Backend..."
echo "=================================================="

# Verificar que Docker esté corriendo
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker no está corriendo. Por favor, inicia Docker Desktop."
    exit 1
fi

echo "✅ Docker está corriendo"

# Verificar servicios de desarrollo
echo ""
echo "📊 Estado de servicios de desarrollo:"
echo "------------------------------------"

services=("lti-ats-api-dev" "lti-ats-db-dev" "lti-ats-pgadmin-dev" "lti-ats-mailpit-dev")
for service in "${services[@]}"; do
    if docker ps --format "table {{.Names}}" | grep -q "^$service$"; then
        status=$(docker ps --filter "name=$service" --format "{{.Status}}")
        echo "✅ $service: $status"
    else
        echo "❌ $service: No está corriendo"
    fi
done

echo ""
echo "🌐 URLs disponibles (desarrollo):"
echo "---------------------------------"
echo "• API Backend:     http://localhost:3000"
echo "• Health Check:    http://localhost:3000/health"
echo "• pgAdmin:         http://localhost:8080"
echo "• MailPit:         http://localhost:8025"

echo ""
echo "💡 Comandos útiles:"
echo "------------------"
echo "• Iniciar desarrollo: npm run docker:dev:build"
echo "• Ver logs:          npm run docker:dev:logs"
echo "• Detener:           npm run docker:dev:down"

echo ""
echo "🔗 Para probar la API, ejecuta:"
echo "curl http://localhost:3000/health"

echo ""
echo "==================================================" 