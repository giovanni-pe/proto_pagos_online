// app-complete.js - Aplicación Vue 3 Completa con Renderizado Dinámico

const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            // UI State
            sidebarVisible: true,
            isMobile: window.innerWidth < 768,
            currentView: 'dashboard',
            globalSearch: '',
            
            // Usuario y datos cargados desde DATA
            currentUser: DATA.currentUser,
            stats: DATA.stats,
            
            // Búsqueda
            clientSearch: '',
            conceptSearch: '',
            searchLoading: false,
            selectedClient: null,
            selectedConcepts: [],
            
            // Datos del sistema
            clients: DATA.clients,
            concepts: DATA.concepts,
            receipts: DATA.receipts,
            debts: DATA.debts,
            transactionsWeb: DATA.transactionsWeb,
            transactionsPOS: DATA.transactionsPOS,
            transactionsBank: DATA.transactionsBank,
            posDevices: DATA.posDevices,
            dependencies: DATA.dependencies,
            subaccounts: DATA.subaccounts,
            cashCounts: DATA.cashCounts,
            incomeReport: DATA.incomeReport,
            
            // Modal
            showSuccessModal: false,
            lastReceiptCode: '',
            
            // Tabs
            activeTransactionTab: 'web',
            activeReportTab: 'concepto'
        }
    },
    
    computed: {
        breadcrumb() {
            const breadcrumbs = {
                'dashboard': 'Dashboard',
                'buscar-cliente': 'Clientes / Buscar Cliente',
                'listado-clientes': 'Clientes / Listado Clientes',
                'nuevo-recibo': 'Caja / Nuevo Recibo',
                'recibos': 'Contabilidad / Recibos',
                'deudas': 'Contabilidad / Deudas',
                'transacciones': 'Transacciones',
                'pos-devices': 'Caja / Dispositivos POS',
                'arqueo': 'Caja / Arqueo de Caja',
                'conceptos': 'Catálogo / Conceptos',
                'dependencias': 'Estructura Financiera / Dependencias',
                'subcuentas': 'Estructura Financiera / Subcuentas',
                'reportes': 'Reportes'
            };
            return breadcrumbs[this.currentView] || this.currentView;
        },
        
        filteredClients() {
            if (!this.clientSearch) return [];
            const search = this.clientSearch.toLowerCase();
            return this.clients.filter(c => 
                c.dni.includes(search) || 
                c.codigo.toLowerCase().includes(search) ||
                c.nombreCompleto.toLowerCase().includes(search)
            );
        },
        
        filteredConcepts() {
            if (!this.conceptSearch) return this.concepts;
            const search = this.conceptSearch.toLowerCase();
            return this.concepts.filter(c => 
                c.nombre.toLowerCase().includes(search) ||
                c.codigo.toLowerCase().includes(search) ||
                c.centro.toLowerCase().includes(search)
            );
        },
        
        receiptTotal() {
            return this.selectedConcepts.reduce((sum, c) => sum + (c.precio * c.cantidad), 0);
        },
        
        recentReceipts() {
            return this.receipts.slice(0, 5);
        },
        
        activeTransactions() {
            switch(this.activeTransactionTab) {
                case 'web': return this.transactionsWeb;
                case 'pos': return this.transactionsPOS;
                case 'bank': return this.transactionsBank;
                default: return [];
            }
        },
        
        badgeCounts() {
            return {
                recibos: this.receipts.filter(r => r.estado === 'Válido').length,
                deudas: this.debts.filter(d => d.estado === 'Pendiente').length
            };
        },
        
        // Renderizar vista dinámica
        currentViewHTML() {
            if (VIEWS[this.currentView]) {
                return VIEWS[this.currentView](this);
            }
            return '<div class="alert alert-warning"><i class="fas fa-exclamation-triangle"></i> Vista no encontrada</div>';
        }
    },
    
    methods: {
        toggleSidebar() {
            this.sidebarVisible = !this.sidebarVisible;
        },
        
        changeView(view) {
            this.currentView = view;
            if (this.isMobile) {
                this.sidebarVisible = false;
            }
            window.scrollTo(0, 0);
            
            // Forzar re-renderizado después de cambiar vista
            this.$nextTick(() => {
                // Vincular eventos en las vistas dinámicas
                if (view === 'buscar-cliente') {
                    const input = document.getElementById('clientSearchInput');
                    if (input) {
                        input.addEventListener('input', (e) => {
                            this.clientSearch = e.target.value;
                            this.searchClients();
                        });
                    }
                }
            });
        },
        
        searchClients() {
            this.searchLoading = true;
            setTimeout(() => {
                this.searchLoading = false;
            }, 300);
        },
        
        selectClientForPayment(client) {
            this.selectedClient = client;
            this.changeView('nuevo-recibo');
        },
        
        viewClientHistory(client) {
            alert(`Ver historial completo de ${client.nombreCompleto}\n\nEsta funcionalidad mostrará:\n- Todos los pagos realizados\n- Deudas pendientes\n- Conceptos más frecuentes`);
        },
        
        viewClientDetail(client) {
            alert(`Detalles de ${client.nombreCompleto}\n\nDNI: ${client.dni}\nCódigo: ${client.codigo}\nEmail: ${client.email}\nTeléfono: ${client.telefono}\n${client.facultad ? 'Facultad: ' + client.facultad : ''}`);
        },
        
        toggleConcept(concept) {
            const index = this.selectedConcepts.findIndex(c => c.id === concept.id);
            if (index >= 0) {
                this.selectedConcepts.splice(index, 1);
            } else {
                this.selectedConcepts.push({ ...concept, cantidad: 1 });
            }
        },
        
        updateConceptQuantity(id, quantity) {
            const concept = this.selectedConcepts.find(c => c.id === id);
            if (concept) {
                concept.cantidad = parseInt(quantity) || 1;
            }
        },
        
        removeConcept(id) {
            const index = this.selectedConcepts.findIndex(c => c.id === id);
            if (index >= 0) {
                this.selectedConcepts.splice(index, 1);
            }
        },
        
        cancelReceipt() {
            if (confirm('¿Deseas cancelar este recibo?')) {
                this.selectedConcepts = [];
                this.selectedClient = null;
                this.changeView('buscar-cliente');
            }
        },
        
        emitReceipt() {
            if (this.selectedConcepts.length === 0) {
                alert('Selecciona al menos un concepto');
                return;
            }
            
            this.lastReceiptCode = 'R' + String(this.receipts.length + 1).padStart(8, '0');
            const conceptosStr = this.selectedConcepts.map(c => c.nombre).join(', ');
            
            const newReceipt = {
                id: this.receipts.length + 1,
                codigo: this.lastReceiptCode,
                cliente: this.selectedClient.nombreCompleto,
                dni: this.selectedClient.dni,
                conceptos: conceptosStr,
                monto: this.receiptTotal,
                fecha: new Date().toLocaleString('es-PE'),
                estado: 'Válido',
                estadoClass: 'success',
                fuente: 'Ventanilla',
                cajero: this.currentUser.name,
                sucursal: this.currentUser.sucursal
            };
            
            this.receipts.unshift(newReceipt);
            this.stats.ingresosHoy += this.receiptTotal;
            this.stats.recibosHoy++;
            this.showSuccessModal = true;
        },
        
        startNewReceipt() {
            this.selectedConcepts = [];
            this.showSuccessModal = false;
            this.changeView('buscar-cliente');
        },
        
        viewReceipt(receipt) {
            alert(`Recibo: ${receipt.codigo}\n\nCliente: ${receipt.cliente}\nDNI: ${receipt.dni}\nConceptos: ${receipt.conceptos}\nMonto: ${this.formatMoney(receipt.monto)}\nFecha: ${receipt.fecha}\nEstado: ${receipt.estado}\nCajero: ${receipt.cajero}`);
        },
        
        printReceipt(receipt) {
            alert(`Imprimiendo recibo ${receipt.codigo}...\n\nFormatos disponibles:\n- A5 (Media carta)\n- Ticket 80mm\n- Matricial`);
        },
        
        nullReceipt(receipt) {
            if (confirm(`¿Estás seguro de anular el recibo ${receipt.codigo}?`)) {
                const r = this.receipts.find(rec => rec.id === receipt.id);
                if (r) {
                    r.estado = 'Anulado';
                    r.estadoClass = 'danger';
                    r.motivoAnulacion = prompt('Motivo de anulación:') || 'Sin motivo especificado';
                    this.stats.ingresosHoy -= r.monto;
                    this.stats.recibosHoy--;
                    alert(`Recibo ${receipt.codigo} anulado correctamente`);
                }
            }
        },
        
        viewDebt(debt) {
            alert(`Deuda: ${debt.codigo}\n\nCliente: ${debt.cliente}\nDNI: ${debt.dni}\nConcepto: ${debt.concepto}\nMonto: ${this.formatMoney(debt.monto)}\nPagado: ${this.formatMoney(debt.pagado)}\nRestante: ${this.formatMoney(debt.restante)}\nEstado: ${debt.estado}`);
        },
        
        editDebt(debt) {
            const newAmount = prompt(`Editar monto de deuda ${debt.codigo}\n\nMonto actual: ${this.formatMoney(debt.monto)}\n\nNuevo monto:`, debt.monto);
            if (newAmount && !isNaN(newAmount)) {
                const amount = parseFloat(newAmount);
                debt.monto = amount;
                debt.restante = amount - debt.pagado;
                debt.estado = debt.restante <= 0 ? 'Pagada' : 'Pendiente';
                debt.estadoClass = debt.restante <= 0 ? 'success' : 'warning';
                alert(`Deuda actualizada correctamente`);
            }
        },
        
        changeTransactionTab(tab) {
            this.activeTransactionTab = tab;
        },
        
        viewTransaction(transaction) {
            let details = `Código: ${transaction.codigo}\nCliente: ${transaction.cliente}\nDNI: ${transaction.dni}\nMonto: ${this.formatMoney(transaction.monto)}\nFecha: ${transaction.fecha}\nEstado: ${transaction.estado}`;
            if (transaction.operacion) details += `\nOperación: ${transaction.operacion}`;
            if (transaction.tarjeta) details += `\nTarjeta: ${transaction.tarjeta}`;
            alert(details);
        },
        
        changeReportTab(tab) {
            this.activeReportTab = tab;
        },
        
        exportData(format) {
            alert(`Exportando datos en formato ${format.toUpperCase()}...\n\nSe descargará el archivo en unos segundos.`);
        },
        
        viewPOSDevice(device) {
            alert(`Dispositivo: ${device.codigo}\n\nNombre: ${device.nombre}\nSerie: ${device.serie}\nEstado: ${device.estado}\nSucursal: ${device.sucursal}\nUbicación: ${device.ubicacion}\nÚltima Transacción: ${device.ultimaTransaccion}`);
        },
        
        viewCashCount(cashCount) {
            alert(`Arqueo de Caja: ${cashCount.fecha}\n\nCajero: ${cashCount.cajero}\nApertura: ${cashCount.apertura}\nCierre: ${cashCount.cierre}\nMonto Inicial: ${this.formatMoney(cashCount.montoInicial)}\nIngresos: ${this.formatMoney(cashCount.ingresos)}\nEsperado: ${this.formatMoney(cashCount.esperado)}\nContado: ${this.formatMoney(cashCount.contado)}\nDiferencia: ${this.formatMoney(cashCount.diferencia)}\nEstado: ${cashCount.estado}`);
        },
        
        formatMoney(amount) {
            return `S/. ${amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    },
    
    mounted() {
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth < 768;
        });
        
        // Exponer app globalmente para que las vistas puedan acceder
        window.app = this;
    }
});

// Montar la aplicación
app.mount('#app');