-- Tabla de calificaciones de usuarios
CREATE TABLE calificaciones (
    id SERIAL PRIMARY KEY,
    usuario_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    calificacion INTEGER NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Nota: Realtime se habilita desde el panel de Supabase

-- Crear índices para optimizar consultas de calificaciones
CREATE INDEX idx_calificaciones_usuario_id ON calificaciones(usuario_id);
CREATE INDEX idx_calificaciones_created_at ON calificaciones(created_at DESC);
CREATE INDEX idx_calificaciones_calificacion ON calificaciones(calificacion);

-- Función para verificar si un usuario ya ha calificado
CREATE OR REPLACE FUNCTION usuario_ya_califico(p_usuario_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM calificaciones 
        WHERE usuario_id = p_usuario_id
    );
END;
$$ LANGUAGE plpgsql;

-- Función para verificar si es el primer pedido pagado del usuario
CREATE OR REPLACE FUNCTION es_primer_pedido_pagado(p_usuario_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    pedidos_pagados INTEGER;
BEGIN
    SELECT COUNT(*) INTO pedidos_pagados
    FROM facturas 
    WHERE cliente_id = p_usuario_id 
    AND estado = 'pagado';
    
    RETURN pedidos_pagados = 1;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener estadísticas de calificaciones
CREATE OR REPLACE FUNCTION obtener_estadisticas_calificaciones()
RETURNS JSON AS $$
DECLARE
    resultado JSON;
BEGIN
    SELECT json_build_object(
        'total_calificaciones', COUNT(*),
        'promedio_calificacion', ROUND(AVG(calificacion), 2),
        'distribucion', json_build_object(
            'cinco_estrellas', COUNT(*) FILTER (WHERE calificacion = 5),
            'cuatro_estrellas', COUNT(*) FILTER (WHERE calificacion = 4),
            'tres_estrellas', COUNT(*) FILTER (WHERE calificacion = 3),
            'dos_estrellas', COUNT(*) FILTER (WHERE calificacion = 2),
            'una_estrella', COUNT(*) FILTER (WHERE calificacion = 1)
        )
    ) INTO resultado
    FROM calificaciones;
    
    RETURN resultado;
END;
$$ LANGUAGE plpgsql;

-- Trigger para notificar cuando una factura cambia a 'pagado'
CREATE OR REPLACE FUNCTION notificar_factura_pagada()
RETURNS TRIGGER AS $$
BEGIN
    -- Solo notificar si el estado cambió a 'pagado'
    IF OLD.estado != 'pagado' AND NEW.estado = 'pagado' THEN
        -- Registrar el cambio para debugging
        RAISE NOTICE 'Factura % cambió a pagado para usuario %', NEW.numero_factura, NEW.cliente_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para facturas pagadas
CREATE TRIGGER trigger_factura_pagada
    AFTER UPDATE ON facturas
    FOR EACH ROW
    EXECUTE FUNCTION notificar_factura_pagada();