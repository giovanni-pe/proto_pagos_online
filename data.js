// data.js - Datos del Sistema de Tesorería UNAS
const DATA = {
    // Usuario actual
    currentUser: {
        name: 'Juan Pérez Martínez',
        role: 'Cajero Principal',
        initials: 'JP',
        email: 'juan.perez@unas.edu.pe',
        sucursal: 'Campus Principal'
    },

    // Estadísticas del Dashboard
    stats: {
        ingresosHoy: 48350,
        recibosHoy: 127,
        deudasPendientes: 12450,
        tasaConciliacion: 98.5,
        transaccionesWeb: 45,
        transaccionesPOS: 38,
        transaccionesBanco: 22,
        transaccionesTotales: 105
    },

    // Clientes
    clients: [
        { 
            id: 1, 
            dni: '12345678', 
            codigo: 'AL001234',
            nombreCompleto: 'PÉREZ GARCÍA, JUAN CARLOS', 
            tipo: 'Alumno', 
            tipoIcon: 'fas fa-graduation-cap', 
            fuente: 'DICDA', 
            actualizado: '30 min',
            email: 'juan.perez@est.unas.edu.pe',
            telefono: '962 345 678',
            facultad: 'Agronomía',
            ciclo: 'VII',
            deuda: 150.00
        },
        { 
            id: 2, 
            dni: '87654321', 
            codigo: 'DO000456',
            nombreCompleto: 'LÓPEZ RAMÍREZ, MARÍA ELENA', 
            tipo: 'Docente', 
            tipoIcon: 'fas fa-chalkboard-teacher', 
            fuente: 'DICDA', 
            actualizado: '1 hora',
            email: 'maria.lopez@unas.edu.pe',
            telefono: '962 111 222',
            facultad: 'Zootecnia',
            deuda: 0
        },
        { 
            id: 3, 
            dni: '11223344', 
            codigo: 'AL002345',
            nombreCompleto: 'GARCÍA TORRES, CARLOS ALBERTO', 
            tipo: 'Alumno', 
            tipoIcon: 'fas fa-graduation-cap', 
            fuente: 'DIAA', 
            actualizado: '15 min',
            email: 'carlos.garcia@est.unas.edu.pe',
            telefono: '962 333 444',
            facultad: 'Recursos Naturales',
            ciclo: 'V',
            deuda: 80.00
        },
        { 
            id: 4, 
            dni: '44332211', 
            codigo: 'EX000123',
            nombreCompleto: 'FERNÁNDEZ SILVA, ANA PATRICIA', 
            tipo: 'Externo', 
            tipoIcon: 'fas fa-user', 
            fuente: 'RENIEC', 
            actualizado: '45 min',
            email: 'ana.fernandez@gmail.com',
            telefono: '962 555 666',
            deuda: 0
        },
        { 
            id: 5, 
            dni: '55667788', 
            codigo: 'AL003456',
            nombreCompleto: 'MARTÍNEZ CASTRO, PEDRO JOSÉ', 
            tipo: 'Alumno', 
            tipoIcon: 'fas fa-graduation-cap', 
            fuente: 'DICDA', 
            actualizado: '20 min',
            email: 'pedro.martinez@est.unas.edu.pe',
            telefono: '962 777 888',
            facultad: 'Ingeniería en Industrias Alimentarias',
            ciclo: 'III',
            deuda: 60.00
        },
        { 
            id: 6, 
            dni: '99887766', 
            codigo: 'AL004567',
            nombreCompleto: 'ROJAS VEGA, LUCÍA ELIZABETH', 
            tipo: 'Alumno', 
            tipoIcon: 'fas fa-graduation-cap', 
            fuente: 'DICDA', 
            actualizado: '10 min',
            email: 'lucia.rojas@est.unas.edu.pe',
            telefono: '962 999 000',
            facultad: 'Ciencias Económicas',
            ciclo: 'IX',
            deuda: 0
        }
    ],

    // Conceptos de Pago
    concepts: [
        { 
            id: 1, 
            codigo: 'MAT-001',
            nombre: 'DERECHO DE MATRÍCULA 2024-I', 
            precio: 60.00, 
            centro: 'Académico',
            dependencia: 'Dirección General de Estudios',
            subcuenta: '1.5.1.2.1',
            clasificador: '1.5.1.2 - Tasas Educativas',
            estado: 'Activo',
            cantidad: 1 
        },
        { 
            id: 2, 
            codigo: 'CER-001',
            nombre: 'CERTIFICADO DE ESTUDIOS', 
            precio: 15.00, 
            centro: 'Académico',
            dependencia: 'Secretaría General',
            subcuenta: '1.5.1.3.1',
            clasificador: '1.5.1.3 - Certificaciones',
            estado: 'Activo',
            cantidad: 1 
        },
        { 
            id: 3, 
            codigo: 'ART-001',
            nombre: 'ARTE Y CULTURA', 
            precio: 5.00, 
            centro: 'Cultura',
            dependencia: 'Bienestar Universitario',
            subcuenta: '1.5.1.4.1',
            clasificador: '1.5.1.4 - Derechos Culturales',
            estado: 'Activo',
            cantidad: 1 
        },
        { 
            id: 4, 
            codigo: 'DEP-001',
            nombre: 'DEPORTES', 
            precio: 5.00, 
            centro: 'Deportes',
            dependencia: 'Bienestar Universitario',
            subcuenta: '1.5.1.4.2',
            clasificador: '1.5.1.4 - Derechos Deportivos',
            estado: 'Activo',
            cantidad: 1 
        },
        { 
            id: 5, 
            codigo: 'CON-001',
            nombre: 'CONSTANCIA DE MATRÍCULA', 
            precio: 10.00, 
            centro: 'Académico',
            dependencia: 'Secretaría General',
            subcuenta: '1.5.1.3.2',
            clasificador: '1.5.1.3 - Certificaciones',
            estado: 'Activo',
            cantidad: 1 
        },
        { 
            id: 6, 
            codigo: 'CAR-001',
            nombre: 'DUPLICADO DE CARNÉ', 
            precio: 8.00, 
            centro: 'Administración',
            dependencia: 'Secretaría General',
            subcuenta: '1.5.1.5.1',
            clasificador: '1.5.1.5 - Carnés',
            estado: 'Activo',
            cantidad: 1 
        },
        { 
            id: 7, 
            codigo: 'NOT-001',
            nombre: 'CERTIFICADO DE NOTAS', 
            precio: 20.00, 
            centro: 'Académico',
            dependencia: 'Dirección General de Estudios',
            subcuenta: '1.5.1.3.3',
            clasificador: '1.5.1.3 - Certificaciones',
            estado: 'Activo',
            cantidad: 1 
        },
        { 
            id: 8, 
            codigo: 'EGR-001',
            nombre: 'CONSTANCIA DE EGRESADO', 
            precio: 25.00, 
            centro: 'Académico',
            dependencia: 'Secretaría General',
            subcuenta: '1.5.1.3.4',
            clasificador: '1.5.1.3 - Certificaciones',
            estado: 'Activo',
            cantidad: 1 
        },
        { 
            id: 9, 
            codigo: 'REC-001',
            nombre: 'DERECHO DE RECUPERACIÓN', 
            precio: 35.00, 
            centro: 'Académico',
            dependencia: 'Dirección General de Estudios',
            subcuenta: '1.5.1.2.2',
            clasificador: '1.5.1.2 - Tasas Educativas',
            estado: 'Activo',
            cantidad: 1 
        },
        { 
            id: 10, 
            codigo: 'SIL-001',
            nombre: 'SILABO DEL CURSO', 
            precio: 3.00, 
            centro: 'Académico',
            dependencia: 'Dirección General de Estudios',
            subcuenta: '1.5.1.5.2',
            clasificador: '1.5.1.5 - Documentos',
            estado: 'Activo',
            cantidad: 1 
        }
    ],

    // Recibos
    receipts: [
        { 
            id: 1, 
            codigo: 'R00001234', 
            cliente: 'PÉREZ GARCÍA, JUAN CARLOS',
            dni: '12345678',
            conceptos: 'MATRÍCULA 2024-I, ARTE Y CULTURA',
            monto: 65.00, 
            fecha: '30/03/2026 09:30', 
            estado: 'Válido', 
            estadoClass: 'success',
            fuente: 'Ventanilla',
            cajero: 'Juan Pérez',
            sucursal: 'Campus Principal'
        },
        { 
            id: 2, 
            codigo: 'R00001235', 
            cliente: 'LÓPEZ RAMÍREZ, MARÍA ELENA',
            dni: '87654321',
            conceptos: 'CERTIFICADO DE ESTUDIOS, CONSTANCIA',
            monto: 25.00, 
            fecha: '30/03/2026 10:15', 
            estado: 'Válido', 
            estadoClass: 'success',
            fuente: 'Ventanilla',
            cajero: 'Juan Pérez',
            sucursal: 'Campus Principal'
        },
        { 
            id: 3, 
            codigo: 'R00001236', 
            cliente: 'GARCÍA TORRES, CARLOS ALBERTO',
            dni: '11223344',
            conceptos: 'MATRÍCULA 2024-I, DEPORTES, ARTE Y CULTURA',
            monto: 70.00, 
            fecha: '30/03/2026 11:00', 
            estado: 'Válido', 
            estadoClass: 'success',
            fuente: 'Ventanilla',
            cajero: 'Juan Pérez',
            sucursal: 'Campus Principal'
        },
        { 
            id: 4, 
            codigo: 'R00001237', 
            cliente: 'FERNÁNDEZ SILVA, ANA PATRICIA',
            dni: '44332211',
            conceptos: 'CERTIFICADO DE ESTUDIOS',
            monto: 15.00, 
            fecha: '30/03/2026 11:45', 
            estado: 'Anulado', 
            estadoClass: 'danger',
            fuente: 'Ventanilla',
            cajero: 'Juan Pérez',
            sucursal: 'Campus Principal',
            motivoAnulacion: 'Error en el nombre del cliente'
        },
        { 
            id: 5, 
            codigo: 'R00001238', 
            cliente: 'MARTÍNEZ CASTRO, PEDRO JOSÉ',
            dni: '55667788',
            conceptos: 'CERTIFICADO DE NOTAS',
            monto: 20.00, 
            fecha: '30/03/2026 12:30', 
            estado: 'Válido', 
            estadoClass: 'success',
            fuente: 'Ventanilla',
            cajero: 'Juan Pérez',
            sucursal: 'Campus Principal'
        },
        { 
            id: 6, 
            codigo: 'T00000125', 
            cliente: 'ROJAS VEGA, LUCÍA ELIZABETH',
            dni: '99887766',
            conceptos: 'MATRÍCULA 2024-I, ARTE Y CULTURA, DEPORTES',
            monto: 70.00, 
            fecha: '29/03/2026 16:20', 
            estado: 'Válido', 
            estadoClass: 'success',
            fuente: 'Web',
            cajero: 'Sistema',
            sucursal: 'Pago Online'
        },
        { 
            id: 7, 
            codigo: 'P00000089', 
            cliente: 'PÉREZ GARCÍA, JUAN CARLOS',
            dni: '12345678',
            conceptos: 'CERTIFICADO DE ESTUDIOS, CONSTANCIA',
            monto: 25.00, 
            fecha: '29/03/2026 14:10', 
            estado: 'Válido', 
            estadoClass: 'success',
            fuente: 'POS',
            cajero: 'María López',
            sucursal: 'Campus Principal'
        }
    ],

    // Deudas
    debts: [
        { 
            id: 1, 
            codigo: 'D0000001', 
            cliente: 'PÉREZ GARCÍA, JUAN CARLOS',
            dni: '12345678',
            concepto: 'MATRÍCULA 2023-II', 
            monto: 150.00, 
            pagado: 100.00, 
            restante: 50.00, 
            estado: 'Pendiente', 
            estadoClass: 'warning',
            fechaCreacion: '15/08/2023',
            fechaVencimiento: '30/08/2023',
            diasVencidos: 213
        },
        { 
            id: 2, 
            codigo: 'D0000002', 
            cliente: 'LÓPEZ RAMÍREZ, MARÍA ELENA',
            dni: '87654321',
            concepto: 'CERTIFICADOS VARIOS', 
            monto: 50.00, 
            pagado: 50.00, 
            restante: 0.00, 
            estado: 'Pagada', 
            estadoClass: 'success',
            fechaCreacion: '10/02/2026',
            fechaPago: '15/02/2026'
        },
        { 
            id: 3, 
            codigo: 'D0000003', 
            cliente: 'GARCÍA TORRES, CARLOS ALBERTO',
            dni: '11223344',
            concepto: 'DERECHO DE EXAMEN', 
            monto: 80.00, 
            pagado: 30.00, 
            restante: 50.00, 
            estado: 'Pendiente', 
            estadoClass: 'warning',
            fechaCreacion: '20/01/2026',
            fechaVencimiento: '28/02/2026',
            diasVencidos: 31
        },
        { 
            id: 4, 
            codigo: 'D0000004', 
            cliente: 'MARTÍNEZ CASTRO, PEDRO JOSÉ',
            dni: '55667788',
            concepto: 'MATRÍCULA 2024-I', 
            monto: 60.00, 
            pagado: 0.00, 
            restante: 60.00, 
            estado: 'Pendiente', 
            estadoClass: 'warning',
            fechaCreacion: '05/03/2026',
            fechaVencimiento: '20/03/2026',
            diasVencidos: 10
        }
    ],

    // Transacciones Web
    transactionsWeb: [
        {
            id: 1,
            codigo: 'T00000125',
            cliente: 'ROJAS VEGA, LUCÍA ELIZABETH',
            dni: '99887766',
            monto: 70.00,
            fecha: '29/03/2026 16:20',
            estado: 'Aprobado',
            estadoClass: 'success',
            operacion: 'OP-985632147',
            tarjeta: '**** **** **** 5432',
            pasarela: 'Niubiz'
        },
        {
            id: 2,
            codigo: 'T00000124',
            cliente: 'GARCÍA TORRES, CARLOS ALBERTO',
            dni: '11223344',
            monto: 35.00,
            fecha: '29/03/2026 14:35',
            estado: 'Aprobado',
            estadoClass: 'success',
            operacion: 'OP-985632108',
            tarjeta: '**** **** **** 1234',
            pasarela: 'Niubiz'
        },
        {
            id: 3,
            codigo: 'T00000123',
            cliente: 'MARTÍNEZ CASTRO, PEDRO JOSÉ',
            dni: '55667788',
            monto: 60.00,
            fecha: '28/03/2026 11:20',
            estado: 'Rechazado',
            estadoClass: 'danger',
            operacion: 'OP-985631945',
            tarjeta: '**** **** **** 9876',
            pasarela: 'Niubiz',
            motivo: 'Fondos insuficientes'
        }
    ],

    // Transacciones POS
    transactionsPOS: [
        {
            id: 1,
            codigo: 'P00000089',
            cliente: 'PÉREZ GARCÍA, JUAN CARLOS',
            dni: '12345678',
            monto: 25.00,
            fecha: '29/03/2026 14:10',
            estado: 'Aprobado',
            estadoClass: 'success',
            dispositivo: 'POS-001',
            tarjeta: '**** **** **** 5678',
            lote: 'L-2026-089',
            autorizacion: 'AUTH-745896'
        },
        {
            id: 2,
            codigo: 'P00000088',
            cliente: 'LÓPEZ RAMÍREZ, MARÍA ELENA',
            dni: '87654321',
            monto: 15.00,
            fecha: '29/03/2026 10:45',
            estado: 'Aprobado',
            estadoClass: 'success',
            dispositivo: 'POS-002',
            tarjeta: '**** **** **** 3456',
            lote: 'L-2026-088',
            autorizacion: 'AUTH-745123'
        }
    ],

    // Transacciones Banco
    transactionsBank: [
        {
            id: 1,
            codigo: 'B00000045',
            cliente: 'FERNÁNDEZ SILVA, ANA PATRICIA',
            dni: '44332211',
            monto: 20.00,
            fecha: '28/03/2026 09:30',
            estado: 'Conciliado',
            estadoClass: 'success',
            operacion: '987654321',
            agencia: 'Tingo María',
            archivo: 'BN_20260328.txt',
            fechaConciliacion: '29/03/2026'
        },
        {
            id: 2,
            codigo: 'B00000044',
            cliente: 'ROJAS VEGA, LUCÍA ELIZABETH',
            dni: '99887766',
            monto: 60.00,
            fecha: '27/03/2026 15:20',
            estado: 'Conciliado',
            estadoClass: 'success',
            operacion: '987654320',
            agencia: 'Tingo María',
            archivo: 'BN_20260327.txt',
            fechaConciliacion: '28/03/2026'
        },
        {
            id: 3,
            codigo: 'B00000043',
            cliente: 'MARTÍNEZ CASTRO, PEDRO JOSÉ',
            dni: '55667788',
            monto: 5.00,
            fecha: '26/03/2026 11:10',
            estado: 'Pendiente',
            estadoClass: 'warning',
            operacion: '987654319',
            agencia: 'Tingo María',
            archivo: 'BN_20260326.txt'
        }
    ],

    // Dispositivos POS
    posDevices: [
        {
            id: 1,
            codigo: 'POS-001',
            nombre: 'Terminal Caja 1',
            serie: 'VISA-78945612',
            estado: 'Activo',
            estadoClass: 'success',
            sucursal: 'Campus Principal',
            ubicacion: 'Ventanilla 1',
            ultimaTransaccion: '29/03/2026 14:10'
        },
        {
            id: 2,
            codigo: 'POS-002',
            nombre: 'Terminal Caja 2',
            serie: 'VISA-78945613',
            estado: 'Activo',
            estadoClass: 'success',
            sucursal: 'Campus Principal',
            ubicacion: 'Ventanilla 2',
            ultimaTransaccion: '29/03/2026 10:45'
        },
        {
            id: 3,
            codigo: 'POS-003',
            nombre: 'Terminal Móvil',
            serie: 'VISA-78945614',
            estado: 'Inactivo',
            estadoClass: 'danger',
            sucursal: 'Campus Principal',
            ubicacion: 'Almacén',
            ultimaTransaccion: '15/03/2026 16:30'
        }
    ],

    // Dependencias
    dependencies: [
        { id: 1, codigo: 'DEP-001', nombre: 'Dirección General de Estudios', tipo: 'Académica', estado: 'Activo' },
        { id: 2, codigo: 'DEP-002', nombre: 'Secretaría General', tipo: 'Administrativa', estado: 'Activo' },
        { id: 3, codigo: 'DEP-003', nombre: 'Bienestar Universitario', tipo: 'Servicios', estado: 'Activo' },
        { id: 4, codigo: 'DEP-004', nombre: 'Tesorería', tipo: 'Financiera', estado: 'Activo' },
        { id: 5, codigo: 'DEP-005', nombre: 'Facultad de Agronomía', tipo: 'Académica', estado: 'Activo' }
    ],

    // Subcuentas
    subaccounts: [
        { id: 1, codigo: '1.5.1.2.1', nombre: 'Derechos de Matrícula', dependencia: 'Dirección General de Estudios', saldo: 12500.00 },
        { id: 2, codigo: '1.5.1.3.1', nombre: 'Certificaciones Académicas', dependencia: 'Secretaría General', saldo: 3200.00 },
        { id: 3, codigo: '1.5.1.4.1', nombre: 'Actividades Culturales', dependencia: 'Bienestar Universitario', saldo: 850.00 },
        { id: 4, codigo: '1.5.1.4.2', nombre: 'Actividades Deportivas', dependencia: 'Bienestar Universitario', saldo: 920.00 },
        { id: 5, codigo: '1.5.1.5.1', nombre: 'Carnés Universitarios', dependencia: 'Secretaría General', saldo: 480.00 }
    ],

    // Arqueos de Caja
    cashCounts: [
        {
            id: 1,
            fecha: '30/03/2026',
            cajero: 'Juan Pérez Martínez',
            apertura: '08:00',
            cierre: '17:00',
            montoInicial: 200.00,
            ingresos: 485.00,
            egresos: 50.00,
            esperado: 635.00,
            contado: 635.00,
            diferencia: 0.00,
            estado: 'Cuadrado',
            estadoClass: 'success',
            recibos: 12
        },
        {
            id: 2,
            fecha: '29/03/2026',
            cajero: 'Juan Pérez Martínez',
            apertura: '08:00',
            cierre: '17:00',
            montoInicial: 200.00,
            ingresos: 520.00,
            egresos: 30.00,
            esperado: 690.00,
            contado: 688.00,
            diferencia: -2.00,
            estado: 'Con diferencia',
            estadoClass: 'warning',
            recibos: 15
        }
    ],

    // Reportes de Ingresos
    incomeReport: {
        porConcepto: [
            { concepto: 'MATRÍCULA 2024-I', cantidad: 45, monto: 2700.00, porcentaje: 35.5 },
            { concepto: 'CERTIFICADO DE ESTUDIOS', cantidad: 28, monto: 420.00, porcentaje: 5.5 },
            { concepto: 'ARTE Y CULTURA', cantidad: 52, monto: 260.00, porcentaje: 3.4 },
            { concepto: 'DEPORTES', cantidad: 48, monto: 240.00, porcentaje: 3.2 },
            { concepto: 'CERTIFICADO DE NOTAS', cantidad: 15, monto: 300.00, porcentaje: 3.9 },
            { concepto: 'CONSTANCIA DE MATRÍCULA', cantidad: 22, monto: 220.00, porcentaje: 2.9 },
            { concepto: 'DUPLICADO DE CARNÉ', cantidad: 18, monto: 144.00, porcentaje: 1.9 },
            { concepto: 'OTROS', cantidad: 35, monto: 1316.00, porcentaje: 17.3 }
        ],
        porFuente: [
            { fuente: 'Ventanilla', cantidad: 127, monto: 3250.00, porcentaje: 42.7 },
            { fuente: 'Pagos Web', cantidad: 45, monto: 2100.00, porcentaje: 27.6 },
            { fuente: 'POS', cantidad: 38, monto: 1450.00, porcentaje: 19.0 },
            { fuente: 'Banco Nación', cantidad: 22, monto: 800.00, porcentaje: 10.5 }
        ],
        porDependencia: [
            { dependencia: 'Dirección General de Estudios', monto: 4200.00, porcentaje: 55.2 },
            { dependencia: 'Secretaría General', monto: 1580.00, porcentaje: 20.8 },
            { dependencia: 'Bienestar Universitario', monto: 1020.00, porcentaje: 13.4 },
            { dependencia: 'Otras Dependencias', monto: 800.00, porcentaje: 10.5 }
        ]
    }
};