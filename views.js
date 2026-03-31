// views.js - Todas las vistas HTML del sistema renderizadas dinámicamente

const VIEWS = {
    
    // ==========================================
    // VISTA: LISTADO DE CLIENTES
    // ==========================================
    'listado-clientes': (app) => `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-users" style="color: var(--primary);"></i>
                Listado de Clientes
            </h1>
            <p class="page-subtitle">Todos los clientes registrados en el sistema</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-list"></i>
                    Clientes Registrados
                </h3>
                <div class="card-actions">
                    <button class="btn btn-outline btn-sm" onclick="app.exportData('excel')">
                        <i class="fas fa-file-excel"></i> Exportar
                    </button>
                </div>
            </div>
            
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>DNI</th>
                            <th>Código</th>
                            <th>Nombre Completo</th>
                            <th>Tipo</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Deuda</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.clients.map(client => `
                            <tr>
                                <td><strong>${client.dni}</strong></td>
                                <td>${client.codigo}</td>
                                <td>${client.nombreCompleto}</td>
                                <td>
                                    <span class="badge badge-primary">
                                        <i class="${client.tipoIcon}"></i> ${client.tipo}
                                    </span>
                                </td>
                                <td>${client.email}</td>
                                <td>${client.telefono}</td>
                                <td>
                                    ${client.deuda > 0 
                                        ? `<strong style="color: var(--danger);">${app.formatMoney(client.deuda)}</strong>`
                                        : `<span style="color: var(--success);">S/. 0.00</span>`
                                    }
                                </td>
                                <td>
                                    <button class="action-btn" onclick='app.viewClientDetail(${JSON.stringify(client)})' title="Ver">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="action-btn" onclick='app.selectClientForPayment(${JSON.stringify(client)})' title="Nuevo Pago">
                                        <i class="fas fa-receipt"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `,
    
    // ==========================================
    // VISTA: BUSCAR CLIENTE
    // ==========================================
    'buscar-cliente': (app) => `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-search" style="color: var(--primary);"></i>
                Buscar Cliente
            </h1>
            <p class="page-subtitle">Busca clientes por DNI, código o nombre</p>
        </div>
        
        <div class="card">
            <div class="form-group">
                <label class="form-label">
                    <i class="fas fa-search"></i> Buscar
                </label>
                <div class="input-group">
                    <i class="fas fa-search"></i>
                    <input 
                        type="text" 
                        class="form-control form-control-search" 
                        placeholder="Ingresa DNI, código o nombre del cliente..."
                        v-model="clientSearch"
                        @input="searchClients"
                        id="clientSearchInput"
                    >
                </div>
            </div>
            
            <div v-if="searchLoading" class="loading">
                <div class="spinner"></div>
                <span style="margin-left: 15px;">Buscando...</span>
            </div>
            
            <div v-else-if="filteredClients.length > 0">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    <div>
                        <strong>{{ filteredClients.length }} cliente(s) encontrado(s)</strong>
                        <p style="margin: 5px 0 0 0; font-size: 0.9rem;">Búsqueda instantánea en < 100ms</p>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>DNI</th>
                                <th>Nombre Completo</th>
                                <th>Tipo</th>
                                <th>Fuente</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="client in filteredClients" :key="client.id">
                                <td><strong>{{ client.dni }}</strong></td>
                                <td>{{ client.nombreCompleto }}</td>
                                <td>
                                    <span class="badge badge-primary">
                                        <i :class="client.tipoIcon"></i> {{ client.tipo }}
                                    </span>
                                </td>
                                <td>
                                    <i class="fas fa-sync" style="color: var(--primary);"></i>
                                    {{ client.fuente }} (actualizado {{ client.actualizado }})
                                </td>
                                <td>
                                    <button class="btn btn-primary btn-sm" @click="selectClientForPayment(client)">
                                        <i class="fas fa-receipt"></i> Nuevo Pago
                                    </button>
                                    <button class="btn btn-outline btn-sm" @click="viewClientHistory(client)">
                                        <i class="fas fa-history"></i> Historial
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div v-else-if="clientSearch">
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>No se encontraron clientes</strong>
                        <p style="margin: 5px 0 0 0; font-size: 0.9rem;">Intenta con otro criterio de búsqueda</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    // ==========================================
    // VISTA: CONCEPTOS
    // ==========================================
    'conceptos': (app) => `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-tags" style="color: var(--primary);"></i>
                Conceptos de Pago
            </h1>
            <p class="page-subtitle">Gestión de conceptos disponibles para pagos</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-list"></i>
                    Listado de Conceptos
                </h3>
                <button class="btn btn-primary" onclick="alert('Agregar nuevo concepto')">
                    <i class="fas fa-plus"></i> Nuevo Concepto
                </button>
            </div>
            
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Centro</th>
                            <th>Dependencia</th>
                            <th>Clasificador</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.concepts.map(concept => `
                            <tr>
                                <td><strong>${concept.codigo}</strong></td>
                                <td>${concept.nombre}</td>
                                <td><strong>${app.formatMoney(concept.precio)}</strong></td>
                                <td><span class="badge badge-info">${concept.centro}</span></td>
                                <td>${concept.dependencia}</td>
                                <td><small>${concept.clasificador}</small></td>
                                <td>
                                    <span class="badge badge-success">
                                        <i class="fas fa-check"></i> ${concept.estado}
                                    </span>
                                </td>
                                <td>
                                    <button class="action-btn" title="Editar">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="action-btn danger" title="Eliminar">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `,
    
    // ==========================================
    // VISTA: DEPENDENCIAS
    // ==========================================
    'dependencias': (app) => `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-sitemap" style="color: var(--primary);"></i>
                Dependencias
            </h1>
            <p class="page-subtitle">Estructura organizacional de la universidad</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-building"></i>
                    Listado de Dependencias
                </h3>
                <button class="btn btn-primary" onclick="alert('Agregar nueva dependencia')">
                    <i class="fas fa-plus"></i> Nueva Dependencia
                </button>
            </div>
            
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.dependencies.map(dep => `
                            <tr>
                                <td><strong>${dep.codigo}</strong></td>
                                <td>${dep.nombre}</td>
                                <td><span class="badge badge-primary">${dep.tipo}</span></td>
                                <td>
                                    <span class="badge badge-success">
                                        <i class="fas fa-check-circle"></i> ${dep.estado}
                                    </span>
                                </td>
                                <td>
                                    <button class="action-btn" title="Editar">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="action-btn" title="Ver detalles">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `,
    
    // ==========================================
    // VISTA: SUBCUENTAS
    // ==========================================
    'subcuentas': (app) => `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-folder-tree" style="color: var(--primary);"></i>
                Subcuentas
            </h1>
            <p class="page-subtitle">Clasificación contable de ingresos</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-list"></i>
                    Listado de Subcuentas
                </h3>
                <button class="btn btn-primary" onclick="alert('Agregar nueva subcuenta')">
                    <i class="fas fa-plus"></i> Nueva Subcuenta
                </button>
            </div>
            
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Dependencia</th>
                            <th>Saldo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.subaccounts.map(sub => `
                            <tr>
                                <td><strong>${sub.codigo}</strong></td>
                                <td>${sub.nombre}</td>
                                <td>${sub.dependencia}</td>
                                <td><strong style="color: var(--success);">${app.formatMoney(sub.saldo)}</strong></td>
                                <td>
                                    <button class="action-btn" title="Ver movimientos">
                                        <i class="fas fa-exchange-alt"></i>
                                    </button>
                                    <button class="action-btn" title="Exportar">
                                        <i class="fas fa-download"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `,
    
    // ==========================================
    // VISTA: TRANSACCIONES
    // ==========================================
    'transacciones': (app) => `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-exchange-alt" style="color: var(--primary);"></i>
                Transacciones
            </h1>
            <p class="page-subtitle">Todas las transacciones del sistema</p>
        </div>
        
        <div class="card">
            <div class="tabs">
                <button class="tab" :class="{ active: activeTransactionTab === 'web' }" @click="changeTransactionTab('web')">
                    <i class="fas fa-globe"></i> Pagos Web (${app.transactionsWeb.length})
                </button>
                <button class="tab" :class="{ active: activeTransactionTab === 'pos' }" @click="changeTransactionTab('pos')">
                    <i class="fas fa-credit-card"></i> Pagos POS (${app.transactionsPOS.length})
                </button>
                <button class="tab" :class="{ active: activeTransactionTab === 'bank' }" @click="changeTransactionTab('bank')">
                    <i class="fas fa-university"></i> Banco (${app.transactionsBank.length})
                </button>
            </div>
            
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-list"></i>
                    <span v-if="activeTransactionTab === 'web'">Transacciones Web</span>
                    <span v-else-if="activeTransactionTab === 'pos'">Transacciones POS</span>
                    <span v-else>Transacciones Banco</span>
                </h3>
                <button class="btn btn-secondary btn-sm" @click="exportData('excel')">
                    <i class="fas fa-download"></i> Exportar
                </button>
            </div>
            
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Cliente</th>
                            <th>DNI</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="trans in activeTransactions" :key="trans.id">
                            <td><strong>{{ trans.codigo }}</strong></td>
                            <td>{{ trans.cliente }}</td>
                            <td>{{ trans.dni }}</td>
                            <td><strong>{{ formatMoney(trans.monto) }}</strong></td>
                            <td>{{ trans.fecha }}</td>
                            <td>
                                <span class="badge" :class="'badge-' + trans.estadoClass">
                                    {{ trans.estado }}
                                </span>
                            </td>
                            <td>
                                <button class="action-btn" @click="viewTransaction(trans)" title="Ver">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    
    // ==========================================
    // VISTA: DISPOSITIVOS POS
    // ==========================================
    'pos-devices': (app) => `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-credit-card" style="color: var(--primary);"></i>
                Dispositivos POS
            </h1>
            <p class="page-subtitle">Gestión de terminales de punto de venta</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-list"></i>
                    Terminales Registradas
                </h3>
                <button class="btn btn-primary" onclick="alert('Registrar nuevo dispositivo POS')">
                    <i class="fas fa-plus"></i> Nuevo Dispositivo
                </button>
            </div>
            
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Serie</th>
                            <th>Sucursal</th>
                            <th>Ubicación</th>
                            <th>Última Transacción</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.posDevices.map(device => `
                            <tr>
                                <td><strong>${device.codigo}</strong></td>
                                <td>${device.nombre}</td>
                                <td><small>${device.serie}</small></td>
                                <td>${device.sucursal}</td>
                                <td>${device.ubicacion}</td>
                                <td><small>${device.ultimaTransaccion}</small></td>
                                <td>
                                    <span class="badge badge-${device.estadoClass}">
                                        ${device.estado}
                                    </span>
                                </td>
                                <td>
                                    <button class="action-btn" onclick='app.viewPOSDevice(${JSON.stringify(device)})' title="Ver">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="action-btn" title="Configurar">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `,
    
    // ==========================================
    // VISTA: ARQUEO DE CAJA
    // ==========================================
    'arqueo': (app) => `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-calculator" style="color: var(--primary);"></i>
                Arqueo de Caja
            </h1>
            <p class="page-subtitle">Cierre y conciliación de caja</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-list"></i>
                    Historial de Arqueos
                </h3>
                <button class="btn btn-primary" onclick="alert('Realizar nuevo arqueo de caja')">
                    <i class="fas fa-plus"></i> Nuevo Arqueo
                </button>
            </div>
            
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cajero</th>
                            <th>Apertura</th>
                            <th>Cierre</th>
                            <th>Inicial</th>
                            <th>Ingresos</th>
                            <th>Esperado</th>
                            <th>Contado</th>
                            <th>Diferencia</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.cashCounts.map(cash => `
                            <tr>
                                <td><strong>${cash.fecha}</strong></td>
                                <td>${cash.cajero}</td>
                                <td>${cash.apertura}</td>
                                <td>${cash.cierre}</td>
                                <td>${app.formatMoney(cash.montoInicial)}</td>
                                <td>${app.formatMoney(cash.ingresos)}</td>
                                <td><strong>${app.formatMoney(cash.esperado)}</strong></td>
                                <td>${app.formatMoney(cash.contado)}</td>
                                <td style="color: ${cash.diferencia === 0 ? 'var(--success)' : 'var(--danger)'};">
                                    <strong>${app.formatMoney(cash.diferencia)}</strong>
                                </td>
                                <td>
                                    <span class="badge badge-${cash.estadoClass}">
                                        ${cash.estado}
                                    </span>
                                </td>
                                <td>
                                    <button class="action-btn" onclick='app.viewCashCount(${JSON.stringify(cash)})' title="Ver">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="action-btn" title="Imprimir">
                                        <i class="fas fa-print"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `,
    
    // ==========================================
    // VISTA: REPORTES
    // ==========================================
    'reportes': (app) => `
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-chart-bar" style="color: var(--primary);"></i>
                Reportes de Ingresos
            </h1>
            <p class="page-subtitle">Análisis financiero y estadísticas</p>
        </div>
        
        <div class="card">
            <div class="tabs">
                <button class="tab" :class="{ active: activeReportTab === 'concepto' }" @click="changeReportTab('concepto')">
                    <i class="fas fa-tags"></i> Por Concepto
                </button>
                <button class="tab" :class="{ active: activeReportTab === 'fuente' }" @click="changeReportTab('fuente')">
                    <i class="fas fa-source"></i> Por Fuente
                </button>
                <button class="tab" :class="{ active: activeReportTab === 'dependencia' }" @click="changeReportTab('dependencia')">
                    <i class="fas fa-building"></i> Por Dependencia
                </button>
            </div>
            
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-chart-pie"></i>
                    Ingresos 
                    <span v-if="activeReportTab === 'concepto'">por Concepto</span>
                    <span v-else-if="activeReportTab === 'fuente'">por Fuente de Pago</span>
                    <span v-else>por Dependencia</span>
                </h3>
                <button class="btn btn-secondary btn-sm" @click="exportData('pdf')">
                    <i class="fas fa-file-pdf"></i> Exportar PDF
                </button>
            </div>
            
            <div v-if="activeReportTab === 'concepto'" class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Concepto</th>
                            <th>Cantidad</th>
                            <th>Monto Total</th>
                            <th>Porcentaje</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.incomeReport.porConcepto.map(item => `
                            <tr>
                                <td><strong>${item.concepto}</strong></td>
                                <td>${item.cantidad}</td>
                                <td><strong style="color: var(--success);">${app.formatMoney(item.monto)}</strong></td>
                                <td>
                                    <span class="badge badge-primary">${item.porcentaje}%</span>
                                </td>
                                <td>
                                    <div style="background: var(--light); border-radius: 4px; height: 8px; overflow: hidden;">
                                        <div style="background: var(--primary); height: 100%; width: ${item.porcentaje}%;"></div>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div v-else-if="activeReportTab === 'fuente'" class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Fuente de Pago</th>
                            <th>Cantidad</th>
                            <th>Monto Total</th>
                            <th>Porcentaje</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.incomeReport.porFuente.map(item => `
                            <tr>
                                <td><strong>${item.fuente}</strong></td>
                                <td>${item.cantidad}</td>
                                <td><strong style="color: var(--success);">${app.formatMoney(item.monto)}</strong></td>
                                <td>
                                    <span class="badge badge-info">${item.porcentaje}%</span>
                                </td>
                                <td>
                                    <div style="background: var(--light); border-radius: 4px; height: 8px; overflow: hidden;">
                                        <div style="background: var(--info); height: 100%; width: ${item.porcentaje}%;"></div>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div v-else class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Dependencia</th>
                            <th>Monto Total</th>
                            <th>Porcentaje</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.incomeReport.porDependencia.map(item => `
                            <tr>
                                <td><strong>${item.dependencia}</strong></td>
                                <td><strong style="color: var(--success);">${app.formatMoney(item.monto)}</strong></td>
                                <td>
                                    <span class="badge badge-warning">${item.porcentaje}%</span>
                                </td>
                                <td>
                                    <div style="background: var(--light); border-radius: 4px; height: 8px; overflow: hidden;">
                                        <div style="background: var(--warning); height: 100%; width: ${item.porcentaje}%;"></div>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `
};