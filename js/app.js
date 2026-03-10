// ==================== UNAS PAGOS - SISTEMA INTELIGENTE ====================
// Autor: CTIC-UNAS
// Versión: 2.0

// ==================== DATA SIMULATION ====================
const MOCK_USERS = {
    '72345678': {
        dni: '72345678',
        nombres: 'MARIA FERNANDA',
        apellidos: 'QUISPE HUAMAN',
        tipo: 'pregrado',
        codigo: '2019230045',
        facultad: 'Ingeniería en Informática y Sistemas',
        email_institucional: 'mfquispe@unas.edu.pe',
        academico: {
            ciclo_actual: '2024-II',
            creditos_matriculados: 18,
            cursos_jalados: 2,
            promedio: 13.5
        },
        deudas: {
            tiene_deuda: true,
            conceptos_pendientes: ['Artes y Cultura', 'Derecho de Examen'],
            monto_total: 100
        },
        biblioteca: {
            libros_prestados: 2,
            multas: 0
        },
        idiomas: {
            inscrito: false,
            nivel: null
        }
    },
    '45678912': {
        dni: '45678912',
        nombres: 'CARLOS ALBERTO',
        apellidos: 'RODRIGUEZ MENDOZA',
        tipo: 'posgrado',
        codigo: '2022130012',
        programa: 'Maestría en Gestión Pública',
        email_institucional: 'carodriguez@unas.edu.pe',
        academico: {
            ciclo_actual: '2024-II',
            creditos_matriculados: 12,
            cursos_jalados: 0,
            promedio: 16.2
        },
        deudas: {
            tiene_deuda: false,
            conceptos_pendientes: [],
            monto_total: 0
        },
        biblioteca: {
            libros_prestados: 5,
            multas: 15
        },
        idiomas: {
            inscrito: true,
            nivel: 'Inglés Intermedio II'
        }
    },
    '78912345': {
        dni: '78912345',
        nombres: 'LUCIA ESPERANZA',
        apellidos: 'TORRES SILVA',
        tipo: 'idiomas',
        codigo: 'EXT-2024-0089',
        programa: 'Centro de Idiomas',
        email_institucional: null,
        academico: null,
        deudas: {
            tiene_deuda: false,
            conceptos_pendientes: [],
            monto_total: 0
        },
        biblioteca: null,
        idiomas: {
            inscrito: true,
            nivel: 'Inglés Básico I'
        }
    }
};

const SERVICES = [
    { id: 's1', title: 'Matrícula Regular Pregrado - 2024-II', price: 180, type: 'pregrado', desc: 'Presentarse en DIAA' },
    { id: 's2', title: 'Reserva de Matrícula', price: 25, type: 'pregrado', desc: 'Reserva por semestre' },
    { id: 's3', title: 'Constancia de Estudios', price: 30, type: 'pregrado', desc: 'Trámite 3 días hábiles' },
    { id: 's4', title: 'Matrícula Posgrado - Gestión Pública', price: 200, priceDiscount: 160, type: 'posgrado', desc: 'Descuento maestrista -20%' },
    { id: 's5', title: 'Pensión Mensual Posgrado', price: 300, type: 'posgrado', desc: 'Cuota mensual' },
    { id: 's6', title: 'Sustentación de Tesis', price: 450, type: 'posgrado', desc: 'Derecho de sustentación' },
    { id: 's7', title: 'Matrícula Inglés Básico I', price: 150, type: 'idiomas', desc: 'Centro de Idiomas' },
    { id: 's8', title: 'Examen de Suficiencia Inglés', price: 80, type: 'idiomas', desc: 'Certificación' },
    { id: 's9', title: 'Matrícula Portugués Básico', price: 120, type: 'idiomas', desc: 'Centro de Idiomas' }
];

// ==================== STATE ====================
let currentUser = null;
let userEmail = '';
let cartItems = [];
let sessionHistory = [];
let currentPaymentData = null;

// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', () => {
    // DNI input enter key
    document.getElementById('dniInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') validateDNI();
    });

    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
    }

    // Expiry date formatting
    const expiryInput = document.getElementById('cardExpiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', formatExpiry);
    }
});

// ==================== LOGIN FLOW ====================
function goToLoginStep(step) {
    document.querySelectorAll('.login-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`loginStep${step}`).classList.add('active');
}

function validateDNI() {
    const dni = document.getElementById('dniInput').value.trim();
    if (dni.length !== 8) {
        showToast('Ingresa un DNI válido de 8 dígitos', 'error');
        return;
    }

    goToLoginStep(2); // Show loading

    // Simulate API call to RENIEC + internal systems
    setTimeout(() => {
        const user = MOCK_USERS[dni];
        if (user) {
            currentUser = user;
            showUserPreview(user);
            goToLoginStep(3);
        } else {
            // User not found - external user
            currentUser = {
                dni: dni,
                nombres: 'USUARIO',
                apellidos: 'EXTERNO',
                tipo: 'externo',
                codigo: `EXT-${Date.now()}`,
                academico: null,
                deudas: { tiene_deuda: false, conceptos_pendientes: [], monto_total: 0 },
                biblioteca: null,
                idiomas: null
            };
            showUserPreview(currentUser);
            goToLoginStep(3);
        }
    }, 1500);
}

function showUserPreview(user) {
    document.getElementById('previewName').textContent = `${user.nombres} ${user.apellidos}`;
    document.getElementById('previewDni').textContent = `DNI: ${user.dni}`;
    
    const badges = {
        'pregrado': 'Pregrado',
        'posgrado': 'Maestrista',
        'idiomas': 'Idiomas',
        'externo': 'Externo'
    };
    document.getElementById('previewBadge').textContent = badges[user.tipo] || 'Usuario';

    // Show API data
    let apiCardsHtml = '';

    if (user.academico) {
        apiCardsHtml += `
            <div class="api-card">
                <div class="api-card-icon academic"><i class="fas fa-graduation-cap"></i></div>
                <div class="api-card-info">
                    <div class="api-card-label">Sistema Académico</div>
                    <div class="api-card-value">Ciclo ${user.academico.ciclo_actual} • ${user.academico.creditos_matriculados} créditos</div>
                </div>
                <span class="api-card-status ${user.academico.cursos_jalados > 0 ? 'warning' : 'ok'}">
                    ${user.academico.cursos_jalados > 0 ? user.academico.cursos_jalados + ' jalados' : 'OK'}
                </span>
            </div>
        `;
    }

    if (user.deudas) {
        apiCardsHtml += `
            <div class="api-card">
                <div class="api-card-icon financial"><i class="fas fa-file-invoice-dollar"></i></div>
                <div class="api-card-info">
                    <div class="api-card-label">Sistema de Deudas</div>
                    <div class="api-card-value">${user.deudas.tiene_deuda ? 'S/ ' + user.deudas.monto_total + ' pendiente' : 'Sin deudas pendientes'}</div>
                </div>
                <span class="api-card-status ${user.deudas.tiene_deuda ? 'warning' : 'ok'}">
                    ${user.deudas.tiene_deuda ? 'Pendiente' : 'OK'}
                </span>
            </div>
        `;
    }

    if (user.biblioteca) {
        apiCardsHtml += `
            <div class="api-card">
                <div class="api-card-icon library"><i class="fas fa-book"></i></div>
                <div class="api-card-info">
                    <div class="api-card-label">Biblioteca</div>
                    <div class="api-card-value">${user.biblioteca.libros_prestados} libros • ${user.biblioteca.multas > 0 ? 'S/ ' + user.biblioteca.multas + ' multa' : 'Sin multas'}</div>
                </div>
                <span class="api-card-status ${user.biblioteca.multas > 0 ? 'warning' : 'ok'}">
                    ${user.biblioteca.multas > 0 ? 'Multa' : 'OK'}
                </span>
            </div>
        `;
    }

    if (user.idiomas) {
        apiCardsHtml += `
            <div class="api-card">
                <div class="api-card-icon idiomas"><i class="fas fa-language"></i></div>
                <div class="api-card-info">
                    <div class="api-card-label">Centro de Idiomas</div>
                    <div class="api-card-value">${user.idiomas.inscrito ? user.idiomas.nivel : 'No inscrito'}</div>
                </div>
                <span class="api-card-status ok">${user.idiomas.inscrito ? 'Activo' : 'N/A'}</span>
            </div>
        `;
    }

    document.getElementById('apiCards').innerHTML = apiCardsHtml || '<p style="font-size: 0.8rem; color: var(--text-muted);">No se encontraron registros en sistemas internos</p>';

    // Show alert for deudas
    if (user.deudas && user.deudas.tiene_deuda) {
        document.getElementById('alertDeudas').style.display = 'flex';
    } else {
        document.getElementById('alertDeudas').style.display = 'none';
    }

    // Pre-fill email
    if (user.email_institucional) {
        document.getElementById('emailInput').value = user.email_institucional;
    }
}

function confirmUser() {
    const email = document.getElementById('emailInput').value.trim();
    if (!email || !email.includes('@')) {
        showToast('Ingresa un correo válido', 'error');
        return;
    }

    userEmail = email;
    initializeApp();
}

// ==================== APP INITIALIZATION ====================
function initializeApp() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('appContainer').classList.remove('hidden');

    // Update header
    document.getElementById('headerUserName').textContent = currentUser.nombres.split(' ')[0];
    const tipos = { pregrado: 'Pregrado', posgrado: 'Maestrista', idiomas: 'Idiomas', externo: 'Externo' };
    document.getElementById('headerUserType').textContent = tipos[currentUser.tipo];

    // Update welcome
    document.getElementById('welcomeName').textContent = `¡Hola, ${currentUser.nombres.split(' ')[0]}!`;
    document.getElementById('welcomeMeta').textContent = `DNI: ${currentUser.dni} • ${currentUser.codigo}`;
    document.getElementById('welcomeBadge').textContent = tipos[currentUser.tipo];

    // Add auto items for deudas
    cartItems = [];
    if (currentUser.deudas && currentUser.deudas.tiene_deuda) {
        currentUser.deudas.conceptos_pendientes.forEach((concepto, i) => {
            cartItems.push({
                id: `auto${i}`,
                title: concepto,
                price: 50,
                auto: true
            });
        });

        document.getElementById('mainAlert').style.display = 'flex';
        document.getElementById('alertText').textContent = `Por cursos jalados: ${currentUser.deudas.conceptos_pendientes.join(' + ')}`;
    }

    // Update stats
    updateStats();

    // Render components
    renderApiStatus();
    renderServices();
    updateAllCarts();
    renderHistory();
    renderProfile();
}

function updateStats() {
    const total = cartItems.reduce((s, i) => s + i.price, 0);
    document.getElementById('statPendientes').textContent = cartItems.length;
    document.getElementById('statMonto').textContent = `S/ ${total}`;
    document.getElementById('statPagados').textContent = sessionHistory.length;
}

function renderApiStatus() {
    let html = '';

    if (currentUser.academico) {
        html += `
            <div class="api-status-card">
                <div class="api-status-icon academic"><i class="fas fa-graduation-cap"></i></div>
                <div class="api-status-info">
                    <div class="api-status-title">Sistema Académico</div>
                    <div class="api-status-value">Promedio: ${currentUser.academico.promedio} • ${currentUser.academico.cursos_jalados} jalados</div>
                </div>
            </div>
        `;
    }

    if (currentUser.biblioteca && currentUser.biblioteca.multas > 0) {
        html += `
            <div class="api-status-card">
                <div class="api-status-icon biblioteca"><i class="fas fa-book"></i></div>
                <div class="api-status-info">
                    <div class="api-status-title">Biblioteca</div>
                    <div class="api-status-value">Multa pendiente: S/ ${currentUser.biblioteca.multas}</div>
                </div>
            </div>
        `;
    }

    document.getElementById('apiStatusGrid').innerHTML = html;
}

// ==================== SERVICES ====================
function renderServices() {
    const list = document.getElementById('serviceList');
    let html = '';

    // Auto items first
    cartItems.filter(i => i.auto).forEach(item => {
        html += `
            <div class="service-card auto-added selected" data-id="${item.id}" data-auto="true">
                <div>
                    <div class="service-title">${item.title}</div>
                    <div class="service-meta">
                        <span class="service-tag auto">Obligatorio</span>
                    </div>
                </div>
                <div class="service-right">
                    <div class="service-price">S/ ${item.price.toFixed(2)}</div>
                    <div class="service-checkbox"><i class="fas fa-lock"></i></div>
                </div>
            </div>
        `;
    });

    // Regular services
    SERVICES.forEach(service => {
        const isSelected = cartItems.some(i => i.id === service.id);
        html += `
            <div class="service-card ${isSelected ? 'selected' : ''}" data-id="${service.id}" data-type="${service.type}" onclick="toggleService('${service.id}')">
                <div>
                    <div class="service-title">${service.title}</div>
                    <div class="service-meta">
                        <span class="service-tag ${service.type}">${service.type.charAt(0).toUpperCase() + service.type.slice(1)}</span>
                    </div>
                </div>
                <div class="service-right">
                    <div class="service-price">${service.priceDiscount ? `<span style="text-decoration: line-through; color: var(--text-muted); font-size: 0.75rem;">S/ ${service.price}</span> S/ ${service.priceDiscount}` : `S/ ${service.price.toFixed(2)}`}</div>
                    <div class="service-checkbox"><i class="fas fa-check"></i></div>
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

function toggleService(id) {
    const service = SERVICES.find(s => s.id === id);
    if (!service) return;

    const exists = cartItems.find(i => i.id === id);
    if (exists) {
        cartItems = cartItems.filter(i => i.id !== id);
    } else {
        cartItems.push({
            id: service.id,
            title: service.title,
            price: service.priceDiscount || service.price,
            auto: false
        });
    }

    renderServices();
    updateAllCarts();
    updateStats();
}

// ==================== CART ====================
function updateAllCarts() {
    const total = cartItems.reduce((s, i) => s + i.price, 0);
    const count = cartItems.length;

    // Mobile
    document.getElementById('cartCountMobile').textContent = count;
    document.getElementById('cartItemsText').textContent = `${count} concepto${count !== 1 ? 's' : ''}`;
    document.getElementById('cartTotalMobile').textContent = `S/ ${total.toFixed(2)}`;

    // Desktop
    document.getElementById('cartCountDesktop').textContent = count;

    let bodyHtml = '';
    cartItems.forEach(item => {
        bodyHtml += `
            <div class="cart-item">
                <div class="cart-item-icon ${item.auto ? 'auto' : 'selected'}"><i class="fas fa-${item.auto ? 'lock' : 'check'}"></i></div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                </div>
                <div class="cart-item-price">S/ ${item.price.toFixed(2)}</div>
            </div>
        `;
    });
    document.getElementById('cartBodyDesktop').innerHTML = bodyHtml || '<div class="empty-state" style="padding: 1rem;"><p>Sin conceptos</p></div>';

    document.getElementById('cartSummaryDesktop').innerHTML = `
        <div class="summary-row"><span>Subtotal</span><span>S/ ${total.toFixed(2)}</span></div>
        <div class="summary-row total"><span>Total</span><span>S/ ${total.toFixed(2)}</span></div>
    `;
}

// ==================== TABS ====================
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`).classList.add('active');
}

// ==================== FILTERS & SEARCH ====================
function setFilter(btn, type) {
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.service-card').forEach(card => {
        if (type === 'all' || card.dataset.type === type || card.dataset.auto === 'true') {
            card.style.display = 'grid';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchServices() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.service-card').forEach(card => {
        const title = card.querySelector('.service-title').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'grid' : 'none';
    });
}

// ==================== CHECKOUT ====================
function openCheckout() {
    if (cartItems.length === 0) {
        showToast('Selecciona al menos un concepto', 'warning');
        return;
    }

    const total = cartItems.reduce((s, i) => s + i.price, 0);
    let html = '';
    
    cartItems.forEach(item => {
        html += `
            <div class="checkout-item ${item.auto ? 'locked' : ''}">
                <div class="checkout-item-icon ${item.auto ? 'auto' : 'selected'}"><i class="fas fa-${item.auto ? 'lock' : 'receipt'}"></i></div>
                <div class="checkout-item-info">
                    <div class="checkout-item-title">${item.title}</div>
                    <div class="checkout-item-subtitle">${item.auto ? 'Obligatorio' : 'Seleccionado'}</div>
                </div>
                <div class="checkout-item-price">S/ ${item.price.toFixed(2)}</div>
            </div>
        `;
    });

    html += `
        <div class="summary-card">
            <div class="summary-card-title">Resumen</div>
            <div class="summary-line"><span>Conceptos (${cartItems.length})</span><span>S/ ${total.toFixed(2)}</span></div>
            <div class="summary-line total"><span>Total</span><span>S/ ${total.toFixed(2)}</span></div>
        </div>
    `;

    document.getElementById('checkoutItems').innerHTML = html;
    document.getElementById('checkoutTotal').textContent = total.toFixed(2);

    // Reset views
    document.getElementById('checkoutStep1').style.display = 'block';
    document.getElementById('checkoutStep2').style.display = 'none';
    document.getElementById('checkoutSuccess').style.display = 'none';

    document.getElementById('checkoutModal').classList.add('active');
}

function goToPayment() {
    document.getElementById('checkoutStep1').style.display = 'none';
    document.getElementById('checkoutStep2').style.display = 'block';
    
    // Update total in payment form
    const total = cartItems.reduce((s, i) => s + i.price, 0);
    document.getElementById('niubizTotal').textContent = total.toFixed(2);
}

function goBackToSummary() {
    document.getElementById('checkoutStep1').style.display = 'block';
    document.getElementById('checkoutStep2').style.display = 'none';
}

// ==================== NIUBIZ PAYMENT ====================
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formatted.substring(0, 19);
}

function formatExpiry(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}

function processNiubizPayment() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardName = document.getElementById('cardName').value.trim();
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCvv = document.getElementById('cardCvv').value;

    // Validations
    if (cardNumber.length < 16) {
        showToast('Número de tarjeta inválido', 'error');
        return;
    }
    if (!cardName) {
        showToast('Ingresa el nombre del titular', 'error');
        return;
    }
    if (cardExpiry.length < 5) {
        showToast('Fecha de expiración inválida', 'error');
        return;
    }
    if (cardCvv.length < 3) {
        showToast('CVV inválido', 'error');
        return;
    }

    // Show processing
    document.getElementById('processingOverlay').classList.add('active');

    // Simulate Niubiz API call
    setTimeout(() => {
        const total = cartItems.reduce((s, i) => s + i.price, 0);
        const opNumber = `NB-${Date.now().toString().slice(-8)}`;
        const transactionId = `TXN${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

        // Store payment data for ticket
        currentPaymentData = {
            operationNumber: opNumber,
            transactionId: transactionId,
            date: new Date(),
            amount: total,
            items: [...cartItems],
            user: { ...currentUser },
            email: userEmail,
            cardLast4: cardNumber.slice(-4),
            authCode: Math.random().toString().slice(2, 8)
        };

        // Add to history
        sessionHistory.unshift({
            id: opNumber,
            transactionId: transactionId,
            date: new Date(),
            items: [...cartItems],
            total: total,
            status: 'paid',
            cardLast4: cardNumber.slice(-4)
        });

        // Hide processing
        document.getElementById('processingOverlay').classList.remove('active');

        // Show success
        showPaymentSuccess();

        // Clear cart (keep auto items)
        cartItems = cartItems.filter(i => i.auto);
        updateAllCarts();
        renderServices();
        renderHistory();
        updateStats();

    }, 3000);
}

function showPaymentSuccess() {
    document.getElementById('checkoutStep1').style.display = 'none';
    document.getElementById('checkoutStep2').style.display = 'none';
    document.getElementById('checkoutSuccess').style.display = 'block';

    document.getElementById('successOpNumber').textContent = currentPaymentData.operationNumber;
    document.getElementById('successTxnId').textContent = currentPaymentData.transactionId;
    document.getElementById('successDate').textContent = currentPaymentData.date.toLocaleString('es-PE');
    document.getElementById('successAmount').textContent = `S/ ${currentPaymentData.amount.toFixed(2)}`;
    document.getElementById('successCard').textContent = `**** **** **** ${currentPaymentData.cardLast4}`;
    document.getElementById('successEmail').textContent = userEmail;
}

// ==================== TICKET PDF GENERATION ====================
function downloadTicket() {
    if (!currentPaymentData) {
        showToast('No hay datos de pago disponibles', 'error');
        return;
    }

    generateTicketPDF(currentPaymentData);
}

function downloadHistoryTicket(historyId) {
    const historyItem = sessionHistory.find(h => h.id === historyId);
    if (!historyItem) {
        showToast('No se encontró el registro', 'error');
        return;
    }

    const paymentData = {
        operationNumber: historyItem.id,
        transactionId: historyItem.transactionId,
        date: historyItem.date,
        amount: historyItem.total,
        items: historyItem.items,
        user: currentUser,
        email: userEmail,
        cardLast4: historyItem.cardLast4,
        authCode: Math.random().toString().slice(2, 8)
    };

    generateTicketPDF(paymentData);
}

function generateTicketPDF(data) {
    // Create a new window for the ticket
    const ticketWindow = window.open('', '_blank');
    
    const itemsHtml = data.items.map(item => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.title}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">S/ ${item.price.toFixed(2)}</td>
        </tr>
    `).join('');

    const ticketHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Comprobante de Pago - UNAS</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            padding: 20px;
            background: #f5f5f5;
        }
        .ticket {
            max-width: 400px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .ticket-header {
            background: linear-gradient(135deg, #20c997 0%, #1aa87c 100%);
            color: white;
            padding: 24px;
            text-align: center;
        }
        .ticket-logo {
            width: 60px;
            height: 60px;
            background: white;
            color: #20c997;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 800;
            margin: 0 auto 12px;
        }
        .ticket-title { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
        .ticket-subtitle { font-size: 12px; opacity: 0.9; }
        .ticket-body { padding: 24px; }
        .ticket-success {
            text-align: center;
            padding: 16px;
            background: #e6f9f1;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .ticket-success i { color: #20c997; font-size: 32px; margin-bottom: 8px; }
        .ticket-success h3 { color: #0d9668; font-size: 16px; }
        .ticket-info { margin-bottom: 20px; }
        .ticket-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dashed #eee;
            font-size: 13px;
        }
        .ticket-row:last-child { border-bottom: none; }
        .ticket-row .label { color: #666; }
        .ticket-row .value { font-weight: 600; }
        .ticket-items { margin: 20px 0; }
        .ticket-items-title { 
            font-size: 12px; 
            font-weight: 700; 
            color: #999; 
            text-transform: uppercase;
            margin-bottom: 8px;
        }
        .ticket-items table { width: 100%; font-size: 13px; }
        .ticket-total {
            background: #f8f9fa;
            padding: 16px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 16px;
        }
        .ticket-total .label { font-weight: 600; color: #333; }
        .ticket-total .amount { font-size: 24px; font-weight: 800; color: #20c997; }
        .ticket-footer {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            font-size: 11px;
            color: #999;
        }
        .ticket-footer p { margin-bottom: 4px; }
        .ticket-qr {
            width: 80px;
            height: 80px;
            background: #eee;
            margin: 12px auto;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #999;
        }
        .btn-print {
            display: block;
            width: 100%;
            max-width: 400px;
            margin: 20px auto;
            padding: 12px;
            background: #20c997;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
        }
        .btn-print:hover { background: #1aa87c; }
        @media print {
            body { background: white; padding: 0; }
            .ticket { box-shadow: none; }
            .btn-print { display: none; }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="ticket">
        <div class="ticket-header">
            <div class="ticket-logo">UN</div>
            <div class="ticket-title">Universidad Nacional Agraria de la Selva</div>
            <div class="ticket-subtitle">Comprobante de Pago Electrónico</div>
        </div>
        <div class="ticket-body">
            <div class="ticket-success">
                <i class="fas fa-check-circle"></i>
                <h3>Pago Procesado Exitosamente</h3>
            </div>
            <div class="ticket-info">
                <div class="ticket-row">
                    <span class="label">N° Operación</span>
                    <span class="value">${data.operationNumber}</span>
                </div>
                <div class="ticket-row">
                    <span class="label">ID Transacción</span>
                    <span class="value">${data.transactionId}</span>
                </div>
                <div class="ticket-row">
                    <span class="label">Fecha y Hora</span>
                    <span class="value">${data.date.toLocaleString('es-PE')}</span>
                </div>
                <div class="ticket-row">
                    <span class="label">Código Autorización</span>
                    <span class="value">${data.authCode}</span>
                </div>
                <div class="ticket-row">
                    <span class="label">Tarjeta</span>
                    <span class="value">**** **** **** ${data.cardLast4}</span>
                </div>
            </div>
            <div class="ticket-info">
                <div class="ticket-row">
                    <span class="label">Cliente</span>
                    <span class="value">${data.user.nombres} ${data.user.apellidos}</span>
                </div>
                <div class="ticket-row">
                    <span class="label">DNI</span>
                    <span class="value">${data.user.dni}</span>
                </div>
                <div class="ticket-row">
                    <span class="label">Código</span>
                    <span class="value">${data.user.codigo}</span>
                </div>
            </div>
            <div class="ticket-items">
                <div class="ticket-items-title">Conceptos Pagados</div>
                <table>
                    ${itemsHtml}
                </table>
            </div>
            <div class="ticket-total">
                <span class="label">TOTAL PAGADO</span>
                <span class="amount">S/ ${data.amount.toFixed(2)}</span>
            </div>
        </div>
        <div class="ticket-footer">
            <div class="ticket-qr">QR Code</div>
            <p><strong>UNAS - Sistema de Pagos Virtuales</strong></p>
            <p>Av. Universitaria Km. 1.5 - Tingo María</p>
            <p>RUC: 20172627421</p>
            <p style="margin-top: 8px;">Comprobante enviado a: ${data.email}</p>
        </div>
    </div>
    <button class="btn-print" onclick="window.print()">
        <i class="fas fa-print"></i> Imprimir Comprobante
    </button>
</body>
</html>
    `;

    ticketWindow.document.write(ticketHtml);
    ticketWindow.document.close();
}

// ==================== HISTORY ====================
function renderHistory() {
    const list = document.getElementById('historyList');
    if (sessionHistory.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-receipt"></i>
                <p>No tienes pagos en esta sesión</p>
            </div>
        `;
        return;
    }

    let html = '';
    sessionHistory.forEach(h => {
        html += `
            <div class="history-card">
                <div class="history-header">
                    <span class="history-date">${h.date.toLocaleString('es-PE')}</span>
                    <span class="history-status paid">Pagado</span>
                </div>
                <div class="history-title">Pago #${h.id}</div>
                <div class="history-items">${h.items.map(i => i.title).join(', ')}</div>
                <div class="history-footer">
                    <div class="history-amount">S/ ${h.total.toFixed(2)}</div>
                    <div class="history-actions">
                        <button class="history-btn" onclick="downloadHistoryTicket('${h.id}')"><i class="fas fa-download"></i> Ticket</button>
                        <button class="history-btn" onclick="resendEmail('${h.id}')"><i class="fas fa-envelope"></i> Reenviar</button>
                    </div>
                </div>
            </div>
        `;
    });
    list.innerHTML = html;
}

function resendEmail(historyId) {
    showToast(`Comprobante reenviado a ${userEmail}`, 'success');
}

// ==================== PROFILE ====================
function renderProfile() {
    const content = document.getElementById('profileContent');
    content.innerHTML = `
        <div style="display: grid; gap: 1rem;">
            <div class="api-card" style="padding: 1rem;">
                <div class="api-card-icon academic"><i class="fas fa-user"></i></div>
                <div class="api-card-info">
                    <div class="api-card-label">Nombre Completo</div>
                    <div class="api-card-value">${currentUser.nombres} ${currentUser.apellidos}</div>
                </div>
            </div>
            <div class="api-card" style="padding: 1rem;">
                <div class="api-card-icon financial"><i class="fas fa-id-card"></i></div>
                <div class="api-card-info">
                    <div class="api-card-label">DNI</div>
                    <div class="api-card-value">${currentUser.dni}</div>
                </div>
            </div>
            <div class="api-card" style="padding: 1rem;">
                <div class="api-card-icon idiomas"><i class="fas fa-envelope"></i></div>
                <div class="api-card-info">
                    <div class="api-card-label">Correo de Sesión</div>
                    <div class="api-card-value">${userEmail}</div>
                </div>
            </div>
            <div class="api-card" style="padding: 1rem;">
                <div class="api-card-icon library"><i class="fas fa-hashtag"></i></div>
                <div class="api-card-info">
                    <div class="api-card-label">Código</div>
                    <div class="api-card-value">${currentUser.codigo}</div>
                </div>
            </div>
        </div>
        <button class="btn btn-secondary" style="margin-top: 1.5rem;" onclick="logout()">
            <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
        </button>
    `;
}

function logout() {
    if (confirm('¿Cerrar sesión? Se perderá el historial temporal.')) {
        currentUser = null;
        userEmail = '';
        cartItems = [];
        sessionHistory = [];
        currentPaymentData = null;
        document.getElementById('appContainer').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('dniInput').value = '';
        document.getElementById('emailInput').value = '';
        goToLoginStep(1);
    }
}

// ==================== UTILITIES ====================
function closeModal(overlay) {
    overlay.classList.remove('active');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function showToast(message, type = 'info') {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#20c997' : '#333'};
        color: white;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        z-index: 3000;
        animation: fadeInUp 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);