# 🔄 Cómo Re-importar el Workflow en n8n (Resolver Error de Schema)

## ❗ Problema

Estás recibiendo el error:
```
"Received tool input did not match expected schema"
```

Esto ocurre porque **n8n está usando una versión antigua del workflow** que no tiene los schemas correctos en los tools.

---

## ✅ Solución: Re-importar el Workflow Actualizado

### Opción 1: Re-importar sobre el existente (Recomendado)

**Paso 1: Exportar para backup (opcional pero recomendado)**
```bash
En n8n:
1. Ir a Workflows
2. Seleccionar "Frepi MVP2 - Full Architecture with Supabase Validations"
3. Click en el menú (...)
4. "Download" → Guarda como backup
```

**Paso 2: Eliminar el workflow actual**
```bash
En n8n:
1. Ir a Workflows
2. Seleccionar "Frepi MVP2 - Full Architecture with Supabase Validations"
3. Click en el menú (...)
4. "Delete"
5. Confirmar eliminación
```

**Paso 3: Importar el workflow actualizado**
```bash
En n8n:
1. Click en "Import from File"
2. Seleccionar archivo:
   /home/user/n8n_frepi_agent/Frepi MVP2 - Full Architecture with Supabase Validations.json
3. Click "Import"
```

**Paso 4: Configurar credenciales**
```bash
El workflow importado necesita:

1. Supabase Credential:
   - Ir a cada nodo que use Supabase
   - Seleccionar tu credential de Supabase
   - O crear nueva con:
     - Host: tu-proyecto.supabase.co
     - Service Role Key: tu-key

2. OpenAI Credential:
   - Ir a nodos de Agent y Vector Search
   - Seleccionar tu credential de OpenAI
   - O crear nueva con tu API Key
```

**Paso 5: Activar y probar**
```bash
1. Click en "Active" (toggle arriba a la derecha)
2. Enviar mensaje de prueba via WhatsApp
3. Verificar que funcione sin el error
```

---

### Opción 2: Actualizar en el editor (Más rápido pero menos seguro)

Si no quieres eliminar el workflow, puedes intentar:

**Paso 1: Abrir el workflow en n8n**

**Paso 2: Por cada tool (11 tools en total):**

```bash
Tools a actualizar:
- onboarding_restaurant
- setup_buying_preferences
- search_products_vector
- build_shopping_cart
- execute_checkout
- show_customer_menu
- onboarding_supplier
- upload_supplier_prices
- normalize_product_list
- publish_to_catalog
- show_supplier_menu

Para cada uno:
1. Click en el nodo del tool
2. En el panel derecho, buscar "Specify Input Schema"
3. Cambiar a "Let the AI decide" (o "From AI")
4. Guardar
```

**Paso 3: Guardar workflow**
```bash
Ctrl/Cmd + S para guardar
```

**Paso 4: Desactivar y reactivar**
```bash
1. Desactivar workflow (toggle OFF)
2. Esperar 2 segundos
3. Activar workflow (toggle ON)
```

---

## 🔍 Verificar que Funcionó

### Antes de probar, verifica:

**En n8n UI:**
```bash
1. Abrir cualquier tool node (ej: onboarding_restaurant)
2. En "Specify Input Schema" debe decir:
   "Let the AI decide" o "From AI"
3. NO debe tener un schema manual con query/message
```

**En logs de n8n:**
```bash
Si el error persiste, revisa los logs en:
Docker: docker logs n8n-container
O en la UI de n8n: View → Executions → Ver detalles del error
```

---

## 🐛 Si el Error Persiste

### Verificación 1: Schema Type
```bash
1. Abrir un tool cualquiera
2. Verificar que "Specify Input Schema" = "From AI"
3. Si no, cambiarlo manualmente
```

### Verificación 2: Código del Tool
```bash
El código de cada tool debe tener al inicio:

const input = $input.first().json;
const userMessage = (input.query || input.message || '').trim();

Esto es compatible con cualquier schema.
```

### Verificación 3: Conexiones del Workflow
```bash
Verificar que:
1. WhatsApp Trigger → Prepare User Context
2. Prepare User Context → Customer/Supplier Journey Agent
3. Agent tiene conexión a TODOS los tools
```

### Verificación 4: Credenciales
```bash
Verificar que las credenciales estén configuradas:
- Supabase (en Prepare User Context y todos los tools)
- OpenAI (en Agent nodes y search_products_vector)
```

---

## 📝 Comandos de Prueba

Una vez re-importado, prueba con estos mensajes:

### Test 1: Onboarding (usuario nuevo)
```
> "registrar"
→ Debe iniciar onboarding_restaurant
→ Preguntar nombre del restaurante
```

### Test 2: Menu (usuario registrado)
```
> "menu"
→ Debe llamar show_customer_menu
→ Mostrar opciones
```

### Test 3: Configurar preferencias
```
> "configurar preferencias"
→ Debe llamar setup_buying_preferences
→ Preguntar por marcas preferidas
```

---

## ✅ Checklist Final

- [ ] Workflow antiguo eliminado o desactivado
- [ ] JSON actualizado importado
- [ ] Credenciales de Supabase configuradas
- [ ] Credenciales de OpenAI configuradas
- [ ] Todos los tools tienen schema "From AI"
- [ ] Workflow activado
- [ ] Test message enviado sin error

---

## 🆘 Si Nada Funciona

Si después de todo esto el error persiste:

1. **Comparte logs más detallados:**
   ```bash
   - El error completo del execution
   - El input que recibió el tool
   - El schema que esperaba
   ```

2. **Verifica versión de n8n:**
   ```bash
   n8n --version

   Debe ser >= 1.0.0 para usar Agents v2
   ```

3. **Prueba con un tool simple primero:**
   ```bash
   Crea un tool nuevo vacío:

   const input = $input.first().json;
   return JSON.stringify({ message: 'Test OK' });

   Schema: "From AI"

   Si este funciona, el problema es el código de los tools.
   Si este también falla, el problema es la configuración de n8n.
   ```

---

## 📞 Contacto

Si necesitas ayuda adicional, comparte:
1. Screenshot del error en n8n
2. Screenshot de la configuración de un tool
3. Logs completos de la ejecución

¡Buena suerte! 🚀
