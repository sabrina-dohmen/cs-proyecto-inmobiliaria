class Alquiler {
    constructor(
        inmuebleId,
        inquilinoId,
        fechaInicio,
        fechaFinal,
        duracionContrato,
        porcentajeAumento,
        periodoAumento,
        activo
    ) {
        this.inmuebleId = inmuebleId;
        this.inquilinoId = inquilinoId;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
        this.duracionContrato = duracionContrato;
        this.porcentajeAumento = porcentajeAumento;
        this.periodoAumento = periodoAumento;
        this.activo = activo;
    }
}

module.exports = Alquiler;