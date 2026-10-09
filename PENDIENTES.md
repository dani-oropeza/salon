# Pendientes por confirmar con el negocio

Para el diseño se usaron valores supuestos (marcados `PENDIENTE` en el código).
Casi todos se editan en **`lib/site.ts`**, **`lib/packages.ts`** y **`lib/content.ts`**.

## Datos de contacto (`lib/site.ts`)
- [ ] Número de WhatsApp real (`whatsappNumber`, `whatsappDisplay`). **Ahora es un número de ejemplo.**
- [ ] Dirección exacta, ciudad (se asumió Cochabamba) y coordenadas para el mapa (`lat`, `lng`, `mapsUrl`).
- [ ] Redes sociales: Instagram, Facebook y TikTok (poner `null` para ocultar una).
- [ ] Horario de atención y visitas (`attentionHours`).
- [ ] Dominio final (`NEXT_PUBLIC_SITE_URL`).

## Operación
- [ ] Turnos de 5 horas: se asumieron **10:00–15:00** y **16:00–21:00** (`shifts`).
- [ ] Aforo total recomendado: se asumieron **80 personas** (36 niños + 45 adultos sentados, según el catálogo).
- [ ] Edad recomendada de los juegos: se asumió **2 a 12 años** (FAQ).
- [ ] ¿El salón es exclusivo por turno? Se asumió que **sí**.

## Reservas y pagos (`policies`)
- [ ] Anticipo para reservar: se asumió **50 %**.
- [ ] Cuándo se paga el saldo: se asumió **el día del evento, antes de iniciar**.
- [ ] Reprogramación: se asumieron **7 días** de aviso.
- [ ] ¿Hay garantía reembolsable por daños? (No se mencionó en la web.)

## Promo de inauguración (`promo`)
- [ ] Fecha de fin de la promo (`until`). Hoy dice "por inauguración" sin fecha.
- [x] Monto: Bs 500 de descuento en cada paquete (del catálogo).
- [ ] Confirmar precios del **Paquete Aventura**: se interpretó **Bs 2.800 regular → Bs 2.300 promo** (el PDF no deja claro cuál es cuál).

## Adicionales (`lib/packages.ts`): precios estimados
Se calcularon a partir de la diferencia entre paquetes, con un pequeño recargo al
pedirlos sueltos, para que el paquete siempre convenga:

| Adicional | Precio supuesto | Cómo se calculó |
|---|---|---|
| Show de payaso | Bs 750 | Aventura − Explorador = Bs 800 (payaso + invitación) |
| Invitación virtual | Bs 150 | ídem |
| Fotografía y video | Bs 1.300 | Selva VIP − Aventura = Bs 1.100 |
| Pintacaritas | Bs 250 | Se ve en las fotos de eventos; confirmar si se ofrece |
| Hora adicional | Bs 300 / h | ≈ 1/5 del precio base, redondeado |

- [ ] Confirmar o corregir cada precio, y si hay otros adicionales (globos, piñata, catering, etc.).
- [ ] ¿Qué incluye exactamente el show de payaso (duración, juegos, burbujas)?

## Contenido
- [ ] **Video de la fiesta (`RECORTADO.mp4`)**: es el video personal de un cumpleaños (aparece el cartel "Feliz cumpleaños Lucy" y la cara de la niña y su familia). Confirmar el permiso de esa familia para usarlo en la web. El avance ya evita el cartel con el nombre.
- [ ] ¿El video tiene música comercial? Si es así, conviene cambiarla por música libre de derechos antes de publicarlo.
- [ ] Permiso de las familias para publicar las fotos de niños en eventos.
- [ ] Testimonios reales de clientes (la sección no se incluyó para no inventar reseñas).
- [ ] Revisar las respuestas de las preguntas frecuentes (`faqs` en `lib/content.ts`).
