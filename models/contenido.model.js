const db = require("../config/db");

const tipoContenido = Object.freeze({
  IMG: "IMG",
  PDF: "PDF",
  VID: "VID",
});

class Contenido {
  constructor(id, tipoContenido, publicacion_id) {
    this.id = id;
    this.tipoContenido = tipoContenido;
    this.publicacion_id = publicacion_id;
  }

  static fromRow(row) {
    return new Contenido(row.id, row.tipoContenido, row.publicacion_id);
  }

  static async getAllFromPublicacion(publicacion_id) {
    const query = "SELECT * FROM contenido WHERE publicacion_id = ?";
    const params = [publicacion_id];
    const [rows] = await db.query(query, params);
    return rows.map(Contenido.fromRow);
  }

  static async saveInfo(contenido) {
    const query =
      "INSERT INTO contenido (id, tipoContenido, publicacion_id) VALUES (?, ?, ?)";
    const params = [
      contenido.id,
      contenido.tipoContenido,
      contenido.publicacion_id,
    ];
    await db.query(query, params);
    return contenido;
  }
}

// Exportar la clase para que pueda ser utilizada en otros módulos
module.exports = Contenido;
